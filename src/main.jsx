import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themes } from './Theme/Themes.jsx'


createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Themes>
         <App />
      </Themes>
   </StrictMode>
)
