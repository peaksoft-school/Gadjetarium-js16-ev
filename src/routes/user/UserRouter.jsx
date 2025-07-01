import { Outlet, Route, Routes } from 'react-router'
import UserLayout from '../../layout/user/UserLayout'
import ReviewsDashboard from '../../components/ReviewsDashboard'

const UserRouter = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<UserLayout />} />
            <Route path="/reviews" element={<ReviewsDashboard/>} />
         </Routes>
         <Outlet />
      </>
   )
}

export default UserRouter
