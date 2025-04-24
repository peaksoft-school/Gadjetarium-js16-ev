import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Box,
   Avatar,
   styled,
} from '@mui/material'
import { forwardRef } from 'react'

const Dropdown = forwardRef(
   (
      { label, options, value, onChange, disabled = false, fullWidth = true },
      ref
   ) => {
      const handleChange = (event) => onChange(event.target.value)

      return (
         <StyledFormControl fullWidth={fullWidth} disabled={disabled}>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledSelect
               value={value}
               label={label}
               onChange={handleChange}
               inputRef={ref}
               MenuProps={{
                  PaperProps: {
                     component: StyledMenuPaper,
                  },
               }}
            >
               {options.map(({ value, icon, label }) => (
                  <MenuItem key={value} value={value}>
                     <StyledMenuItemContent>
                        {icon && <StyledAvatar src={icon} alt={label} />}

                        {label}
                     </StyledMenuItemContent>
                  </MenuItem>
               ))}
            </StyledSelect>
         </StyledFormControl>
      )
   }
)

export default Dropdown

const StyledFormControl = styled(FormControl)({
   minHeight: 40,
})

const StyledInputLabel = styled(InputLabel)({
   fontSize: 14,
})

const StyledSelect = styled(Select)({})

const StyledMenuItemContent = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 8,
})

const StyledAvatar = styled(Avatar)({
   width: 24,
   height: 24,
   borderRadius: 4,
})

const StyledMenuPaper = styled('div')({
   maxHeight: 300,
   '& .MuiMenuItem-root': {
      fontSize: 14,
      height: 40,
   },
})
