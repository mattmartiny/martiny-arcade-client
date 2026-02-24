import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home/Home";
import ElementalBattle from "./games/elementalBattle/Elemental_Battle";
import CoinFlip from "./games/coinFlip/coinFlip";
import War from "./games/war/war";
import Games from "./pages/Games/Games";
import Profile from "./pages/Profile/Profile";
import "./App.css";
import { ArcadeProfileProvider } from "./platform/ArcadeProfileContext";
import "./styles/gameShell.css";

export default function App() {
  return (
    <ArcadeProfileProvider>
   
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coin-flip" element={<CoinFlip />} />
            <Route path="/elemental-battle" element={<ElementalBattle />} />
            <Route path="/war" element={<War />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </ArcadeProfileProvider>
  );
}
