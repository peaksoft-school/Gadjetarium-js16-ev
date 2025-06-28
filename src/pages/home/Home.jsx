import { Outlet } from 'react-router'
import ProductActionsHeader from '../../components/Products'
import NewsletterForm from '../../components/Mailing'

const Home = () => {
   return (
      <div>
         <ProductActionsHeader/>
         {/* <NewsletterForm/> */}
         <Outlet />
      </div>
   )
}

export default Home
