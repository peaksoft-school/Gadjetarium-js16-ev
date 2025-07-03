import { Outlet } from 'react-router'
import AdminHeader from './AdminHeader'
import Products from '../../components/Products'

const AdminLayout = () => {
   return (
      <>
         <AdminHeader />
         <Products />
         <Outlet />
      </>
   )
}

export default AdminLayout
