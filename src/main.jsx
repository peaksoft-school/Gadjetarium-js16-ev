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

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <BrowserRouter>
               <Themes>
                  <App />

                  <Notifications />
               </Themes>
            </BrowserRouter>
         </PersistGate>
      </Provider>
   </StrictMode>
)
