import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import AdminRouter from './admin/AdminRouter'
import UserRouter from './user/UserRouter'
import PrivateRouter from './PrivateRouter'
import Spinner from '../components/Spinner'

const Home = lazy(() => import('../components/Home'))

const AppRouter = () => {
   return (
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
}

export default AppRouter
