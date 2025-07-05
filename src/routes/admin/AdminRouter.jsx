import { Route, Routes } from 'react-router'
import AdminLayout from '../../layout/admin/AdminLayout'
import { lazy, Suspense } from 'react'
import Spinner from '../../components/Spinner'

const Products = lazy(() => import('../../components/Products'))
const ProductDetails = lazy(() => import('../../pages/GetByIdProd'))

const AdminRouter = () => (
   <Routes>
      <Route path="/" element={<AdminLayout />}>
         <Route
            path="products"
            index={true}
            element={
               <Suspense fallback={<Spinner />}>
                  <Products />
               </Suspense>
            }
         />
         <Route
            path="products/:id"
            element={
               <Suspense fallback={<Spinner />}>
                  <ProductDetails />
               </Suspense>
            }
         />
      </Route>
   </Routes>
)

export default AdminRouter
