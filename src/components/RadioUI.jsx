import { Radio, styled } from '@mui/material'

const RadioUI = ({ onChange, disabled, size, name, ...rest }) => {
   return (
      <StyledRadio
         onChange={onChange}
         disabled={disabled}
         size={size}
         name={name}
         {...rest}
      />
   )
}

export default RadioUI

const StyledRadio = styled(Radio)(({ theme }) => ({
   '&:hover': {
      color: '#CB11AB',
   },
   '&.Mui-checked': {
      color: '#CB11AB',
   },
}))
