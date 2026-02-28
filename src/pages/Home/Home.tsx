import GameCard from "../../components/GameCard";
import "./home.css";
import Logo from "../../assets/ArcadeLogo.png"

export default function Home() {
  return (
    <div>
      <section className="home-hero">
<img src={Logo} style={{ height: "auto", width: "35%" }} />
        <p>Play. Earn XP. Climb Levels.</p>
      </section>

      <section className="game-grid">
        <GameCard
          title="Coin Flip"
          description="Call it right and stack quick wins."
          to="/coin-flip"
          accent="gold"
        />

        <GameCard
          title="Elemental Battle"
          description="First to 3 wins the duel."
          to="/elemental-battle"
          accent="pink"
        />

        <GameCard
          title="War"
          description="Flip cards and conquer the deck."
          to="/war"
          accent="blue"
        />
      </section>
    </div>
  );
}