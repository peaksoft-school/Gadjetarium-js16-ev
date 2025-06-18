// import './App.css'

// const App = () => <h1>GADGETARIUM js-16</h1>

// export default App

///////////////////////////

// import './App.css'
// import Orders from './pages/Orders'

// const App = () => <Orders />

// export default App

import Orders from './pages/Orders'
import { Routes, Route } from 'react-router-dom'
import OrderDetails from './pages/OrdersDetails'

const App = () => (
   <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/orders/:Id" element={<OrderDetails />} />
   </Routes>
)

export default App
