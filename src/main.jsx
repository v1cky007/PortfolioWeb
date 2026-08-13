import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Force dark mode by default before render
const saved = localStorage.getItem("theme");
if (!saved) {
  localStorage.setItem("theme", "dark");
}
document.documentElement.classList.toggle("dark", saved !== "light");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
