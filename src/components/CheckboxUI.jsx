import { Checkbox, styled } from '@mui/material'
import { forwardRef } from 'react'

const CheckboxUI = forwardRef(
   ({ onChange, disabled, size, name, ...rest }, ref) => {
      return (
         <StyledCheckbox
            ref={ref}
            onChange={onChange}
            disabled={disabled}
            size={size}
            name={name}
            {...rest}
         />
      )
   }
)

export default CheckboxUI

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
   '&:hover': {
      color: theme.palette.primary.main,
   },
   '&.Mui-checked': {
      color: theme.palette.primary.main,
   },
}))
