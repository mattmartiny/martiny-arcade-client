import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './platform/AuthContext.tsx'
import { ArcadeProfileProvider } from './platform/ArcadeProfileContext.tsx'
import { AchievementProvider } from "./platform/AchievementContext";

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <ArcadeProfileProvider> 
     <AchievementProvider>
      <App />
      </AchievementProvider>
  </ArcadeProfileProvider>
  </AuthProvider>
  ,
)
