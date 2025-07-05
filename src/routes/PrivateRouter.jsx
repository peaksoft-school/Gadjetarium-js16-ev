import { Navigate } from 'react-router'

const PrivateRouter = ({ roles, component, fallBackPath }) => {
   const role = "ADMIN"

   const allowedRole = roles.includes(role)

   if (!allowedRole) {
      return <Navigate to={fallBackPath} />
   }

   return component
}

export default PrivateRouter
