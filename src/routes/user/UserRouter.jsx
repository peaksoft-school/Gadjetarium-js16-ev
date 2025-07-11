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
import DeliveryPage from '../../pages/DeliveryPage'
import AboutPage from '../../pages/AboutPage'
import FAQ from '../../components/FAQ'
import ContactPage from '../../pages/ContactPage'
import ProfilePage from '../../pages/ProfilePage'

const LKfavorites = lazy(() => import('../../pages/LKfavorites'))
const OrderHistory = lazy(() => import('../../pages/OrderHistory'))
const ProfileForm = lazy(() => import('../../pages/ProfileForm'))

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
               <Route
                  path="profile"
                  element={
                     <Suspense fallback={<Spinner />}>
                        <ProfileForm />
                     </Suspense>
                  }
               />
               <Route path="profile/password" element={<ProfilePage />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />

            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/orders/empty" element={<OrderHistoryPustoi />} />
         </Routes>
         <Outlet />
         <Footer />
      </>
   )
}

export default UserRouter
