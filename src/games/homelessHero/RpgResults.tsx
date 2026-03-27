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
            <h1>Run Complete</h1>

            <h2>Score: {score}</h2>

            <button onClick={() => navigate("/homeless-hero")}>
                Back to Menu
            </button>

            <button onClick={() => navigate("/homeless-hero/play?mode=new")}>
                New Run
            </button>
        </div>
    );
}