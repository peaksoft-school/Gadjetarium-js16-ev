import { Outlet } from 'react-router'
import UserHeader from '../../layout/user/UserHeader'
import Footer from '../../layout/Footer'

const Home = () => {
   return (
      <div>
         <UserHeader />
         <Outlet />
         <Footer />
      </div>
   )
}

export default Home
