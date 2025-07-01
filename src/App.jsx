// import './App.css'
// import AppRouter from './routes/AppRouter'

// const App = () => <AppRouter />

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'
import OrderHistory from './pages/OrderHistory'
import OrderDetails from './pages/OrdersDetails2'
import OrderHistoryPustoi from './pages/OrderHistoryPustoi'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Navigate to="/orders" />} />
         <Route path="/orders" element={<OrderHistory />} />
         <Route path="/orders/:id" element={<OrderDetails />} />
         <Route path="/orders/empty" element={<OrderHistoryPustoi />} />
      </Routes>
   )
}

export default App
