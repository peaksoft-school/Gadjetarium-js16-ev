import { styled, Button as MuiButton } from '@mui/material'
import { Icons } from '../../assets/icons'

const ButtonUI = ({
   children,
   onClick,
   variant = 'contained',
   disabled,
   type = 'submit',
   shopCart,
   ...rest
}) => {
   const muiVariant = variant === 'success' ? 'contained' : variant

   return (
      <StyledButton
         onClick={onClick}
         type={type}
         disabled={disabled}
         variant={muiVariant}
         className={
            variant === 'success' ? 'MuiButton-containedSuccess' : undefined
         }
         {...rest}
      >
         {shopCart && (
            <img src={Icons.basket} style={{ marginRight: '3.5px' }} />
         )}{' '}
         {children}
      </StyledButton>
   )
}

export default ButtonUI

const StyledButton = styled(MuiButton)(({ theme }) => ({
   borderRadius: '10px',
   height: '53px',
   marginTop: '20px',
   fontSize: '18px',
   padding: '10px 24px',
   textTransform: 'none',
   boxShadow: 'none',

   '&.MuiButton-contained': {
      backgroundColor: '#CB11AB',
      boxShadow: 'none',
      color: '#fff',
      '&:hover': {
         backgroundColor: '#E313BF',
      },
      '&:active': {
         backgroundColor: '#C90EA9',
      },
      '&.Mui-disabled': {
         backgroundColor: '#BDBDBD',
         color: 'white',
      },
   },

   '&.MuiButton-outlined': {
      backgroundColor: 'transparent',
      border: '1px solid #CB11AB',
      color: '#CB11AB',
      boxShadow: 'none',

      '&:hover': {
         backgroundColor: '#CB11AB',
         color: 'white',
      },
      '&:active': {
         backgroundColor: '#E313BF',
      },
      '&.Mui-disabled': {
         backgroundColor: '#1C1B1F1F',
         color: 'white',
      },
   },

   '&.MuiButton-text': {
      backgroundColor: 'white',
      border: '1px solid #CB11AB',
      color: '#CB11AB',
      boxShadow: 'none',

      '&:hover': {
         backgroundColor: '#CB11AB',
         color: '#fff',
      },
      '&:active': {
         backgroundColor: '#E313BF',
      },
      '&.Mui-disabled': {
         color: '#1C1B1F1F',
         borderColor: '#1C1B1F1F',
      },
   },

   '&.MuiButton-containedSuccess': {
      backgroundColor: '#2FC509',
      color: '#fff',
      boxShadow: 'none',

      '&:hover': {
         backgroundColor: '#218838',
      },
      '&:active': {
         backgroundColor: '#1E7E34',
      },
      '&.Mui-disabled': {
         backgroundColor: '#BDBDBD',
         color: 'white',
      },
   },
}))
