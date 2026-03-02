import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
    const portfolioSite = window.open('https://www.mattmartiny.com', '_blank');
  return (
    <footer className="app-footer">
    
      {/* Pixel Divider */}
      <div className="pixel-divider" />

      <div className="footer-inner">
        
        {/* Left */}
        <div className="footer-left">
          <div className="footer-brand">
          <Link to="/">  MA<span style={{fontSize:"115%", fontWeight:"bold"}}>tt</span>YBA<span style={{fontSize:"115%", fontWeight:"bold"}}>tt</span>Z <br />GaM1<span style={{transform:"scaleX(-1)", display: "inline-block"}}>N</span>G<br /><div className="arcade-word-effect" >Arcade</div></Link>
          </div>
          <div className="footer-copy">
            © {year} <Link to="http://mattmartiny.com" target="_blank">Matt Martiny</Link>. All rights reserved.
          </div>
        </div>

        {/* Center */}
        <div className="footer-links">
          <Link to="/leaderboard">Leaderboard</Link>

          <Link to="/">Games</Link>
        </div>

        {/* Right */}
        <div className="footer-meta">
          <span>Level Up</span>
          <span>•</span>
          <span>Build Skill</span>
          <span>•</span>
          <span>Earn XP</span>
        </div>

      </div>
    </footer>
  );
}