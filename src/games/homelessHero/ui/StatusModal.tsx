
import type { inventoryItem } from "../types/item";
import { useState } from "react";
import { ClickTooltip } from "./ClickTooltip";
import { dataFor } from "../content/data";

export function StatusModal({
  game,
}: {
  game: any;
  selectedItem: inventoryItem | null;
  setSelectedItem: (x: inventoryItem | null) => void;
}) {

  const [openTooltip, setOpenTooltip] = useState<string | null>(null)

  const weapon = game.getEquippedWeapon(game.myPlayer);
  const wearable = game.getEquippedWearable(game.myPlayer);
  
  const isEquipped = game.myPlayer.weaponItemId ? game.myPlayer.weaponItemId === weapon.id : false
const isWorn = game.myPlayer.wearableItemId ? game.myPlayer.wearableItemId === wearable.id : false

  return (
    <div className="dataWindow">
      <div className="col-sm-12" style={{ textAlign: "center" }}>
        Status Window
        <div onClick={game.toggleStatus} style={{ cursor: "pointer", float: "right", width: 10, margin: "3px 10px" }}>
          X
        </div>
      </div>

      <div className="playerStats2 col-sm-4">
        <table style={{ width: "80%" }}>
          <tbody>
            <tr><td>Health:</td><td style={{ textAlign: "right" }}>{game.myPlayer.stats.currentHp}/{game.myPlayer.stats.MaxHp}</td></tr>
            <tr>
              <td>
                <ClickTooltip
                  id="stat-attack"
                  label={<span style={{ cursor: "pointer", textDecoration: "underline" }}>Attack</span>}
                  openTooltip={openTooltip}
                  setOpenTooltip={setOpenTooltip}
                >
                  <b>Attack</b>
                  <hr />

                  Base: {game.myPlayer.stats.baseAttack}<br />
                  Weapon Bonus: {game.myPlayer.weapon?.attackBonus ?? 0}
                </ClickTooltip>
              </td>

              <td style={{ textAlign: "right" }}>
                {game.myPlayer.stats.attack}
              </td>
            </tr>

            <tr>
              <td>
                <ClickTooltip
                  id="stat-defense"
                  label={<span style={{ cursor: "pointer", textDecoration: "underline" }}>Defense</span>}
                  openTooltip={openTooltip}
                  setOpenTooltip={setOpenTooltip}
                >
                  <b>Defense</b>
                  <hr />

                  Base: {game.myPlayer.stats.baseDefense}<br />
                  Armor Bonus: {game.myPlayer.wearable?.defenseBonus ?? 0}
                </ClickTooltip>
              </td>

              <td style={{ textAlign: "right" }}>
                {game.myPlayer.stats.defense}
              </td>
            </tr>

            <tr>
              <td>
                <ClickTooltip
                  id="stat-speed"
                  label={<span style={{ cursor: "pointer", textDecoration: "underline" }}>Speed</span>}
                  openTooltip={openTooltip}
                  setOpenTooltip={setOpenTooltip}
                >
                  <b>Speed</b>
                  <hr />

                  Base: {game.myPlayer.stats.baseSpeed}<br />
                  Equipment Bonus: {(game.myPlayer.weapon?.speedBonus ?? 0) + (game.myPlayer.wearable?.speedBonus ?? 0)}
                </ClickTooltip>
              </td>

              <td style={{ textAlign: "right" }}>
                {game.myPlayer.stats.speed}
              </td>
            </tr>
            <tr><td>Level:</td><td style={{ textAlign: "right" }}>{game.myPlayer.stats.level}</td></tr>
            <tr><td>Exp. Points:</td><td style={{ textAlign: "right" }}>{game.myPlayer.stats.experiencePoints}</td></tr>
            <tr><td>Gold:</td><td style={{ textAlign: "right" }}>{game.myPlayer.stats.gold}</td></tr>
            <tr><td>Death Count:</td><td style={{ textAlign: "right" }}>{game.myPlayer.stats.deathCount}</td></tr>
            <tr><td>&nbsp;</td></tr>
            <tr>
              <td>Weapon:</td>
              <td style={{ textAlign: "right", fontSize: ".6rem" }}>
                {weapon?.name ?? "None"}
              </td>
            </tr>

            <tr>
              <td>Gear:</td>
              <td style={{ textAlign: "right", fontSize: ".6rem" }}>
                {wearable?.name ?? "None"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="inventory col-sm-4" id="inventory">
        <h3>INVENTORY</h3>
        <table className="invTable">
          <tbody>
            {game.myPlayer.inventory
              .filter((inv: any) => inv.quantity > 0)
              .map((inv: any) => (
                <tr
                  key={inv.details.id}
                  style={{
                    border: "0.5px solid black",
                    maxHeight: "1.25em",
                  }}
                >
                  <td className="itemName">
                    <ClickTooltip
                      id={`item-${inv.details.id}`}
                      label={
                        <span style={{
                          color:
                            inv.details.healing ? "#4caf50" :
                              inv.details.equippable ? "#ee811c" :
                                inv.details.wearable ? "#42a5f5" :
                                  "#000000"
                        }}>
                          {inv.details.name}
                        </span>
                      }
                      openTooltip={openTooltip}
                      setOpenTooltip={setOpenTooltip}
                    >

                      <b>{inv.details.name}</b>
                      <hr />

                      {inv.details.equippable && (
                        <>
                          ⚔ Attack: {inv.details.equippableStats?.attackBonus}<br />
                          🛡 Defense: {inv.details.equippableStats?.defenseBonus}<br />
                          ⚡ Speed: {inv.details.equippableStats?.speedBonus}
                        </>
                      )}

                      {inv.details.wearable && (
                        <>
                          ⚔ Attack: {inv.details.wearableStats?.attackBonus}<br />
                          🛡 Defense: {inv.details.wearableStats?.defenseBonus}<br />
                          ⚡ Speed: {inv.details.wearableStats?.speedBonus}
                        </>
                      )}

                      {inv.details.healing && (
                        <>
                          ❤️ Heals {inv.details.healingStats?.amountHealed} HP
                        </>
                      )}

                    </ClickTooltip>


                  </td>
                  <td className="inven">{inv.quantity}</td>
                  <td>
                    {inv.details.healing && (
                      <button onClick={() => game.heal(inv)} className="invBtn">Heal</button>
                    )}

                    {inv.details.equippable && (!isEquipped || weapon?.id === inv.details.id ) && (
                      <>
                        <button
                          disabled={isEquipped}
                          onClick={() => game.Equip(inv)}
                          className="invBtn"
                        >
                          Equip
                        </button>
                        <button
                          disabled={!isEquipped}
                          onClick={() => game.unequip(inv)}
                          className="invBtn"
                        >
                          Unequip
                        </button>
                      </>
                    )}

                    {inv.details.wearable && (inv.details.id === wearable?.id || !isWorn) && (
                      <>
                        <button
                          disabled={isWorn}
                          onClick={() => game.Wear(inv)}
                          className="invBtn"
                        >
                          Wear
                        </button>
                        <button
                          disabled={!isWorn}
                          onClick={() => game.removeItem(inv)}
                          className="invBtn"
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="quests col-sm-4" id="quests">
  <h3>QUESTS</h3>

  <div>
 {game.myPlayer.questList.map((progress: { id: number; isComplete: any; }) => {
  const quest = dataFor.getQuest(progress.id);

  return (
    <div key={progress.id}>
      <li
        style={{
          fontWeight: progress.isComplete ? "normal" : "bolder",
          textDecoration: progress.isComplete ? "line-through" : "none",
        }}
      >
        {quest.name}
      </li>

      {!progress.isComplete && (
        <span style={{ fontSize: ".65rem" }}>
          {quest.description}
        </span>
      )}

      <hr />
    </div>
  );
})}
  </div>
</div>

        </div>
  );
}