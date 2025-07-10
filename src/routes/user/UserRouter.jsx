import { Outlet, Route, Routes } from 'react-router'
import UserLayout from '../../layout/user/UserLayout'
import UserHeader from '../../layout/user/UserHeader'
import Footer from '../../layout/Footer'
import { lazy, Suspense } from 'react'
import Spinner from '../../components/Spinner'

const LKfavorites = lazy(() => import('../../pages/LKfavorites'))

const UserRouter = () => {
   return (
      <>
         <UserHeader />
         <Routes>
            <Route path="/" element={<UserLayout />} />
            {/* <Route
               path="/account"
               element={
               аккаунт
               }
            />*/}
            <Route
               path="/account/favorite"
               element={
                  <Suspense fallback={<Spinner />}>
                     <LKfavorites />
                  </Suspense>
               }
            />
         </Routes>
         <Outlet />
         <Footer />
      </>
   )
}

export default UserRouter
