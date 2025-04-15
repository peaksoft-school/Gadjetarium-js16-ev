import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Box,
   Avatar,
} from '@mui/material'

const SelectDropdown = ({
   label,
   options,
   value,
   onChange,
   disabled = false,
   fullWidth = true,
}) => {
   const handleChange = (event) => {
      onChange(event.target.value)
   }

   return (
      <FormControl
         fullWidth={fullWidth}
         disabled={disabled}
         sx={{ minHeight: 40 }}
      >
         <InputLabel
            sx={{
               fontSize: 14,
            }}
         >
            {label}
         </InputLabel>
         <Select
            value={value}
            label={label}
            onChange={handleChange}
            sx={{
               height: 40,
               fontSize: 14,
               '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
               },
            }}
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
            {options.map((option) => (
               <MenuItem key={option.value} value={option.value}>
                  <Box display="flex" alignItems="center" gap={1}>
                     {option.icon && (
                        <Avatar
                           src={option.icon}
                           alt={option.label}
                           sx={{ width: 24, height: 24 }}
                           variant="rounded"
                        />
                     )}
                     {option.label}
                  </Box>
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   )
}

export default SelectDropdown
