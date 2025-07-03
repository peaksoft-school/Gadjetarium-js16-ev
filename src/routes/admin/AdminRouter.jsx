import { Route, Routes } from 'react-router'
import AdminLayout from '../../layout/admin/AdminLayout'
import { lazy, Suspense } from 'react'
import Spinner from '../../components/Spinner'
import ProductDetails from '../../pages/products/GetByIdProd'

const Products = lazy(() => import('../../components/Products'))

const AdminRouter = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<AdminLayout />} />

            <Route
               path="products"
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
         </Routes>
      </>
   )
}

export default AdminRouter
