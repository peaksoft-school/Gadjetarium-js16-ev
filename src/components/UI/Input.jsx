import { styled, TextField } from '@mui/material'

const Input = ({ error, onChange, disabled, placeholder, ...props }) => {
   return (
      <StyledInput
         fullWidth
         variant="outlined"
         onChange={onChange}
         disabled={disabled}
         placeholder={placeholder}
         error={Boolean(error)}
         helperText={error}
         {...props}
      />
   )
}

export default Input

const StyledInput = styled(TextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#f9f9f9',

      '& fieldset': {
         borderColor: '#d1d5db',
      },

      '&:hover fieldset': {
         borderColor: '#a855f7',
      },

      '&.Mui-focused fieldset': {
         borderColor: '#d946ef',
         borderWidth: '2px',
      },

      '& input': {
         color: '#111827',
      },
   },

   '& .Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ef4444 !important',
      borderWidth: '2px',
   },
}))
