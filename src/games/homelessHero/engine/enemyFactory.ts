import type { EnemyTemplate, EnemyInstance } from "../types/enemy";
import type { player } from "../types/player";


export function spawnEnemy(template: EnemyTemplate, player :player): EnemyInstance{
  if (!template.fluctuating) {
    return {
      ...template,
      currentHp: template.maxHp
    };
  }

  return spawnFluctuatingEnemy(template, player);
}

function spawnFluctuatingEnemy(template: EnemyTemplate, player: player): EnemyInstance {

  const baseStats = player.stats;

  const hp = baseStats.MaxHp + template.maxHp;
  const attack = baseStats.attack + template.attack;
  const defense = baseStats.defense + template.defense;
  const speed = baseStats.speed + template.speed;

  return {
    ...template,

    maxHp: hp,
    currentHp: hp,

    attack,
    defense,
    speed
  };
}