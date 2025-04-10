import { Radio, styled } from '@mui/material'

const RadioUI = ({ ...rest }) => <StyledRadio isChecked {...rest} />

export default RadioUI

const StyledRadio = styled(Radio)(({ theme }) => ({
   '&:hover': {
      color: '#CB11AB',
   },
   '&.Mui-checked': {
      color: '#CB11AB',
   },
}))
