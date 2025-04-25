import { styled } from '@mui/material/styles'
import { Button, TextField, Box } from '@mui/material'

const SubscribeForm = () => {
   return (
      <FormWrapper>
         <StyledInput placeholder="Email" size="small" variant="outlined" />
         <StyledButton variant="contained">Подписаться</StyledButton>
      </FormWrapper>
   )
}

export default SubscribeForm



const FormWrapper = styled(Box)({
   display: 'flex',
   marginTop: '8px',
})

const StyledInput = styled(TextField)({
   width: '246px',
   backgroundColor: '#fff',
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 6,
   borderBottomLeftRadius: 6,
   '& fieldset': {
      border: 'none',
   },
   '& .MuiOutlinedInput-root': {
      borderRadius: 0,
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '& .MuiInputBase-root': {
      borderRadius: '6px 0 0 6px',
   },
   '& .MuiInputBase-input': {
      padding: '10px 14px',
      height: '20px',
   },
})

const StyledButton = styled(Button)({
   width: '162px',
   height: '43px',
   fontWeight: 500,
   textTransform: 'none',
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   borderTopRightRadius: 6,
   borderBottomRightRadius: 6,
   backgroundColor: '#E11383',
   boxShadow: 'none',
   '&:hover': {
      backgroundColor: '#c21072',
      boxShadow: 'none',
   },
})
