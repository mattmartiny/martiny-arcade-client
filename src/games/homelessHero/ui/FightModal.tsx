import type { inventoryItem } from "../types/item";
import { HpBar } from "./HpBar"
import { useState } from "react";
import { ClickTooltip } from "./ClickTooltip";

export function FightModal({
  game,
  selectedItem,
  setSelectedItem,
}: {
  game: any;
  selectedItem: inventoryItem | null;
  setSelectedItem: (x: inventoryItem | null) => void;
}) {
  console.log(game.activeEnemy)
  const [openTooltip, setOpenTooltip] = useState<string | null>(null)
  return (

    <div className="dataWindow battleLayout">
      <div className="opponentStats">
        {game.combat?.enemy && (
          <><ClickTooltip
            id="enemyStats"
            label={<b style={{ textDecoration: "underline" }}>{game.combat.enemy.name}</b>}
            openTooltip={openTooltip}
            setOpenTooltip={setOpenTooltip}
          >
            <b>{game.combat.enemy.name}</b><br />
            <span style={{ fontSize: ".6rem" }}>{game.combat.enemy.description}</span>
            <hr />

            ⚔ Attack: {game.combat.enemy.attack}<br />
            🛡 Defense: {game.combat.enemy.defense}<br />
            ⚡ Speed: {game.combat.enemy.speed}

          </ClickTooltip>
            <br />
            <HpBar
              current={game.combat.enemy.currentHp}
              max={game.combat.enemy.maxHp}
              color="#e53935"
            />

            <div style={{ fontSize: "0.8rem" }}>
              {game.combat.enemy.currentHp}/{game.combat.enemy.maxHp}
            </div>
          </>
        )}
      </div>

      <div className="myStats">

        <ClickTooltip
          id="playerStats"
          label={<b style={{ textDecoration: "underline" }}>Player</b>}
          openTooltip={openTooltip}
          setOpenTooltip={setOpenTooltip}
        >


          ⚔ Attack: {game.myPlayer.stats.attack}<br />
          🛡 Defense: {game.myPlayer.stats.defense}<br />
          ⚡ Speed: {game.myPlayer.stats.speed}

        </ClickTooltip>







        <span style={{ color: game.myPlayer.stats.currentHp >= game.myPlayer.stats.MaxHp / 3 ? "black" : "red" }}>
          <HpBar
            current={game.myPlayer.stats.currentHp}
            max={game.myPlayer.stats.MaxHp}
            color="#4caf50"
          />

          <div style={{ fontSize: "0.8rem" }}>
            {game.myPlayer.stats.currentHp}/{game.myPlayer.stats.MaxHp}
          </div>
        </span>
      </div>

      <img src={`/Enemies/${game.activeEnemy?.imgPath}.png`}
        className="enemyImg"
        alt={game.activeEnemy?.name} />


      <div className="fmessage" id="fmessage">
        <div
          dangerouslySetInnerHTML={{
            __html: game.combat?.log.join("<br>") ?? ""
          }}
        />
      </div>
<div className="optionButtons">
      <button
        className="optionBox"
        disabled={game.combat?.turn !== "player"}
        onClick={game.playerAttack}
      >
        ATTACK
      </button>
      <button onClick={game.toggleBattleItems} style={{ margin: "1%" }} className="optionBox">ITEM</button>
      </div>
      {game.ui.battleItemOpen && (
        <div className="battleItemWindow">
          <div onClick={game.toggleBattleItems} style={{ cursor: "pointer", float: "right", width: 10, margin: "3px 10px" }}>
            X
          </div>

          <div className="battleItemsInv" id="inventory">
            <h3>Healing items</h3>
            <table className="ItemTable">
              <tbody>
                {game.myPlayer.inventory.map((inv: any) => (
                  <tr key={inv.details.id}>
                    {inv.details.healing && (
                      <>
                        <td className="itemName">
                          <span onClick={() => setSelectedItem(inv)}>{inv.details.name}</span>
                          {selectedItem?.details.id === inv.details.id && (
                            <div className="popup-content2">
                              <p>
                                Heals {inv.details.healingStats?.amountHealed} HP
                              </p>
                            </div>
                          )}
                        </td>
                        <td className="inven">{inv.quantity}</td>
                        <td>
                          <button
                            disabled={inv.quantity <= 0}
                            onClick={() => game.heal(inv)}
                            className="invBtn"
                          >
                            Heal
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}