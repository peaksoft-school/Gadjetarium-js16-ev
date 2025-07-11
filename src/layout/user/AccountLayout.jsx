import { Outlet } from 'react-router'
import { lazy, Suspense } from 'react'
import Spinner from '../../components/Spinner'

const LkNavigation = lazy(() => import('../../components/LkNavigation'))

const AccountLayout = () => {
   return (
      <div>
         <Suspense fallback={<Spinner />}>
            <LkNavigation />
         </Suspense>
         <Outlet />
      </div>
   )
}

export default AccountLayout
