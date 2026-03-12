import { useEffect, useRef, useState } from "react";
import type { inventoryItem } from "../types/item";
import { useHomelessHero } from "../engine/useHomelessHero";
import { FightModal } from "./FightModal";
import { StatusModal } from "./StatusModal";
import { ShopModal } from "./ShopModal";
import { CasinoModal } from "./CasinoModal";
import '../styles/world.css'
import { HpBar } from "./HpBar"
export function WorldView() {
    const g = useHomelessHero();
    const npc = g.isInDungeon
        ? g.currentDungeonRoom.NPCHere
        : g.currentLocation.NPCHere;


    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [g.battleMessage]);

    // tooltip / selected item popup equivalent
    const [selectedItem, setSelectedItem] = useState<inventoryItem | null>(null);

    return (


        <div className={g.isInDungeon ? "dungeon-mode" : "overworld-mode"}>
            <div className="col-sm-12">
                <div className="row">
                    {/* LEFT: Navigation */}
                    <div className="navigateWorld col-sm-4">
                        <div className="currentLocation">
                            Location: {g.currentLocation.name}
                            <br />
                            <span style={{ fontWeight: "bold" }}>{g.currentLocation.description}</span>
                            <br />
                            {g.currentLocation.dungeonThatsHere && g.currentDungeon.insideDungeon && (
                                <span>
                                    Sub-Location: {g.currentLocation.dungeonThatsHere.name} <br />
                                </span>
                            )}
                            {g.isInDungeon && (
                                <span style={{ fontSize: ".65em" }}>Room # {g.currentDungeonRoom.roomID}</span>
                            )}
                        </div>
                        <div className="buttons">
                            {g.activeEnemy && (
                                <button
                                    disabled={!g.canFight}
                                    style={{ backgroundColor: g.canFight ? "limeGreen" : undefined }}
                                    onClick={g.openFight}
                                    className="fight"
                                >
                                    Fight
                                </button>
                            )}

                            {g.currentLocation.shop === true && (
                                <button onClick={g.toggleShop} className="shop">Shop</button>
                            )}

                            {(g.currentLocation.id === 1023 || g.currentLocation.id === 1025) && !g.isInDungeon && (
                                <button onClick={g.toggleCasino} className="shop">Gamble</button>
                            )}

                            <button onClick={g.toggleStatus} className="status">Status</button>

                            {/* Enter/Exit Dungeon */}
                            <div className="optionBox">
                                {g.currentLocation.dungeonThatsHere && !g.currentDungeon.insideDungeon && (
                                    <button
                                        disabled={!g.currentLocation.dungeonHere}
                                        onClick={() => g.enterDungeon(g.currentLocation.dungeonThatsHere!, g.currentLocation)}
                                        className="proceedDungeon"
                                    >
                                        Enter
                                    </button>
                                )}

                                {g.currentLocation.dungeonThatsHere && g.currentDungeon.insideDungeon && g.currentDungeonRoom.exit && (
                                    <button
                                        disabled={!g.currentLocation.dungeonHere}
                                        onClick={() => g.exitDungeon()}
                                        className="proceedDungeon"
                                    >
                                        Exit
                                    </button>
                                )}
                            </div>

                            {/* Dungeon stairs */}
                            <div>
                                {g.currentLocation.dungeonThatsHere && g.currentDungeonRoom.toStairsUp && (
                                    <button onClick={g.stairsUp} className="upDungeon">Up</button>
                                )}
                                {g.currentLocation.dungeonThatsHere && g.currentDungeonRoom.toStairsDown && (
                                    <button onClick={g.stairsDown} className="downDungeon">Down</button>
                                )}
                            </div>

                            {/* Direction buttons */}
                            {!g.currentDungeon.insideDungeon ? (
                                <div className="directions">
                                    <button onClick={g.moveNorth} disabled={g.currentLocation.toTheNorth == null} className="north">↑</button><br />
                                    <button onClick={g.moveWest} disabled={g.currentLocation.toTheWest == null} className="west">←</button>
                                    <button onClick={g.moveEast} disabled={g.currentLocation.toTheEast == null} className="east">→</button>
                                    <br />
                                    <button onClick={g.moveSouth} disabled={g.currentLocation.toTheSouth == null} className="south">↓</button>
                                </div>
                            ) : (
                                <div className="directions">
                                    <button onClick={g.moveNorthDung} disabled={!g.currentDungeonRoom.toTheNorth} className="north">↑</button><br />
                                    <button onClick={g.moveWestDung} disabled={!g.currentDungeonRoom.toTheWest} className="west">←</button>
                                    <button onClick={g.moveEastDung} disabled={!g.currentDungeonRoom.toTheEast} className="east">→</button>
                                    <br />
                                    <button onClick={g.moveSouthDung} disabled={!g.currentDungeonRoom.toTheSouth} className="south">↓</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MIDDLE: Scene */}
                    <div className="battleSection col-sm-4">
                        <img
                            src={`/Locations/${g.currentLocation.imgPath}.png`}
                            className="locationImg"
                            alt={g.currentLocation.description}
                        />

                        {/* NPC image logic later */}
                        {/* Dialog UI later */}

                        {/* Overworld Chat button */}
                        {npc && (
                            <button
                                onClick={() => g.Talk(npc)}
                                className="chat"
                            >
                                Talk
                            </button>
                        )}






                        <div className="col-sm-12 dialog">
                            {npc &&
                                <div className="playerDialog">
                                    <b>{g.npcName}</b><br />
                                    {g.NPCDialog}<br />
                                    {g.currentLocation.NPCHere?.optionPerson !== false && (
                                        <div className="options">
                                            <span onClick={() => g.accept(npc)} className="option accept">
                                                {g.playerOption1}
                                            </span>
                                            <span
                                                onClick={() => {
                                                    g.handleDialogClose(npc)

                                                }}
                                                className="option decline"
                                            >
                                                {g.EndChatMessage}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            }

                        </div>


                        {npc && <img
                            src={`/other/npc.png`}
                            className="npcImg"
                            alt="npc"
                        />}

                    </div>

                    {/* RIGHT: Stats + battle log */}
                    <div className="col-sm-4">
                        <div className="playerStats">
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            <HpBar
                                                current={g.myPlayer.stats.currentHp}
                                                max={g.myPlayer.stats.MaxHp}
                                                color="#4caf50"
                                            />
</td>
                                     </tr><tr>
                    <td>Health:</td><td>
                                            <div style={{ textAlign: "right", fontSize: "0.8rem" }}>
                                        {g.myPlayer.stats.currentHp}/{g.myPlayer.stats.MaxHp}
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                       
                                        <td style={{ textAlign: "right" }}>
                                            <span style={{ color: g.myPlayer.stats.currentHp >= g.myPlayer.stats.MaxHp / 3 ? (g.isInDungeon ? "white" : "black") : (g.isInDungeon ? "#ff6b6b" : "red") }}>
                                                {g.myPlayer.stats.currentHp}/{g.myPlayer.stats.MaxHp}
                                            </span>
                                        </td>
                                    </tr> */}
                                    <tr><td>Level:</td><td style={{ textAlign: "right" }}>{g.myPlayer.stats.level}</td></tr>
                                    <tr><td>Weapon:</td><td style={{ textAlign: "right" }}>{g.myPlayer.weapon?.itemName}</td></tr>
                                    <tr><td>Gear:</td><td style={{ textAlign: "right" }}>{g.myPlayer.wearable?.itemName}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bmessage" ref={scrollRef} id="bmessage">
                            {/* Angular used sanitizer; in React, render HTML intentionally */}
                            <div dangerouslySetInnerHTML={{ __html: g.battleMessage }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {g.combat && <FightModal game={g} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
            {g.ui.statusOpen && <StatusModal game={g} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
            {g.ui.shopOpen && <ShopModal game={g} />}
            {g.ui.casinoOpen && <CasinoModal game={g} />}
        </div>
    );
}