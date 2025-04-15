import { Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
   const { title, color } = typeStyles[type] || typeStyles.success

   return (
      <Box
         sx={{
            backgroundColor: '#1c1c1e',
            color: 'white',
            padding: '16px',
            borderRadius: '10px',
            boxShadow: 3,
            width: '500px',
            maxWidth: '500px',
            boxSizing: 'border-box',
            position: 'absolute',
            right: '1px',
         }}
         aria-live="assertive"
      >
         <Typography variant="caption" sx={{ color, fontWeight: 600, mb: 1 }}>
            {title}
         </Typography>

         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               gap: 1,
            }}
         >
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flex: 1,
                  overflow: 'hidden',
               }}
            >
               <Typography
                  sx={{
                     fontSize: '16px',
                     whiteSpace: 'nowrap',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                  }}
               >
                  {message}
               </Typography>

               {actionText && (
                  <Typography
                     onClick={onActionClick}
                     sx={{
                        color,
                        fontWeight: 600,
                        fontSize: '16px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        '&:hover': { opacity: 0.8 },
                     }}
                  >
                     {actionText}
                  </Typography>
               )}
            </Box>

            <IconButton onClick={closeToast} sx={{ color: 'gray', p: 0.5 }}>
               <CloseIcon fontSize="small" />
            </IconButton>
         </Box>
      </Box>
   )
}
