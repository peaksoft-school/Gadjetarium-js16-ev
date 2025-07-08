import { Outlet, Route, Routes } from 'react-router'
import AdminLayout from '../../layout/admin/AdminLayout'

const AdminRouter = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<AdminLayout />} />
         </Routes>
         <Outlet />
      </>
   )
}

export default AdminRouter
