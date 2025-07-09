import { Outlet, Route, Routes } from 'react-router'
import UserLayout from '../../layout/user/UserLayout'

const UserRouter = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<UserLayout />} />
         </Routes>
         <Outlet />
      </>
   )
}

export default UserRouter
