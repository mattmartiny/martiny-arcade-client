import { useLocation, useNavigate } from "react-router-dom";

export default function RpgResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const score = location.state?.score ?? 0;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "12px"
        }}>
            <h2>The evil CEO has been defeated and you have regained your company!</h2>
            <h4>Score: {score}</h4>
            <h6>Game by Matt Martiny</h6>
            <button onClick={() => navigate("/homeless-hero")}>
                Back to Menu
            </button>

            <button onClick={() => navigate("/homeless-hero/play?mode=new")}>
                New Game
            </button>
        </div>
    );
}