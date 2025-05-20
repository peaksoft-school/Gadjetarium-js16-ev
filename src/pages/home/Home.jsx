import { Outlet } from 'react-router'
import { useState } from 'react'
import ForgotPassword from '../forgotPassword/ForgotPassword'
import ResetPassword from '../forgotPassword/ResetPassword'

const Home = () => {
   const [open, setOpen] = useState(true)
   return (
      <div>
         <h1>HOME</h1>
         <ResetPassword />
         <Outlet />
      </div>
   )
}

export default Home
