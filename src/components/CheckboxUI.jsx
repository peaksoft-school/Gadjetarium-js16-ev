import { Checkbox, styled } from '@mui/material'

const CheckboxUI = ({ onChange, disabled, size, name, ...rest }) => {
   return (
      <StyledCheckbox
         onChange={onChange}
         disabled={disabled}
         size={size}
         name={name}
         {...rest}
      />
   )
}

export default CheckboxUI

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
   '&:hover': {
      color: '#CB11AB',
   },
   '&.Mui-checked': {
      color: '#CB11AB',
   },
}))
