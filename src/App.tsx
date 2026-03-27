import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home/Home";
import ElementalBattle from "./games/elementalBattle/ElementalBattle";
import CoinFlip from "./games/coinFlip/coinFlip";
import War from "./games/war/war";
import Games from "./pages/Games/Games";
import Login from "./pages/Login/Login";
import "./App.css";
import { ArcadeProfileProvider } from "./platform/ArcadeProfileContext";
import "./styles/gameShell.css";
import { AuthProvider } from "./platform/AuthContext";
import Register from "./pages//Register/Register";
import PrecisionGrid from "./games/PrecisionGrid/PrecisionGrid";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import PublicProfile from "./pages/Profile/PublicProfile";
import LeaderboardGame from "./pages/Leaderboard/LeaderboardGame";
import ReactionArena from "./games/reaction/ReactionArena";
import PatternMemory from "./games/pattern/PatternMemory";
import RpgGame from "./games/homelessHero/RpgGame";
import RpgMenu from "./games/homelessHero/RpgMenu"
import ProtectedRoute from "./components/ProtectedRoute";
import RpgResults from "./games/homelessHero/RpgResults";

export default function App() {
  return (
    <AuthProvider>
      <ArcadeProfileProvider>

        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/coin-flip" element={<CoinFlip />} />
              <Route path="/elemental-battle" element={<ElementalBattle />} />
              <Route path="/precision-grid" element={<PrecisionGrid />} />
              <Route path="/reaction-arena" element={<ReactionArena />} />
              <Route path="/pattern-memory" element={<PatternMemory />} />
              <Route path="/homeless-hero" element={<ProtectedRoute><RpgMenu /></ProtectedRoute>} />
              <Route path="/homeless-hero/play" element={<ProtectedRoute><RpgGame /></ProtectedRoute>} />
              <Route path="/rpg/results" element={<ProtectedRoute><RpgResults /></ProtectedRoute>} />
              <Route path="/war" element={<War />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:username" element={<PublicProfile />} />
              <Route path="/leaderboard/:gameKey" element={<LeaderboardGame />} />


              {/* <Route path="/aroundTheWorld" element={<ProtectedRoute><AroundTheWorld /></ProtectedRoute>} /> */}
            </Route>
          </Routes>

        </BrowserRouter>
      </ArcadeProfileProvider>
    </AuthProvider>
  );
}
