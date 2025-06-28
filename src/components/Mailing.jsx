import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const NewsletterForm = ({ onCancel, onSubmit }) => {
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [imageFile, setImageFile] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   const dispatch = useDispatch()

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         setImageFile(file)
         setImagePreview(URL.createObjectURL(file))
      }
   }

   const handleSubmit = () => {
      const data = {
         title,
         description,
         endDate,
         image: imageFile,
      }
      dispatch(sendNewsletter(data))
   }

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
            sx={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
         >
            <input
               type="file"
               accept="image/*"
               hidden
               id="upload-banner"
               onChange={handleImageChange}
            />
            <label
               htmlFor="upload-banner"
               style={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               {imagePreview ? (
                  <img
                     src={imagePreview}
                     alt="preview"
                     style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                     }}
                  />
               ) : (
                  <>
                     <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
                     <Typography variant="caption">
                        Нажмите для добавления фотографии
                     </Typography>
                  </>
               )}
            </label>
         </Box>

         <TextField
            required
            label="Название рассылки"
            placeholder="Введите название рассылки"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
         />

         <TextField
            required
            label="Описание рассылки"
            placeholder="Введите описание рассылки"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
               onClick={handleSubmit}
            >
               Отправить
            </Button>
         </Box>
      </Box>
   )
}

export default NewsletterForm
