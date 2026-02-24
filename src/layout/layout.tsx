import { Link, Outlet } from "react-router-dom";
import { useArcadeProfile } from "../platform/ArcadeProfileContext";
import "./layout.css";

import { NavLink } from "react-router-dom";

<NavLink to="/games">Games</NavLink>
export default function Layout() {
  const { level, xp } = useArcadeProfile(); 
  return (<>
  <header className="arcade-header">
  <div className="arcade-logo">MARTINY ARCADE</div>
  <nav className="arcade-nav">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/games">Games</NavLink>
    <NavLink to="/profile">Profile</NavLink>
  </nav>
  <div className="arcade-profile">
    LVL {level} • {xp} XP
  </div>
</header>

      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    </>
  );
}
