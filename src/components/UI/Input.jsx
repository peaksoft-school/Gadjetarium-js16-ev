import { styled, TextField, IconButton, InputAdornment } from '@mui/material'
import { forwardRef, useState } from 'react'
import { Icons } from '../../assets/icons'

const Input = forwardRef(
   (
      {
         error,
         onChange,
         disabled,
         placeholder,
         value,
         type = 'text',
         showToggle = false,
         ...props
      },
      ref
   ) => {
      const [show, setShow] = useState(false)

      const isPassword = type === 'password'

      const handleToggle = () => {
         setShow((prev) => !prev)
      }

      return (
         <StyledInput
            fullWidth
            variant="outlined"
            ref={ref}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            error={Boolean(error)}
            value={value}
            type={showToggle && isPassword && show ? 'text' : type}
            helperText={error}
            InputProps={{
               endAdornment:
                  showToggle && isPassword ? (
                     <InputAdornment position="end">
                        <IconButton onClick={handleToggle} edge="end">
                           {show ? <img src={Icons.visible}/> : <img src={Icons.invisible}/>}
                        </IconButton>
                     </InputAdornment>
                  ) : undefined,
            }}
            {...props}
         />
      )
   }
)

export default Input

const StyledInput = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
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
