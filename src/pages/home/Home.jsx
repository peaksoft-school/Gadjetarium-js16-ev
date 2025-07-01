import { Outlet } from 'react-router'
import LKfavorites from '../LKfavorites'

const Home = () => {
   return (
      <div>
         <LKfavorites/>
         <Outlet />
      </div>
   )
}

export default Home
