import { NavLink} from "react-router-dom";
import { useArcadeProfile } from "../platform/ArcadeProfileContext";
import "./header.css";
import { useAuth } from "../platform/AuthContext";
import Logo from "../assets/ArcadeLogo.png"


export default function smallHeader (){
<NavLink to="/games">Games</NavLink>
  const { level, xp} = useArcadeProfile(); 
  const { user, logout } = useAuth();
  
  return (<>
  <header className="arcade-header2">
  <div className="arcade-logo2"><img src={Logo}/></div>
  <nav className="arcade-nav2">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/games">Games</NavLink>
    
    <NavLink to="/leaderboard">Global Leaderboard</NavLink>
  </nav>
 <div className="arcade-profile2">
  {user ? (
    <>
      <span className="header-xp">
        <NavLink to={`/profile/${user?.username}`}>{user.username}</NavLink>
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
</>
  );
}

