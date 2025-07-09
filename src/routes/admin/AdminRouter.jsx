import { Outlet, Route, Routes } from 'react-router'
import AdminLayout from '../../layout/admin/AdminLayout'
import ReviewsDashboard from '../../components/ReviewsDashboard'
import AdminHeader from '../../layout/admin/AdminHeader'
import Products from '../../components/Products'
import Orders from '../../pages/Orders'
import OrderDetails from '../../pages/OrdersOplata'

const AdminRouter = () => {
   return (
      <>
         <AdminHeader />
         <Routes>
            <Route path="/" element={<AdminLayout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/reviews" element={<ReviewsDashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
         </Routes>
         <Outlet />
      </>
   )
}

export default AdminRouter
