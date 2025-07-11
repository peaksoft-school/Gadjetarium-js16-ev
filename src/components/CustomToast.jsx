import { Box, Typography, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icons } from '../assets/icons'

const typeStyles = {
   success: {
      title: 'Успешно',
      color: '#32CD32',
   },

   info: {
      title: 'Информация',
      color: '#00BFFF',
   },

   error: {
      title: 'Ошибка',
      color: '#FF6347',
   },
}

export const CustomToast = ({
   type = 'success',
   message,
   actionText,
   onActionClick,
   closeToast,
}) => {
   const { color } = typeStyles[type] || typeStyles.success

   return (
      <ToastContainer aria-live="assertive">
         <ToastContent>
            <MessageBlock>
               <MessageText>{message}</MessageText>

               {actionText && (
                  <ActionLink onClick={onActionClick} style={{ color }}>
                     {actionText}
                  </ActionLink>
               )}
            </MessageBlock>

            <CloseBtn onClick={closeToast}>
               <img src={Icons.cancel} alt="" />
            </CloseBtn>
         </ToastContent>
      </ToastContainer>
   )
}

const ToastContainer = styled(Box)({
   backgroundColor: '#1c1c1e',
   color: 'white',
   padding: '16px',
   borderRadius: '10px',
   boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
   width: '520px',
   maxWidth: '600px',
   boxSizing: 'border-box',
   position: 'absolute',
   right: '1px',
})

const ToastContent = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '8px',
})

const MessageBlock = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
   flex: 1,
   overflow: 'hidden',
})

const MessageText = styled(Typography)({
   fontSize: '16px',
   whiteSpace: 'nowrap',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
})

const ActionLink = styled(Typography)({
   fontWeight: 600,
   fontSize: '16px',
   cursor: 'pointer',
   whiteSpace: 'nowrap',
   flexShrink: 0,

   '&:hover': {
      opacity: 0.8,
   },
})

const CloseBtn = styled(IconButton)({
   color: 'gray',
   padding: '4px',
})
