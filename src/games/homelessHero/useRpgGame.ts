import { useMemo, useState } from "react"
import { dataFor } from "./content/data"
import * as movement from "./engine/movement"
import * as combat from "./engine/combat"
import { createPlayer } from "./engine/createPlayer"
import type { EnemyInstance } from "./types/enemy"
import { spawnEnemy } from "./engine/enemySpawn"

export function useRpgGame() {



    const [currentLocationId, setCurrentLocationId] = useState<number>(dataFor.home.id);

    const currentLocation = useMemo(() => {
        return dataFor.Locs.find(l => l.id === currentLocationId) ?? dataFor.home;
    }, [currentLocationId]);

    const [player, setPlayer] = useState(() => createPlayer())

    const [activeEnemy, setEnemy] =
        useState<EnemyInstance | null>(null)


    const [fightOpen, setFightOpen] = useState(false)
    const [shopOpen, setShopOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)
    const [casinoOpen, setCasinoOpen] = useState(false)

    const [battleMessage, setBattleMessage] = useState("")

    function openFight() {

        let enemy = activeEnemy

        if (!enemy || enemy.currentHp <= 0) {

            const template =
                currentLocation.EnemyHere?.[0]

            if (template) {
                enemy = spawnEnemy(template, player)
                setEnemy(enemy)
            }

        }

        if (!enemy) return

        setFightOpen(true)
    }

    function fight() {

        if (!activeEnemy) return

        const result =
            combat.playerAttack(player, activeEnemy)

        setEnemy({ ...result.enemy })

        setBattleMessage(
            battleMessage +
            `<br/>You hit for ${result.damage}`
        )
    }

    function moveNorth() {
        const next = movement.moveTo(currentLocation.toTheNorth);
        if (next) setCurrentLocationId(next.id);
    }
    function moveSouth() {
        const next = movement.moveTo(currentLocation.toTheSouth);
        if (next) setCurrentLocationId(next.id);
    }
    function moveEast() {
        const next = movement.moveTo(currentLocation.toTheEast);
        if (next) setCurrentLocationId(next.id);
    }
    function moveWest() {
        const next = movement.moveTo(currentLocation.toTheWest);
        if (next) setCurrentLocationId(next.id);
    }

    function toggleShop() {
        setShopOpen(x => !x)
    }

    function toggleStatus() {
        setStatusOpen(x => !x)
    }

    function toggleCasino() {
        setCasinoOpen(x => !x)
    }

    return {

        player,
        currentLocation,
        activeEnemy,

        fightOpen,
        shopOpen,
        statusOpen,
        casinoOpen,

        battleMessage,

        openFight,
        fight,

        moveNorth,
        moveSouth,
        moveEast,
        moveWest,

        toggleShop,
        toggleStatus,
        toggleCasino
    }
}