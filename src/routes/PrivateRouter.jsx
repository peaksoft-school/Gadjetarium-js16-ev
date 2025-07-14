import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const PrivateRouter = ({ roles, component, fallBackPath }) => {
   const role = useSelector((state) => state.auth.role)

   const allowedRole = roles.includes(role)

   if (!allowedRole) {
      return <Navigate to={fallBackPath} />
   }

   return component
}

export default PrivateRouter
