import { Radio, styled } from '@mui/material'
import { forwardRef } from 'react'

const RadioUI = forwardRef(
   ({ onChange, disabled, size, name, ...rest }, ref) => {
      return (
         <StyledRadio
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

export default RadioUI

const StyledRadio = styled(Radio)(({ theme }) => ({
   '&:hover': {
      color: theme.palette.primary.main,
   },
   '&.Mui-checked': {
      color: theme.palette.primary.main,
   },
}))
