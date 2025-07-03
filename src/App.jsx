// import './App.css'
// import AppRouter from './routes/AppRouter'

// const App = () => <AppRouter />

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import ProfileForm from './pages/ProfileForm'
import ProfilePage from './pages/ProfilePage'

export default function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/profile/password" element={<ProfilePage />} />
         </Routes>
      </div>
   )
}
