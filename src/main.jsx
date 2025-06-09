import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Themes } from './Theme/Themes.jsx'
import { Notifications } from './components/Notification.jsx'
import { injectStore } from '../src/configs/axiosInstans.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.js'
import { StrictMode } from 'react'

injectStore(store)

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <Themes>
               <App />
               <Notifications />
            </Themes>
         </PersistGate>
      </Provider>
   </StrictMode>
)
