import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import AdminRouter from './admin/AdminRouter'
import UserRouter from './user/UserRouter'
import PrivateRouter from './PrivateRouter'
import Spinner from '../components/Spinner'

const SignIn = lazy(() => import('../pages/sign-in/SignIn'))
const SignUp = lazy(() => import('../pages/sign-up/SignUp'))
const Home = lazy(() => import('../pages/home/Home'))
const ForgotPassword = lazy(
   () => import('../pages/forgotPassword/ForgotPassword')
)

const AppRouter = () => (
   <Routes>
      <Route
         path="/"
         element={
            <PrivateRouter
               component={
                  <Suspense fallback={<Spinner />}>
                     <Home />
                  </Suspense>
               }
               fallBackPath="admin"
               roles={['GUEST', 'USER']}
            />
         }
      />
      <Route
         path="/sign-in"
         element={
            <PrivateRouter
               component={
                  <Suspense fallback={<Spinner />}>
                     <SignIn />
                  </Suspense>
               }
               fallBackPath="user"
               roles={['GUEST']}
            />
         }
      />
      <Route
         path="/sign-up"
         element={
            <PrivateRouter
               component={
                  <Suspense fallback={<Spinner />}>
                     <SignUp />
                  </Suspense>
               }
               fallBackPath="user"
               roles={['GUEST']}
            />
         }
      />
      <Route
         path="/forgot-password"
         element={
            <PrivateRouter
               component={
                  <Suspense fallback={<Spinner />}>
                     <ForgotPassword />
                  </Suspense>
               }
               fallBackPath="user"
               roles={['GUEST']}
            />
         }
      />
      <Route
         path="/admin"
         element={
            <PrivateRouter
               component={<AdminRouter />}
               fallBackPath="/"
               roles={['ADMIN']}
            />
         }
      />
      <Route
         path="/user"
         element={
            <PrivateRouter
               component={<UserRouter />}
               fallBackPath="/"
               roles={['USER']}
            />
         }
      />
   </Routes>
)

export default AppRouter
