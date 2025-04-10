import { styled, Button as MuiButton } from '@mui/material'

const Button = ({
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
         {shopCart && <p>🗑</p>} {children}
      </StyledButton>
   )
}

export default Button

const StyledButton = styled(MuiButton)(({ theme }) => ({
   borderRadius: '10px',
   height: '53px',
   padding: '14px 32px',
   marginTop: '20px',
   fontSize: '18px',
   textTransform: 'none',

   '&.MuiButton-contained': {
      backgroundColor: '#CB11AB',
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
