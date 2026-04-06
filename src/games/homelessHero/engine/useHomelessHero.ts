import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import type { Location, dungeon, dungeonRoom, dungeonFloor } from "../types/locations";
import type { EnemyInstance } from "../types/enemy";
import type { inventoryItem, } from "../types/item";
import type { NPC } from "../types/NPC";
import type { player } from "../types/player";
import type { SaveGameDTO } from "../types/saveTypes";
import { calcDamage, levelFromXP, randomInt } from "./combat";
import { rollLoot } from "./loot";
import type { CombatState } from "../types/combat";
import { recalcStats } from "./stats"
import type { quest, } from "../types/quest";
import { resolveCombatRound } from "./combatRound";
import { addToInventory, removeFromInventory } from "./helpers";
import * as dataFor from "../content/data";
import { startQuest, completeQuest, } from "./quests";
import { spawnEnemy } from "./enemySpawn";
import { getQuestState } from "./questLogic";
import { useAutosave } from "./useAutosave";
import { loadFromSave } from "./saveMapper";
import { loadGame, saveGame } from "./saveRepository";
import { useAuth } from "../../../platform/AuthContext";
import { calculateScore } from "./score";
import { submitGameSession } from "./gameSessionRepository"
import { useNavigate } from "react-router-dom";
import { awardGameXP } from "../../../platform/xpManager";
import { recordGameSession } from "../../../platform/gameService";

// YOU PROVIDE THIS MODULE (same shape as Angular: dataFor.home, dataFor.Locs)
type UiState = {
    fightOpen: boolean;
    statusOpen: boolean;
    shopOpen: boolean;
    casinoOpen: boolean;
    battleItemOpen: boolean;
};


function detectMobileDevice() {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}


export function useHomelessHero(mode: string | null) {

    const isMobileDevice = useMemo(() => detectMobileDevice(), []);
    const navigate = useNavigate();

    const { token } = useAuth();
    const [initialSave, setInitialSave] = useState<SaveGameDTO | null>(null);
    const [isLoadedFromServer, setIsLoadedFromServer] = useState(false);



    useEffect(() => {
        if (!token) return;

        if (mode === "new") {
            console.log("STARTING NEW GAME");

            const newPlayer = createNewPlayer(dataFor.dataFor.home);
            setMyPlayer(newPlayer);
            setInitialSave(null);
            setIsLoadedFromServer(true);
            return;
        }

        // continue
        loadGame(token)
            .then(save => {
                if (save) {
                    const loaded = loadFromSave(save);
                    setMyPlayer(recalcStats(loaded));
                    setInitialSave(save);
                } else {
                    // fallback
                    const newPlayer = createNewPlayer(dataFor.dataFor.home);
                    setMyPlayer(newPlayer);
                }
            })
            .catch(err => {
                console.error("LOAD FAILED", err);
            })
            .finally(() => {
                setIsLoadedFromServer(true);
            });

    }, [token, mode]);

    // --- base placeholders matching your Angular defaults ---
    const BATTLE_MSG_KEY = "hh_battleMessage";
    const initialXP = 66;
    const initialHP = 9;
    const initialLevel = levelFromXP(initialXP);

    const [ui, setUi] = useState<UiState>({
        fightOpen: false,
        statusOpen: false,
        shopOpen: false,
        casinoOpen: false,
        battleItemOpen: false,
    });


    const [npcName, setNpcName] = useState("");
    const [NPCDialog, setNPCDialog] = useState("");
    const [playerOption1, setPlayerOption1] = useState<string>("");
    const [EndChatMessage, setEndChatMessage] = useState<string>("");


    // const initialLocation = useMemo(() => {
    //     if (!initialSave) return dataFor.dataFor.home;

    //     return (
    //         dataFor.dataFor.Locs.find(
    //             l => l.id === initialSave.location.locationId
    //         ) ?? dataFor.dataFor.home
    //     );
    // }, [initialSave]);

    const [currentLocation, setCurrentLocation] = useState<Location>(dataFor.dataFor.home);

    const [currentDungeon, setCurrentDungeon] = useState<dungeon>({
        id: 0,
        name: "",
        floors: 0,
        insideDungeon: false,
    });


    const [currentDungeonRoom, setCurrentDungeonRoom] = useState<dungeonRoom>(() => {
        return {
            roomID: initialSave?.location.dungeonRoomId ?? "0AA",
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
        };
    });

    // --- NPC dialog ---




    // --- messages ---



    const [fightMessage, setFightMessage] = useState<string>("");
    const [combat, setCombat] = useState<CombatState | null>(null)


    const [battleMessage, setBattleMessage] = useState<string>(() => {
        const saved = localStorage.getItem(BATTLE_MSG_KEY);
        if (saved) return saved;

        return `You wake up in a strange alley-way, unsure of anything. You don't remember your name, your occupation, or anyone around you. You have no idea where you live, and for all you know, you are homeless. Everything seems new.... and scary. <br /><br /> `;
    });


    const [myPlayer, setMyPlayer] = useState<player | null>(null);
    const isReady = !!myPlayer && isLoadedFromServer;

    const endGame = useCallback(async () => {
        if (!myPlayer || !token) return;

        try {
            const score = calculateScore(myPlayer);

            console.log("FINAL SCORE:", score);

            // 🎯 XP bonus
            const bonusXP = Math.floor(score / 50);

            // 🏆 Submit leaderboard
            await submitGameSession(token, score, bonusXP);

            // ⚡ Fire XP event (goes to your Arcade system)
            window.dispatchEvent(new CustomEvent("arcade:xp", {
                detail: {
                    gameId: "homeless-hero",
                    amount: bonusXP,
                    reason: "Game completed"
                }
            }));

            // 💾 Optional: clear save (since run is over)
            // await deleteSave(token);

            // 🚀 Go to results screen
            navigate("/rpg/results", {
                state: { score }
            });

        } catch (err) {
            console.error("END GAME FAILED", err);
        }
    }, [myPlayer, token, navigate]);


    useEffect(() => {
        if (!myPlayer) return;

        if (myPlayer.stats.level >= 5) {
            endGame();
        }
    }, [myPlayer?.stats.level]);

    useEffect(() => {
        if (!initialSave) return;

        const loc =
            dataFor.dataFor.Locs.find(
                l => l.id === initialSave.location.locationId
            ) ?? dataFor.dataFor.home;

        console.log("SETTING LOCATION FROM SAVE:", loc.id); // 👈 debug

        setCurrentLocation(loc);

    }, [initialSave]);

    useEffect(() => {
        if (!initialSave) return;

        setCurrentDungeonRoom(prev => ({
            ...prev,
            roomID: initialSave.location.dungeonRoomId ?? "0AA"
        }));

    }, [initialSave]);


    useEffect(() => {
        if (!isLoadedFromServer) return;

        console.log("INIT PLAYER", { initialSave });

        if (initialSave) {
            const loaded = loadFromSave(initialSave);
            setMyPlayer(recalcStats(loaded));
        } else {
            const newPlayer = createNewPlayer(dataFor.dataFor.home); // 👈 DON'T rely on initialLocation
            setMyPlayer(newPlayer);
        }

    }, [isLoadedFromServer, initialSave]); // ✅ CRITICAL









    function createNewPlayer(startLocation: Location): player {
        return recalcStats({
            currentLocation: startLocation,
            stats: {
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
            inventory: [],
            questList: [],
            weaponItemId: undefined,
            wearableItemId: undefined,
        });
    }




    useEffect(() => {
        localStorage.setItem(BATTLE_MSG_KEY, battleMessage);
    }, [battleMessage]);

    useEffect(() => {

        if (!combat || combat.turn !== "enemy") return
        if (!myPlayer) return;
        const enemy = combat.enemy

        const damage =
            calcDamage(enemy.attack, myPlayer.stats.defense)

        setMyPlayer(p => {
            if (!p) return p;

            return {
                ...p,
                stats: {
                    ...p.stats,
                    currentHp: Math.max(0, p.stats.currentHp - damage)
                }
            }
        })

        const log = [
            ...combat.log,
            `${enemy.name} hits you for ${damage}`
        ]

        if (myPlayer.stats.currentHp - damage <= 0) {
            closeFightLater()

            handlePlayerDeath()


         

            return
        }

        setCombat({
            ...combat,
            log,
            turn: "player"
        })

    }, [combat?.turn, myPlayer])


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
    const [isHydrated, setIsHydrated] = useState(false);

    type SaveStatus = "idle" | "saving" | "saved" | "error";

    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");


    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {

        const area: any = isInDungeon ? currentDungeonRoom : currentLocation;

        const enemies = area?.EnemyHere;
        if (!myPlayer) return;
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

        if (activeEnemy && activeEnemy.currentHp > 0 && activeEnemy.id === template.id) {
            return;
        }

        const enemy = spawnEnemy(template, myPlayer);

        setActiveEnemy({
            ...enemy,
            currentHp: enemy.maxHp
        })

    }, [isInDungeon, currentLocation.id, currentDungeonRoom.roomID]);


    const isFluctuatingEnemy = !!(activeEnemy && activeEnemy.fluctuating === true);
    const isLoading = !token || !isLoadedFromServer || !myPlayer;
    const save = useCallback(async (playerOverride?: player) => {
        if (!myPlayer || !token) return;

        const p = playerOverride ?? myPlayer;

        const data: SaveGameDTO = {
            version: 1,
            player: {
                stats: {
                    gold: p.stats.gold,
                    currentHp: p.stats.currentHp,
                    maxHp: p.stats.MaxHp,
                    experiencePoints: p.stats.experiencePoints,
                    level: p.stats.level,
                    deathCount: p.stats.deathCount,
                },
                baseStats: {
                    baseAttack: p.stats.baseAttack,
                    baseDefense: p.stats.baseDefense,
                    baseSpeed: p.stats.baseSpeed,
                    baseMaxHp: p.stats.baseMaxHp,
                },
            },
            inventory: {
                items: p.inventory.map(i => ({
                    itemId: i.details.id,
                    quantity: i.quantity,
                })),
            },
            equipment: {
                weaponItemId: p.weaponItemId,
                wearableItemId: p.wearableItemId,
            },
            quests: p.questList.map(q => ({
                questId: q.id,
                completed: q.isComplete,
            })),
            location: {
                locationId: currentLocation.id,
                dungeonRoomId: currentDungeonRoom?.roomID,
            },
        };

        try {
            setSaveStatus("saving");

            await saveGame(data, token); // 👈 IMPORTANT: must await

            setSaveStatus("saved");

            // fade out after a bit
            setTimeout(() => setSaveStatus("idle"), 1500);

        } catch (err) {
            console.error("SAVE FAILED", err);
            setSaveStatus("error");
        }

    }, [myPlayer, token, currentLocation.id, currentDungeonRoom?.roomID]);



    useEffect(() => {
        setCanFight(!!activeEnemy);
    }, [activeEnemy?.id, isInDungeon]);


    useEffect(() => {
        if (!isHydrated || !myPlayer || !token || !initialSave) return;

        setSaveStatus("saving")
        save();

        const t = setTimeout(() => setSaveStatus("saving"), 400);
        return () => clearTimeout(t);
    }, [
        isHydrated,
        currentLocation.id,
        currentDungeonRoom?.roomID,
        myPlayer?.stats.level,
        myPlayer?.stats.experiencePoints,
        myPlayer?.weaponItemId,
        myPlayer?.wearableItemId,
        save,
    ]);
    const isFirstRender = useRef(true);

    useAutosave(() => {
        if (!isHydrated) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setSaveStatus("saving");
        save();

        setTimeout(() => setSaveStatus("saving"), 400);
    }, 1200);


    // --- enemy snapshot for fluctuating enemies ---
    // const [myfluctuatingOpponent, setMyfluctuatingOpponent] = useState<Enemy>({
    //     id: 0, name: "", description: "", imgPath: "",
    //     fluctuating: true,
    //     currentHp: 0, maxHp: 0,
    //     defense: 0, attack: 0, speed: 0, level: 0,
    //     rewardGold: 0, rewardXP: 0,
    //     lootTable: [{ details: fakeItem, chance: 100, isDefaultItem: true }],
    // });


    function getEquippedWeapon(player: player) {
        if (!player || !player.weaponItemId) return undefined;
        return dataFor.getItem(player.weaponItemId);
    }

    function getEquippedWearable(player: player) {
        if (!player || !player.wearableItemId) return undefined;
        return dataFor.getItem(player.wearableItemId);
    }
    // --- gating by required item ---
    function hasRequiredItemFor(loc: Location) {
        if (!myPlayer) return;
        if (!loc.itemRequired) return true;
        const req = loc.itemThatsRequired;
        if (!req?.details) return false;
        const needId = req.details.id;
        return myPlayer.inventory.some(inv => inv.details.id === needId && inv.quantity > 0);
    }

    function hasRequiredItemForRoom(room: dungeonRoom) {
        if (!myPlayer) return;
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
            if (!myPlayer) return false;
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
            if (!myPlayer) return;
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
            if (!myPlayer) return;
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
            if (!myPlayer) return;
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
    // function completelyHeal() {
    //     setMyPlayer(p => { if (!p) return p; return { ...p, stats: { ...p.stats, currentHp: p.stats.MaxHp } } });
    // }

    function updateStats(newXP: number, oldXP: number) {
        const oldLevel = levelFromXP(oldXP);
        const newLevel = levelFromXP(newXP);

        setMyPlayer(p => {
            if (!p) return p;
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
            awardGameXP({
                gameId: "homeless-hero",
                amount: newLevel * 2,
                source: "homeless-hero",
                reason: `Reached level ${newLevel}`,
                });
            if (token) {
                recordGameSession(
                    token,
                    "homeless-hero",
                    0,   // score = how many rounds they won
                    newLevel * 2
                );
            }

        }
    }


    function handlePlayerDeath() {

        setBattleMessage(m =>
            m + `<span style="color:red">You died...</span><br>`
        )

        setCombat(null)

        setTimeout(() => {
            exitDungeon()
            setCurrentLocation(dataFor.dataFor.home)

            setMyPlayer(p => {
                if (!p) return p;
                return {
                    ...p,
                    stats: {
                        ...p.stats,
                        currentHp: p.stats.MaxHp,
                        deathCount: p.stats.deathCount + 1
                    }
                }
            })

        }, 800)
    }

    // --- fight modal open ---
    function openFight() {
        if (!myPlayer) return;
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
        if (!myPlayer) return;
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
        if (!myPlayer) return;
        const xp = enemy.rewardXP ?? 0
        const gold = enemy.rewardGold ?? 0


        const oldXP = myPlayer.stats.experiencePoints
        const newXP = oldXP + xp

        updateStats(newXP, oldXP)






        awardGameXP({
            gameId: "homeless-hero",
            amount: Math.max(1, Math.floor(xp / 10)),
            source: "homeless-hero",
            reason: `Defeated ${enemy.name}`,
      
        });
        if (token) {
            recordGameSession(
                token,
                "homeless-hero",
                0,   // score = how many rounds they won
                Math.max(1, Math.floor(xp / 10)),
            );
        }
        setMyPlayer(p => {
            if (!p) return p;
            return {
                ...p,
                stats: {
                    ...p.stats,
                    experiencePoints:
                        p.stats.experiencePoints + xp,
                    gold: p.stats.gold + gold
                }
            }
        })

        const loot = rollLoot(enemy.lootTable)

        if (loot) {

            setMyPlayer(p => {
                if (!p) return p;
                return {
                    ...p,
                    inventory:
                        addToInventory(p.inventory, loot)
                }
            })

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
        if (!myPlayer) return;
        if (myPlayer.stats.gold < betAmount) return "Thats more money than you have";

        // subtract bet
        setMyPlayer(p => { if (!p) return p; return { ...p, stats: { ...p.stats, gold: p.stats.gold - betAmount } } });

        if (parseFloat(playerChoice) === computerChoice) {
            const winAmount = betAmount * 2.25;
            setMyPlayer(p => { if (!p) return p; return { ...p, stats: { ...p.stats, gold: p.stats.gold + Math.round(winAmount) } } });
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
        if (!myPlayer) return;
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


    // function closeDialogOptions() {
    //     setPlayerOption1("Okay")
    //     setEndChatMessage("Close")
    // }

    // function closeDialog() {
    //     setNPCDialog("")
    //     closeDialogOptions()
    // }




    function accept(npc: NPC) {
        if (!myPlayer) return;
        const q: quest | undefined = npc?.questGiven?.details
        if (!q) return

        const state = getQuestState(myPlayer, q)

        switch (state) {

            case "NOT_STARTED":

                setMyPlayer(p => {
                    if (!p) return p;
                    return {

                        ...p,
                        questList: startQuest(p, q.id)
                    }
                })

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
                    if (!p) return p;

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
                awardGameXP({
                  gameId: "homeless-hero",
                    amount: Math.max(5, Math.floor(xp / 5)),
                    source: "homeless-hero",
                    reason: "Quest completed",
                   
                });
                if (token) {
                    recordGameSession(
                        token,
                        "homeless-hero",
                        0,   // score = how many rounds they won
                        Math.max(5, Math.floor(xp / 5)),
                    );
                }


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
            if (!p) return p;
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

    function Equip(inv: inventoryItem) {

        // if (inv.details.equippableStats) inv.details.equippableStats.equipped = true
        if (!inv?.details?.equippable || inv.quantity <= 0) return;

        setMyPlayer(p => {
            if (!p) return p;
            const updated = {
                ...p,
                weaponItemId: inv.details.id,
            };
            const recalced = recalcStats(updated);

            setSaveStatus("saving");
            save(recalced);
            setTimeout(() => setSaveStatus("saving"), 400);// 🔥 SAVE THE CORRECT STATE

            return recalced;
        });
    }

    function unequip() {

        // if (inv.details.equippableStats) inv.details.equippableStats.equipped = false
        setMyPlayer(p => {
            if (!p) return p;
            const updated = {
                ...p,
                weaponItemId: undefined,
            };
            const recalced = recalcStats(updated);

            setSaveStatus("saving");
            save(recalced);
            setTimeout(() => setSaveStatus("saving"), 400);

            return recalced;
        });
    }
    function Wear(inv: inventoryItem) {
        if (!inv?.details?.wearable || inv.quantity <= 0) return;

        // if (inv.details.wearableStats) inv.details.wearableStats.equipped = true


        setMyPlayer(p => {
            if (!p) return p;
            const updated = {
                ...p,
                wearableItemId: inv.details.id,
            };
            const recalced = recalcStats(updated);

            setSaveStatus("saving")
            save(recalced);

            return recalced;
        });
    }

    function removeItem() {

        // if (inv.details.wearableStats) inv.details.wearableStats.equipped = false

        setMyPlayer(p => {
            if (!p) return p;
            const updated = {
                ...p,
                wearableItemId: undefined,
            }
            const recalced = recalcStats(updated);

            setSaveStatus("saving");
            save(recalced);
            setTimeout(() => setSaveStatus("saving"), 400);

            return recalced;

        })



    }
    // --- shop actions ---
    function buyItem(si: any) {
        if (!si) return;
        const price = si.price ?? 0;
        if (!myPlayer) return;
        if (myPlayer.stats.gold < price) {
            setBattleMessage(m => m + `<b style="color:red;">Not enough gold.</b><br/>`);
            return;
        }

        setMyPlayer(p => {
            if (!p) return p;
            return {
                ...p,
                stats: { ...p.stats, gold: p.stats.gold - price },
                inventory: addToInventory(p.inventory, { details: si, quantity: 1 }),
            }
        });

        setBattleMessage(m => m + `Bought 1 ${si.name}.<br/>`);
    }

    function sellItem(inv: any) {
        if (!inv?.details || inv.quantity <= 0) return;
        const sellPrice = Math.round((inv.details.price ?? 0) / 1.5);

        if (sellPrice <= 0) return;

        setMyPlayer(p => {
            if (!p) return p;
            return {
                ...p,
                stats: { ...p.stats, gold: p.stats.gold + sellPrice },
                inventory: removeFromInventory(p.inventory, inv.details.id, 1),
            }
        });

        setBattleMessage(m => m + `Sold 1 ${inv.details.name} for ${sellPrice} gold.<br/>`);
    }


    return {
        // state
        isReady,
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
        isLoading,
        saveStatus,
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



        getEquippedWeapon,
        getEquippedWearable,
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