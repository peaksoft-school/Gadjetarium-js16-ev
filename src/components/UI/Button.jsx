import { forwardRef } from 'react'
import { styled, Button as MuiButton } from '@mui/material'
import { Icons } from '../../assets/icons'

const Button = forwardRef(
   (
      {
         children,
         onClick,
         variant = 'contained',
         disabled,
         type = 'submit',
         shopCart,
         ...rest
      },
      ref
   ) => {
      const muiVariant = variant === 'success' ? 'contained' : variant

      return (
         <StyledButton
            ref={ref}
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
            )}
            {children}
         </StyledButton>
      )
   }
)

export default Button

const StyledButton = styled(MuiButton)(({ theme }) => ({
   borderRadius: '10px',
   height: '53px',
   marginTop: '20px',
   fontSize: '18px',
   padding: '10px 24px',
   textTransform: 'none',
   boxShadow: 'none',

   '&.MuiButton-contained': {
      backgroundColor: theme.palette.primary.main,
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
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      boxShadow: 'none',

      '&:hover': {
         backgroundColor: theme.palette.primary.main,
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
      border: `1px solid ${theme.palette.primary.main}`,
      color: '#CB11AB',
      boxShadow: 'none',

      '&:hover': {
         backgroundColor: theme.palette.primary.main,
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
      backgroundColor: theme.palette.secondary.green,
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
