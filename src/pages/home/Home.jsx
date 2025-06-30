import { Outlet } from 'react-router'
import ProductActionsHeader from '../../components/Products'

const Home = () => {
   return (
      <div>
         <ProductActionsHeader/>
         <Outlet />
      </div>
   )
}

export default Home
