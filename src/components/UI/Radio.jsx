import { Radio as MuiRadio, styled } from '@mui/material'
import { forwardRef } from 'react'

const Radio = forwardRef(({ onChange, disabled, size, name, ...rest }, ref) => (
   <StyledRadio
      ref={ref}
      onChange={onChange}
      disabled={disabled}
      size={size}
      name={name}
      {...rest}
   />
))

export default Radio

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
   '&:hover': {
      color: theme.palette.primary.main,
   },

   '&.Mui-checked': {
      color: theme.palette.primary.main,
   },
}))
