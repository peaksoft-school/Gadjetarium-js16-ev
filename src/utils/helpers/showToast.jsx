import { toast } from 'react-toastify'
import { CustomToast } from '../../components/CustomToast'

export const showToast = ({
   message,
   type = 'success',
   actionText,
   onActionClick,
   autoClose = 3000,
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
