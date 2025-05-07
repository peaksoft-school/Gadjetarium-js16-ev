import { Checkbox as MuiCheckbox, styled } from '@mui/material'
import { forwardRef } from 'react'

const Checkbox = forwardRef(
   ({ onChange, disabled, size, name, variant = 'purple', ...rest }, ref) => {
      return (
         <StyledCheckbox
            ref={ref}
            onChange={onChange}
            disabled={disabled}
            size={size}
            name={name}
            className={variant}
            {...rest}
         />
      )
   }
)

export default Checkbox

const StyledCheckbox = styled(MuiCheckbox)(({ theme, className }) => ({
   '&:hover': {
      color:
         className === 'green'
            ? theme.palette.secondary.green
            : theme.palette.primary.main,
      background: 'none',
   },
   '$:active': { 
      background: 'none',
   },

   '&.Mui-checked': {
      color:
         className === 'green'
            ? theme.palette.secondary.green
            : theme.palette.primary.main,
   },
}))
