// import './App.css'
// import AppRouter from './routes/AppRouter'

// const App = () => <AppRouter />

// export default App

import { Routes, Route } from 'react-router'
import ProductPage from './pages/ProductPage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
   return (
      <Routes>
         <Route path="/" element={<ProductPage />} />
         <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
   )
}
