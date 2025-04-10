import { Checkbox, styled } from '@mui/material'

const CheckboxUI = ({ ...rest }) => <StyledCheckbox isChecked {...rest} />

export default CheckboxUI

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
   '&:hover': {
      color: '#CB11AB',
   },
   '&.Mui-checked': {
      color: '#CB11AB',
   },
}))
