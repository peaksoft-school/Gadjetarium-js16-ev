import { styled } from '@mui/material/styles'
import { Button, Box } from '@mui/material'
import Input from './UI/Input'

const SubscribeForm = () => {
   return (
      <FormWrapper>
         <Input />
         <StyledButton variant="contained">Подписаться</StyledButton>
      </FormWrapper>
   )
}

export default SubscribeForm

const FormWrapper = styled(Box)({
   display: 'flex',
   marginTop: '8px',
})

const StyledButton = styled(Button)({
   width: '162px',
   height: '56px',
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
