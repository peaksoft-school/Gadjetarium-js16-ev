import { Outlet } from 'react-router'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {
   return (
      <>
         <AdminHeader />
         <Outlet />
      </>
   )
}

export default AdminLayout
