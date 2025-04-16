import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Box,
   Avatar,
   styled,
} from '@mui/material'

const SelectDropdown = ({
   label,
   options,
   value,
   onChange,
   disabled = false,
   fullWidth = true,
}) => {
   const handleChange = (event) => onChange(event.target.value)

   return (
      <StyledFormControl fullWidth={fullWidth} disabled={disabled}>
         <StyledInputLabel>{label}</StyledInputLabel>
         <Select
            value={value}
            label={label}
            onChange={handleChange}
            MenuProps={{
               PaperProps: {
                  sx: {
                     maxHeight: 300,
                     '& .MuiMenuItem-root': {
                        fontSize: 14,
                        height: 40,
                     },
                  },
               },
            }}
         >
            {options.map(({ value, icon, label }) => (
               <MenuItem key={value} value={value}>
                  <Box display="flex" alignItems="center" gap={1}>
                     {icon && (
                        <Avatar
                           src={icon}
                           alt={label}
                           sx={{ width: 24, height: 24 }}
                           variant="rounded"
                        />
                     )}
                     {label}
                  </Box>
               </MenuItem>
            ))}
         </Select>
      </StyledFormControl>
   )
}

export default SelectDropdown

const StyledFormControl = styled(FormControl)({
   minHeight: 40,
})

const StyledInputLabel = styled(InputLabel)({
   fontSize: 14,
})
