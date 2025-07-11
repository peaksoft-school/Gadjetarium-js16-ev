import { Route, Routes ,Outlet} from 'react-router'
import AdminLayout from '../../layout/admin/AdminLayout'
import AdminHeader from '../../layout/admin/AdminHeader'
import { lazy, Suspense } from 'react'
import Spinner from '../../components/Spinner'

const Products = lazy(() => import('../../components/Products'))
const Orders = lazy(() => import('../../pages/Orders'))
const OrderDetails = lazy(() => import('../../pages/OrdersOplata'))
const ReviewsDashboard = lazy(() => import('../../components/ReviewsDashboard'))
const GetByIdProd = lazy(() => import('../../pages/GetByIdProd'))

const AdminRouter = () => {
   return (
      <>
         <AdminHeader />
         <Routes>
            <Route path="/" element={<AdminLayout />} />
            <Route
               path="/products"
               element={
                  <Suspense fallback={<Spinner />}>
                     <Products />
                  </Suspense>
               }
            />
            <Route
               path="/products/:id"
               element={
                  <Suspense fallback={<Spinner />}>
                     <GetByIdProd />
                  </Suspense>
               }
            />
            <Route
               path="/reviews"
               element={
                  <Suspense fallback={<Spinner />}>
                     <ReviewsDashboard />
                  </Suspense>
               }
            />
            <Route
               path="/orders"
               element={
                  <Suspense fallback={<Spinner />}>
                     <Orders />
                  </Suspense>
               }
            />
            <Route
               path="/orders/:id"
               element={
                  <Suspense fallback={<Spinner />}>
                     <OrderDetails />
                  </Suspense>
               }
            />
         </Routes>
         <Outlet />
      </>
   )
}

export default AdminRouter
