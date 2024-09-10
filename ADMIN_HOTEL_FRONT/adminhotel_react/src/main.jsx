import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UsuariosComponent from './components/usuarios.components.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <UsuariosComponent />
  </StrictMode>,
)
