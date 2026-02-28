import { NavLink, Link, Outlet } from "react-router-dom";
import { useArcadeProfile } from "../platform/ArcadeProfileContext";
import "./layout.css";
import { useAuth } from "../platform/AuthContext";

<NavLink to="/games">Games</NavLink>
export default function Layout() {
  const { level, xp } = useArcadeProfile(); 
  const { user, logout } = useAuth();
  
  return (<>
  <header className="arcade-header">
  <div className="arcade-logo">MAttY BAttZ GaM1NG Arcade</div>
  <nav className="arcade-nav">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/games">Games</NavLink>
    <NavLink to="/profile">Profile</NavLink>
    <NavLink to="/leaderboard">Leaderboard</NavLink>
  </nav>
 <div className="arcade-profile">
  {user ? (
    <>
      <span className="header-xp">
        LVL {level} • {xp} XP
      </span>
      <button className="header-btn" onClick={logout}>
        Logout
      </button>
    </>
  ) : (<>
  <span className="header-hint">
    Login to track XP
  </span>
    <NavLink to="/login" className="header-btn">
      Login
    </NavLink></>
  )}
</div>
</header>

      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    </>
  );
}
