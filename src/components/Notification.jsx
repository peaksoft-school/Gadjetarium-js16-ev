import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Notifications = () => (
   <ToastContainer
      position="top-right"
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      draggable
      limit={3}
      closeButton={false}
   />
)
