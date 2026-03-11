import GameCard from "../../components/GameCard";

export default function Home() {
  return (
    <div>
      <section className="game-grid">

        <GameCard
          title="Homeless Hero"
          description="Browser Based RPG"
          to="/homeless-hero"
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
        <GameCard
          title="Precision Grid"
          description="Tap the glowing tile. Speed increases."
          to="/precision-grid"
          accent="purple"
        />

        <GameCard
          title="Reaction Arena"
          description="React quickly. Climb the leaderboard"
          to="/reaction-arena"
          accent="green"
        />

        <GameCard
          title="Pattern Memory"
          description="Repeat the growing pattern."
          to="/pattern-memory"
          accent="yellow"
        />


        <GameCard
          title="Coin Flip"
          description="Call it right and stack quick wins."
          to="/coin-flip"
          accent="gold"
        />
      </section>
    </div>




  );
}