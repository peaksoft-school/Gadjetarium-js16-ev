import React from 'react'
import { styled } from '@mui/material/styles'
import { Button, TextField, Box } from '@mui/material'

const SubscribeForm = () => {
   return (
      <FormWrapper>
         <StyledInput
            placeholder="Email"
            size="small"
            variant="outlined"
            InputProps={{
               sx: {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
               },
            }}
         />
         <StyledButton variant="contained">Подписаться</StyledButton>
      </FormWrapper>
   )
}

export default SubscribeForm

const FormWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   marginTop: 8,
}))

const StyledInput = styled(TextField)(({ theme }) => ({
   backgroundColor: '#fff',
   borderRadius: '6px 0 0 6px',
   width: '246px',
   '& fieldset': {
      border: 'none',
   },
   '& .MuiInputBase-input': {
      padding: '10px 14px',
      height: '20px',
   },
}))

const StyledButton = styled(Button)(({ theme }) => ({
   borderRadius: '0 6px 6px 0',
   backgroundColor: '#E11383',
   fontWeight: 500,
   height: '43px',
   textTransform: 'none',
   width: '162px',
   boxShadow: 'none',
   '&:hover': {
      backgroundColor: '#c21072',
      boxShadow: 'none',
   },
}))
