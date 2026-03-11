import { useEffect, useMemo, useState } from "react";
import type { Location, dungeon, dungeonRoom, dungeonFloor } from "../types/locations";
import type { EnemyTemplate, EnemyInstance } from "../types/enemy";
import type { item, inventoryItem } from "../types/item";
import type { NPC } from "../types/NPC";
import type { player } from "../types/player";
import { loadJSON, saveJSON } from "./storage";
import { calcDamage, levelFromXP, randomInt } from "./combat";
import { rollLoot } from "./loot";
import type { CombatState } from "../types/combat";
import { recalcStats } from "./stats"
import type { quest, QuestProgress } from "../types/quest";
import type { shop } from "../types/shop";
import { resolveCombatRound } from "./combatRound";
import type { completeDialog, dialogReplies } from "../types/player";
import { addToInventory, cloneEnemy, hasItem, removeFromInventory } from "./helpers";
import * as dataFor from "../content/data";
import { startQuest, isQuestComplete, completeQuest, hasQuest, } from "./quests";
import { spawnEnemy } from "./enemySpawn";
import { getQuestState } from "./questLogic";

// YOU PROVIDE THIS MODULE (same shape as Angular: dataFor.home, dataFor.Locs)
type UiState = {
    fightOpen: boolean;
    statusOpen: boolean;
    shopOpen: boolean;
    casinoOpen: boolean;
    battleItemOpen: boolean;
};

const LS = {
    player: "myPlayer",
    quest: "myPlayerQuest",
    inv: "myPlayerInventory",
    msg: "bmessage",
    equipped: "equipped",
    worn: "worn",
    loc: "cLocation",
};

function detectMobileDevice() {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}


export const Locs: Location[] = Object.values(location).filter(
    (l): l is Location => typeof l === "object" && "id" in l
);

export function useHomelessHero() {
    const isMobileDevice = useMemo(() => detectMobileDevice(), []);

    // --- base placeholders matching your Angular defaults ---
    const fakeItem: item = useMemo(() => ({
        id: 0,
        name: "",
        price: 0,
        equippable: false,
        wearable: false,
        healing: false,
    }), []);

    const initialXP = 66;
    const initialHP = 9;
    const initialLevel = levelFromXP(initialXP);

    // --- Location bootstrap (from localStorage or home) ---
    const [currentLocation, setCurrentLocation] = useState<Location>(() => {
        const loc = loadJSON<Location>(LS.loc);
        return loc ?? dataFor.dataFor.home;
    });

    // --- Dungeon state ---
    const [currentDungeon, setCurrentDungeon] = useState<dungeon>({
        id: 0, name: "", floors: 0, insideDungeon: false,
    });

    const [currentDungeonRoom, setCurrentDungeonRoom] = useState<dungeonRoom>({
        roomID: "0AA",
        dungeon: currentDungeon,
        floor: 0,
        roomNumber: 0,
        enemyNumber: 0,
        hasEnemy: false,
        exit: false,
        stairsUp: false,
        stairsDown: true,
        hasEntered: false,
        itemRequired: false,
    });

    const [ui, setUi] = useState<UiState>({
        fightOpen: false,
        statusOpen: false,
        shopOpen: false,
        casinoOpen: false,
        battleItemOpen: false,
    });

    // --- NPC dialog ---
    const [npcName, setNpcName] = useState("");
    const [NPCDialog, setNPCDialog] = useState("");
    const [playerOption1, setPlayerOption1] = useState<string>("");
    const [EndChatMessage, setEndChatMessage] = useState<string>("");

    // --- messages ---
    const [battleMessage, setBattleMessage] = useState<string>(() => {
        return loadJSON<string>(LS.msg) ??
            `You wake up in a strange alley-way, unsure of anything. You don't remember your name, your occupation, or anyone around you. You have no idea where you live, and for all you know, you are homeless. Everything seems new.... and scary. <br /><br /> `;
    });

    const [fightMessage, setFightMessage] = useState<string>("");
    const [combat, setCombat] = useState<CombatState | null>(null)


    // --- Player ---
    const [myPlayer, setMyPlayer] = useState<player>(() => {
        const savedStats = loadJSON<player["stats"]>(LS.player);

        if (savedStats && savedStats.baseAttack === undefined) {

            savedStats.baseAttack = savedStats.attack
            savedStats.baseDefense = savedStats.defense
            savedStats.baseSpeed = savedStats.speed
            savedStats.baseMaxHp = savedStats.MaxHp

        }
        const savedQuest = loadJSON<QuestProgress[]>(LS.quest);
        const savedInv = loadJSON<inventoryItem[]>(LS.inv);

        const player = {
            currentLocation,
            stats: savedStats ?? {

                gold: 0,

                currentHp: Math.max(0, initialHP),

                baseMaxHp: Math.round(initialLevel * 3.15),
                baseDefense: Math.round(initialLevel * 1.18),
                baseAttack: Math.round(initialLevel * 1.16),
                baseSpeed: Math.round(initialLevel * 1.17),

                MaxHp: Math.round(initialLevel * 3.15),
                defense: Math.round(initialLevel * 1.18),
                attack: Math.round(initialLevel * 1.16),
                speed: Math.round(initialLevel * 1.17),

                experiencePoints: initialXP,
                level: initialLevel,
                deathCount: 0,
            },
            inventory: savedInv ?? [{ details: fakeItem, quantity: 0 }],
            questList: savedQuest ?? [],
            weapon: loadJSON<any>(LS.equipped) ?? { itemName: "N/A", attackBonus: 0, defenseBonus: 0, speedBonus: 0, equipped: false },
            wearable: loadJSON<any>(LS.worn) ?? { itemName: "N/A", attackBonus: 0, defenseBonus: 0, speedBonus: 0, equipped: false },


        };
        return recalcStats(player);
    });



    // keep player currentLocation synced
    useEffect(() => {
        setMyPlayer(p => ({ ...p, currentLocation }));
        saveJSON(LS.loc, currentLocation);
    }, [currentLocation]);

    // persist player chunks
    useEffect(() => { saveJSON(LS.player, myPlayer.stats); }, [myPlayer.stats]);
    useEffect(() => { saveJSON(LS.inv, myPlayer.inventory); }, [myPlayer.inventory]);
    useEffect(() => { saveJSON(LS.quest, myPlayer.questList); }, [myPlayer.questList]);
    useEffect(() => { saveJSON(LS.msg, battleMessage); }, [battleMessage]);

    useEffect(() => {

        if (!combat || combat.turn !== "enemy") return

        const enemy = combat.enemy

        const damage =
            calcDamage(enemy.attack, myPlayer.stats.defense)

        setMyPlayer(p => ({
            ...p,
            stats: {
                ...p.stats,
                currentHp:
                    Math.max(0, p.stats.currentHp - damage)
            }
        }))

        const log = [
            ...combat.log,
            `${enemy.name} hits you for ${damage}`
        ]

        if (myPlayer.stats.currentHp - damage <= 0) {


            handlePlayerDeath()


            closeFightLater()

            return
        }

        setCombat({
            ...combat,
            log,
            turn: "player"
        })

    }, [combat?.turn])


    // --- derived helpers ---
    const isInDungeon = currentDungeon?.insideDungeon === true;

    // const activeArea: { EnemyHere?: EnemyTemplate[]; NPCHere?: NPC } = isInDungeon
    //     ? currentDungeonRoom
    //     : currentLocation;

    //   const activeEnemy: Enemy | undefined = (activeArea.EnemyHere && activeArea.EnemyHere.length > 0)
    //     ? activeArea.EnemyHere[0]
    //     : undefined;

    const [activeEnemy, setActiveEnemy] = useState<EnemyInstance | null>(null);;
    const [canFight, setCanFight] = useState<boolean>(() => !!activeEnemy);
    const [turn, setTurn] = useState<"player" | "enemy">("player")

    useEffect(() => {

        const area: any = isInDungeon ? currentDungeonRoom : currentLocation;

        const enemies = area?.EnemyHere;

        if (!enemies || enemies.length === 0) {
            setActiveEnemy(null);
            return;
        }

        const template =
            enemies[Math.floor(Math.random() * enemies.length)];

        if (!template) {
            setActiveEnemy(null);
            return;
        }

        if (activeEnemy?.id === template.id) return;

        const enemy = spawnEnemy(template, myPlayer);
        setActiveEnemy(enemy)
        enemy.currentHp = enemy.maxHp;

        setActiveEnemy(enemy);

    }, [isInDungeon, currentLocation.id, currentDungeonRoom.roomID]);


    const isFluctuatingEnemy = !!(activeEnemy && activeEnemy.fluctuating === true);



    useEffect(() => {
        setCanFight(!!activeEnemy);
    }, [activeEnemy?.id, isInDungeon]);





    // --- enemy snapshot for fluctuating enemies ---
    // const [myfluctuatingOpponent, setMyfluctuatingOpponent] = useState<Enemy>({
    //     id: 0, name: "", description: "", imgPath: "",
    //     fluctuating: true,
    //     currentHp: 0, maxHp: 0,
    //     defense: 0, attack: 0, speed: 0, level: 0,
    //     rewardGold: 0, rewardXP: 0,
    //     lootTable: [{ details: fakeItem, chance: 100, isDefaultItem: true }],
    // });

    // --- gating by required item ---
    function hasRequiredItemFor(loc: Location) {
        if (!loc.itemRequired) return true;
        const req = loc.itemThatsRequired;
        if (!req?.details) return false;
        const needId = req.details.id;
        return myPlayer.inventory.some(inv => inv.details.id === needId && inv.quantity > 0);
    }

    function hasRequiredItemForRoom(room: dungeonRoom) {
        if (!room.itemRequired) return true;
        const req = room.itemThatsRequired;
        if (!req?.details) return false;
        const needId = req.details.id;
        return myPlayer.inventory.some(inv => inv.details.id === needId && inv.quantity > 0);
    }

    function clearChat() {
        setPlayerOption1("");
        setEndChatMessage("");
        setNpcName("");
        setNPCDialog("");
    }

    function announceCurrentEnemy(enemy: EnemyInstance) {

        setActiveEnemy(enemy)
        setCanFight(true)

        setBattleMessage(m =>
            m + `<b style="color:purple">${enemy.name} appeared!</b><br/>`
        )
    }

    // --- movement ---
    function movePlayer(location: Location): boolean {

        if (location.itemRequired && !hasRequiredItemFor(location)) {

            const reqName =
                location.itemThatsRequired?.details?.name ??
                "the required item";

            setBattleMessage(m =>
                m + `<b style="color:orange;">You must have ${reqName} to enter.</b><br/>`
            );

            return false;
        }

        setCurrentLocation(location);
        clearChat();

        const template = location.EnemyHere?.[0];

        if (template) {

            const enemy = spawnEnemy(template, myPlayer);

            announceCurrentEnemy(enemy);

        } else {

            setActiveEnemy(null);

        }

        location.hasEntered = true;

        return true;
    }

    function moveTo(dir: "toTheNorth" | "toTheSouth" | "toTheEast" | "toTheWest") {
        const id = (currentLocation as any)[dir] as number | undefined;
        if (id == null) return;
        const loc = dataFor.dataFor.Locs.find((l: any) => l.id === id) as Location | undefined;
        if (loc === undefined) return;
        movePlayer(loc);
    }

    function moveNorth() { moveTo("toTheNorth"); }
    function moveSouth() { moveTo("toTheSouth"); }
    function moveEast() { moveTo("toTheEast"); }
    function moveWest() { moveTo("toTheWest"); }

    function movePlayerDungeon(room: dungeonRoom) {

        if (room.itemRequired && !room.hasEntered && !hasRequiredItemForRoom(room)) {

            const reqName =
                room.itemThatsRequired?.details?.name ??
                "the required item";

            setBattleMessage(m =>
                m + `<b style="color:orange;">You must have ${reqName} to enter.</b><br/>`
            );

            return false;
        }

        setCurrentDungeonRoom(room);
        clearChat();

        const template = room.EnemyHere?.[0];

        if (template) {

            const enemy = spawnEnemy(template, myPlayer);

            announceCurrentEnemy(enemy);

        } else {

            setActiveEnemy(null);

        }

        room.hasEntered = true;

        return true;
    }

    function moveDung(dir: "toTheNorth" | "toTheSouth" | "toTheEast" | "toTheWest") {
        const next = (currentDungeonRoom as any)[dir] as dungeonRoom | undefined;
        if (!next) return;
        movePlayerDungeon(next);
    }

    function moveNorthDung() { moveDung("toTheNorth"); }
    function moveSouthDung() { moveDung("toTheSouth"); }
    function moveEastDung() { moveDung("toTheEast"); }
    function moveWestDung() { moveDung("toTheWest"); }

    // --- dungeon enter/exit ---
    function enterDungeon(dung: dungeon, cl: Location) {
        // setMyfluctuatingOpponent(o => ({ ...o, id: 0, name: "" }));
        setCurrentDungeon({ ...dung, insideDungeon: true });

        const entry = dung.dungeonFloors
            ?.flatMap((f: dungeonFloor) => f.dungeonRooms ?? [])
            ?.find((r: dungeonRoom | undefined) => r?.exitLocation?.id === cl.id);



        const area = isInDungeon ? currentDungeonRoom : currentLocation;

        const template = area?.EnemyHere?.[0];


        if (entry) {
            setCurrentDungeonRoom(entry);
            setActiveEnemy(null)
            if (template) {
                const enemy = spawnEnemy(template, myPlayer);
                announceCurrentEnemy(enemy);
            }
        }
    }

    function exitDungeon() {
        if (currentDungeonRoom.exitLocation) setCurrentLocation(currentDungeonRoom.exitLocation);

        setCurrentDungeon({ id: 0, name: "", floors: 0, insideDungeon: false });

        setCurrentDungeonRoom({
            roomID: "0AA",
            dungeon: { id: 0, name: "", floors: 0, insideDungeon: false },
            floor: 0, roomNumber: 0, enemyNumber: 0,
            hasEnemy: false, exit: false, stairsUp: false, stairsDown: false,
            hasEntered: false, itemRequired: false,
        });

        const area = isInDungeon ? currentDungeonRoom : currentLocation;

        const template = area?.EnemyHere?.[0];

        if (template) {
            const enemy = spawnEnemy(template, myPlayer);
            announceCurrentEnemy(enemy);
        }
    }

    function stairsUp() {
        const next = currentDungeonRoom.toStairsUp;
        if (!next) return;
        movePlayerDungeon(next);
    }

    function stairsDown() {
        const next = currentDungeonRoom.toStairsDown;
        if (!next) return;
        movePlayerDungeon(next);
    }

    // --- leveling/stats ---
    function completelyHeal() {
        setMyPlayer(p => ({ ...p, stats: { ...p.stats, currentHp: p.stats.MaxHp } }));
    }

    function updateStats(newXP: number, oldXP: number) {
        const oldLevel = levelFromXP(oldXP);
        const newLevel = levelFromXP(newXP);

        setMyPlayer(p => {
            const updated = {
                ...p,
                stats: {
                    ...p.stats,
                    experiencePoints: newXP,
                    level: newLevel,

                    baseMaxHp: Math.round(newLevel * 3.15),
                    baseAttack: Math.round(newLevel * 1.16),
                    baseDefense: Math.round(newLevel * 1.18),
                    baseSpeed: Math.round(newLevel * 1.17),
                },
            };

            const recalced = recalcStats(updated);

            if (newLevel !== oldLevel) {
                recalced.stats.currentHp = recalced.stats.MaxHp;
            }

            return recalced;
        });

        if (newLevel !== oldLevel) {
            setBattleMessage(m => m + `<b>You have leveled up to level ${newLevel}!</b><br />`);
        }
    }


    function handlePlayerDeath() {

        setBattleMessage(m =>
            m + `<span style="color:red">You died...</span><br>`
        )

        setCombat(null)

        setTimeout(() => {

            setCurrentLocation(dataFor.dataFor.home)

            setMyPlayer(p => ({
                ...p,
                stats: {
                    ...p.stats,
                    currentHp: p.stats.MaxHp
                }
            }))

        }, 800)
    }

    // --- fight modal open ---
    function openFight() {

        if (!activeEnemy) return

        const enemyFirst =
            activeEnemy.speed > myPlayer.stats.speed

        setCombat({
            enemy: { ...activeEnemy },
            turn: enemyFirst ? "enemy" : "player",
            log: [`You engage ${activeEnemy.name}!`],
            active: true
        })

        setUi(s => ({ ...s, fightOpen: true }))
    }

    function closeFightLater() {
        setTimeout(() => setUi(s => ({ ...s, fightOpen: false })), 1000);
    }

    // --- enemy move ---

    // --- player attack ---
    function playerAttack() {

        if (!combat || combat.turn !== "player") return

        const enemy = { ...combat.enemy }

        const damage =
            calcDamage(myPlayer.stats.attack, enemy.defense)

        enemy.currentHp =
            Math.max(0, enemy.currentHp - damage)

        const log = [
            ...combat.log,
            `You hit ${enemy.name} for ${damage}`
        ]

        if (enemy.currentHp <= 0) {

            endCombat(enemy, log)

            return
        }

        setCombat({
            ...combat,
            enemy,
            log,
            turn: "enemy"
        })
    }


    function fight() {

        if (!activeEnemy) return
        if (turn !== "player") return

        const result =
            resolveCombatRound(myPlayer, activeEnemy)

        setFightMessage(m =>
            m + result.log.join("<br>") + "<br>"
        )

        setMyPlayer({ ...result.player })

        if (result.enemyDead) {
            announceCurrentEnemy(activeEnemy)
            closeFightLater()
            return
        }

        if (result.playerDead) {
            closeFightLater()
            return
        }

        setActiveEnemy({ ...result.enemy })

        setTurn("enemy")
    }

    function endCombat(enemy: any, log: string[]) {

        const xp = enemy.rewardXP ?? 0
        const gold = enemy.rewardGold ?? 0


        const oldXP = myPlayer.stats.experiencePoints
        const newXP = oldXP + xp

        updateStats(newXP, oldXP)

        setMyPlayer(p => ({
            ...p,
            stats: {
                ...p.stats,
                experiencePoints:
                    p.stats.experiencePoints + xp,
                gold: p.stats.gold + gold
            }
        }))

        const loot = rollLoot(enemy.lootTable)

        if (loot) {

            setMyPlayer(p => ({
                ...p,
                inventory:
                    addToInventory(p.inventory, loot)
            }))

            log.push(`You found ${loot.details.name}`)
        }

        setBattleMessage(m =>
            m + `<span style="font-weight:bolder">You defeated ${enemy.name}!</span><br/>`


        )
        if (loot) setBattleMessage(m => m + `You found ${loot?.details.name}<br />`)

        setCombat(null)

        const template =
            currentDungeonRoom?.EnemyHere?.[0] ??
            currentLocation?.EnemyHere?.[0]

        if (template) {
            const newEnemy = spawnEnemy(template, myPlayer)
            announceCurrentEnemy(newEnemy)
        }
    }


    // --- UI toggles ---
    function toggleStatus() { setUi(s => ({ ...s, statusOpen: !s.statusOpen })); }
    function toggleShop() { setUi(s => ({ ...s, shopOpen: !s.shopOpen })); }
    function toggleCasino() { setUi(s => ({ ...s, casinoOpen: !s.casinoOpen })); }
    function toggleBattleItems() { setUi(s => ({ ...s, battleItemOpen: !s.battleItemOpen })); }

    // --- casino ---
    function playGame(playerChoice: string, betAmount: number) {
        const computerChoice = randomInt(1, 3);
        if (myPlayer.stats.gold < betAmount) return "Thats more money than you have";

        // subtract bet
        setMyPlayer(p => ({ ...p, stats: { ...p.stats, gold: p.stats.gold - betAmount } }));

        if (parseFloat(playerChoice) === computerChoice) {
            const winAmount = betAmount * 2.25;
            setMyPlayer(p => ({ ...p, stats: { ...p.stats, gold: p.stats.gold + Math.round(winAmount) } }));
            return `You win ${Math.round(winAmount)} game currency!`;
        }

        return `You lose ${betAmount} game currency! The dealer chose ${computerChoice}.`;
    }

    // NOTE: NPC/Quest/Inventory actions are next chunk (Talk/accept/decline/heal/equip/wear/shop buy/sell)
    // We’ll port them 1:1 after the UI mounts.
    // ---------------- NPC / QUEST / INVENTORY / SHOP ----------------

    function showDialog(
        text: string,
        option1: string = "",
        option2: string = "Close"
    ) {
        setNPCDialog(text)
        setPlayerOption1(option1)
        setEndChatMessage(option2)
    }




    function Talk(npc: NPC) {

        if (!npc) return

        setNpcName(npc.name ?? "")

        const quest = npc.questGiven?.details

        if (!quest) {
            showDialog(npc.initialMessage ?? "", "", "Close")
            return
        }

        const state = getQuestState(myPlayer, quest)

        switch (state) {

            case "NOT_STARTED":
                showDialog(
                    npc.initialMessage ?? "",
                    "Accept quest",
                    "Decline"
                )
                break

            case "IN_PROGRESS":
                showDialog(
                    npc.inProgressMessage ??
                    "You haven't finished my task yet."
                )
                break

            case "READY_TO_TURN_IN":
                showDialog(
                    "Ah! You brought what I asked for.",
                    "Turn in items",
                    "Leave"
                )
                break

            case "COMPLETE":
                showDialog(
                    npc.afterMessage ??
                    "Thanks again."
                )
                break
        }
    }


    function decline(npc: any) {
        if (!npc) return;
        setNPCDialog(npc.endChatMessage ?? "End");
        setPlayerOption1("");
        setEndChatMessage("Close");
    }


    function closeDialogOptions() {
        setPlayerOption1("Okay")
        setEndChatMessage("Close")
    }

    function closeDialog() {
        setNPCDialog("")
        closeDialogOptions()
    }




    function accept(npc: NPC) {

        const q: quest | undefined = npc?.questGiven?.details
        if (!q) return

        const state = getQuestState(myPlayer, q)

        switch (state) {

            case "NOT_STARTED":

                setMyPlayer(p => ({
                    ...p,
                    questList: startQuest(p, q.id)
                }))

                setNPCDialog(npc.Dialog1 ?? "Quest started.")
                setPlayerOption1("")
                setEndChatMessage("Close")
                break


            case "READY_TO_TURN_IN":

                const needs = q.questCompletionItem ?? []
                const rewardItem = q.rewardItem ?? null
                const xp = q.rewardXP ?? 0
                const gold = q.rewardGold ?? 0

                const oldXP = myPlayer.stats.experiencePoints
                const newXP = oldXP + xp

                setMyPlayer(p => {

                    let inv = [...p.inventory]

                    for (const req of needs) {
                        inv = removeFromInventory(inv, req.details.id, req.quantity)
                    }

                    if (rewardItem) {
                        inv = addToInventory(inv, {
                            details: rewardItem.details,
                            quantity: rewardItem.quantity ?? 1
                        })
                    }

                    return {
                        ...p,
                        inventory: inv,
                        questList: completeQuest(p, q.id),
                        stats: {
                            ...p.stats,
                            experiencePoints: newXP,
                            gold: p.stats.gold + gold
                        }
                    }
                })

                updateStats(newXP, oldXP)

                setNPCDialog(npc.afterMessage ?? q.message ?? "Quest complete!")
                setPlayerOption1("")
                setEndChatMessage("Close")

                break

            case "IN_PROGRESS":

                setNPCDialog(
                    npc.inProgressMessage ??
                    "You haven't finished my task yet."
                )

                setPlayerOption1("")
                setEndChatMessage("Close")
                break


            case "COMPLETE":

                setNPCDialog(npc.afterMessage ?? "Thanks again.")
                setPlayerOption1("")
                setEndChatMessage("Close")
                break
        }
    }


    function handleDialogClose(npc: any) {
        if (playerOption1) {
            decline(npc)
        } else {
            clearChat()
        }
    }


    // --- inventory actions ---

    function heal(inv: any) {
        if (!inv?.details?.healing || inv.quantity <= 0) return;

        const amt = inv.details.healingStats?.amountHealed ?? 0;

        setMyPlayer(p => {
            const nextHp = Math.min(p.stats.MaxHp, p.stats.currentHp + amt);
            const nextInv = removeFromInventory(p.inventory, inv.details.id, 1);
            return {
                ...p,
                inventory: nextInv,
                stats: { ...p.stats, currentHp: nextHp },
            };
        });

        setFightMessage(m => m + `<span style="color:green;">You healed ${amt} HP.</span><br/>`);
    }

    function Equip(inv: any) {
        if (!inv?.details?.equippable || inv.quantity <= 0) return;

        const stats = inv.details.equippableStats;
        if (!stats) return;

        setMyPlayer(p => {
            if (p.weapon?.equipped) return p;

            const weapon = {
                ...stats,
                equipped: true
            };

            saveJSON(LS.equipped, weapon);

            return recalcStats({
                ...p,
                weapon
            });
        });
    }

    function unequip(inv: any) {
        if (!inv?.details?.equippable) return;

        setMyPlayer(p => {
            if (!p.weapon?.equipped) return p;

            const weapon = {
                itemName: "N/A",
                attackBonus: 0,
                defenseBonus: 0,
                speedBonus: 0,
                equipped: false
            };

            saveJSON(LS.equipped, weapon);

            return recalcStats({
                ...p,
                weapon
            });
        });
    }

    function Wear(inv: any) {
        if (!inv?.details?.wearable || inv.quantity <= 0) return;

        const stats = inv.details.wearableStats;
        if (!stats) return;

        setMyPlayer(p => {
            if (p.wearable?.equipped) return p;

            const wearable = {
                ...stats,
                equipped: true
            };

            saveJSON(LS.worn, wearable);

            return recalcStats({
                ...p,
                wearable
            });
        });
    }

    function removeItem(inv: any) {
        if (!inv?.details?.wearable) return;

        setMyPlayer(p => {
            if (!p.wearable?.equipped) return p;

            const wearable = {
                itemName: "N/A",
                attackBonus: 0,
                defenseBonus: 0,
                speedBonus: 0,
                equipped: false
            };

            saveJSON(LS.worn, wearable);

            return recalcStats({
                ...p,
                wearable
            });
        });
    }

    // --- shop actions ---
    function buyItem(si: any) {
        if (!si) return;
        const price = si.price ?? 0;

        if (myPlayer.stats.gold < price) {
            setBattleMessage(m => m + `<b style="color:red;">Not enough gold.</b><br/>`);
            return;
        }

        setMyPlayer(p => ({
            ...p,
            stats: { ...p.stats, gold: p.stats.gold - price },
            inventory: addToInventory(p.inventory, { details: si, quantity: 1 }),
        }));

        setBattleMessage(m => m + `Bought 1 ${si.name}.<br/>`);
    }

    function sellItem(inv: any) {
        if (!inv?.details || inv.quantity <= 0) return;
        const sellPrice = Math.round((inv.details.price ?? 0) / 1.5);

        if (sellPrice <= 0) return;

        setMyPlayer(p => ({
            ...p,
            stats: { ...p.stats, gold: p.stats.gold + sellPrice },
            inventory: removeFromInventory(p.inventory, inv.details.id, 1),
        }));

        setBattleMessage(m => m + `Sold 1 ${inv.details.name} for ${sellPrice} gold.<br/>`);
    }


    return {
        // state
        ui,
        isMobileDevice,
        isInDungeon,
        canFight,
        currentLocation,
        currentDungeon,
        currentDungeonRoom,
        activeEnemy,
        isFluctuatingEnemy,
        // myfluctuatingOpponent,
        myPlayer,
        battleMessage,
        fightMessage,
        npcName,
        NPCDialog,
        playerOption1,
        EndChatMessage,
        turn,
        combat,
        // actions (movement / modal / combat)
        moveNorth,
        moveSouth,
        moveEast,
        moveWest,
        moveNorthDung,
        moveSouthDung,
        moveEastDung,
        moveWestDung,
        enterDungeon,
        exitDungeon,
        stairsUp,
        stairsDown,

        playerAttack,
        openFight,
        fight,
        toggleStatus,
        toggleShop,
        toggleCasino,
        toggleBattleItems,

        // casino
        playGame,

        // setters needed by UI forms (casino)
        setUi,
        setFightMessage,
        setBattleMessage,

        // npc stubs for next chunk
        clearChat,
        setNpcName,
        setNPCDialog,
        setPlayerOption1,
        setEndChatMessage,
        Talk,
        accept,
        decline,
        handleDialogClose,


        heal,
        Equip,
        unequip,
        Wear,
        removeItem,


        buyItem,
        sellItem,
    };
}