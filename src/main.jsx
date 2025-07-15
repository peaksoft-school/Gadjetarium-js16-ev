import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themes } from './Theme/Themes.jsx'
import { Notifications } from './components/Notification.jsx'
import { injectStore } from '../src/configs/axiosInstans.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter } from 'react-router'
import { LocalizationProvider } from '@mui/x-date-pickers'

injectStore(store)


createRoot(document.getElementById('root')).render(
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
)
