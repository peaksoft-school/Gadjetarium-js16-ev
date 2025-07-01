import { Outlet, Route, Routes } from 'react-router'
import UserLayout from '../../layout/user/UserLayout'
import LKfavorites from '../../pages/LKfavorites'

const UserRouter = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<UserLayout />} />
            <Route path="/favorites" element={<LKfavorites/>} />
         </Routes>
         <Outlet />
      </>
   )
}

export default UserRouter
