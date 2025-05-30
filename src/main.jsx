import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themes } from './Theme/Themes.jsx'
import { Notifications } from './components/Notification.jsx'
import { BrowserRouter } from 'react-router'
import { injectStore } from './configs/axiosInstans.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.js'

injectStore(store)

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Themes>
               <BrowserRouter>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <App />
                  </LocalizationProvider>
                  <Notifications />
               </BrowserRouter>
            </Themes>
         </PersistGate>
      </Provider>
   </StrictMode>
)
