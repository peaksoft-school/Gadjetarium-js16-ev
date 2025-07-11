// UserRouter.jsx
import { Route, Routes, Outlet } from 'react-router'
import UserLayout from '../../layout/user/UserLayout'
import UserHeader from '../../layout/user/UserHeader'
import Footer from '../../layout/Footer'
import { lazy, Suspense } from 'react'
import Spinner from '../../components/Spinner'

import OrderDetails from '../../pages/OrdersOplata'
import OrderHistoryPustoi from '../../pages/OrderHistoryPustoi'
import AccountLayout from '../../layout/user/AccountLayout'

const LKfavorites = lazy(() => import('../../pages/LKfavorites'))
const OrderHistory = lazy(() => import('../../pages/OrderHistory'))

const UserRouter = () => {
   return (
      <>
         <UserHeader />
         <Routes>
            <Route path="/" element={<UserLayout />} />

            <Route path="/account/*" element={<AccountLayout />}>
               <Route
                  path="favorite"
                  element={
                     <Suspense fallback={<Spinner />}>
                        <LKfavorites />
                     </Suspense>
                  }
               />
               <Route
                  path="order-history"
                  element={
                     <Suspense fallback={<Spinner />}>
                        <OrderHistory />
                     </Suspense>
                  }
               />
               {/* <Route path="profile" element={<Profile />} /> */}
            </Route>

            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/orders/empty" element={<OrderHistoryPustoi />} />
         </Routes>
         <Outlet />
         <Footer />
      </>
   )
}

export default UserRouter
