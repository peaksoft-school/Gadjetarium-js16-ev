// components/NewsletterForm.jsx
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useState } from 'react'

const NewsletterForm = ({ onCancel, onSubmit }) => {
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)

   return (
      <Box display="flex" flexDirection="column" height="100%">
         <Typography variant="h6" align="center" mb={3}>
            Создать рассылку
         </Typography>

         <Box
            width={176}
            height={176}
            bgcolor="#F4F6F9"
            borderRadius="12px"
            mx="auto"
            mb={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{ cursor: 'pointer' }}
         >
            <IconButton component="label">
               <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
               <input hidden type="file" />
            </IconButton>
            <Typography variant="caption">
               Нажмите для добавления фотографии
            </Typography>
         </Box>

         <TextField
            required
            label="Название рассылки"
            placeholder="Введите название рассылки"
            fullWidth
            sx={{ mb: 2 }}
         />

         <TextField
            required
            label="Описание рассылки"
            placeholder="Введите описание рассылки"
            fullWidth
            sx={{ mb: 2 }}
         />

         <Box display="flex" gap={2} mb={3}>
            <DatePicker
               label="Дата начала акции"
               value={startDate}
               onChange={setStartDate}
               slotProps={{ textField: { fullWidth: true, required: true } }}
            />
            <DatePicker
               label="Дата окончания акции"
               value={endDate}
               onChange={setEndDate}
               slotProps={{ textField: { fullWidth: true, required: true } }}
            />
         </Box>

         <Box display="flex" justifyContent="space-between" mt="auto">
            <Button
               variant="outlined"
               color="secondary"
               onClick={onCancel}
               sx={{ maxWidth: 180 }}
            >
               Отменить
            </Button>
            <Button
               variant="contained"
               sx={{ maxWidth: 180, bgcolor: '#D300A4' }}
               onClick={onSubmit}
            >
               Отправить
            </Button>
         </Box>
      </Box>
   )
}

export default NewsletterForm
