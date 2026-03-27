import { useEffect, useState } from "react";
import { loadGame } from "./engine/saveRepository"
import { useAuth } from "../../platform/AuthContext";
import { useNavigate } from "react-router-dom";
import GameShell from "../../components/GameShell";
export default function RpgMenu() {
    const { token } = useAuth();
    const [hasSave, setHasSave] = useState(false);
    const navigate = useNavigate();
    const GAME_ID = "homeless-hero";
    useEffect(() => {
        if (!token) return;

        loadGame(token)
            .then(save => setHasSave(!!save))
            .catch(() => setHasSave(false));
    }, [token]);

    function handleContinue() {
        navigate("/homeless-hero/play?mode=continue");
    }


    function clearLocalSave() {
        localStorage.removeItem("hh_battleMessage");
    }


    async function deleteServerSave() {
    if (!token) return;

    await fetch("/api/save", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

    async function handleNewGame() {
    if (hasSave) {
        const confirmed = window.confirm(
            "Starting a new game will delete your current progress. Are you sure?"
        );

        if (!confirmed) return;
    }


    await deleteServerSave(); // 🔥 important
    clearLocalSave();
    navigate("/homeless-hero/play?mode=new");
}
    return (


        
        <GameShell gameKey={GAME_ID}
            eyebrow="Homeless Hero"
            title="Homeless Hero"
            subtitle="An in-browser, turn based RPG."

        >

            <div style={{ textAlign: "center", marginBottom: "100px" }}>
                <h1>Homeless Hero</h1>

                {hasSave && (
                    <button onClick={handleContinue}>
                        Continue
                    </button>
                )}

                <button onClick={handleNewGame}>
                    New Game
                </button>
            </div>

        </GameShell>
    );
}