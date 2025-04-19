import { toast } from 'react-toastify'
import { CustomToast } from './helpers/CustomToast'

export const showToast = ({
   message,
   type = 'success',
   actionText,
   onActionClick,
   autoClose = 4000,
}) => {
   toast(
      ({ closeToast }) => (
         <CustomToast
            type={type}
            message={message}
            actionText={actionText}
            onActionClick={() => {
               onActionClick?.()
               closeToast?.()
            }}
            closeToast={closeToast}
         />
      ),
      {
         autoClose,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         icon: false,
      }
   )
}
