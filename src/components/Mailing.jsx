import { Box, Typography, TextField, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendPromoMail } from '../store/mailing/mailThunk'
import { styled } from '@mui/material/styles'
import { Icons } from '../assets/icons'

const Mailing = ({ onCancel }) => {
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
      if (!imageFile || !title || !description || !endDate) {
         alert('Пожалуйста, заполните все поля и выберите изображение.')
         return
      }

      dispatch(
         sendPromoMail({
            subject: title,
            text: description,
            files: [imageFile],
            promoEndDate: endDate?.toISOString(),
         })
      )
   }

   return (
      <Root>
         <Title variant="h6">Создать рассылку</Title>

         <ImageBox>
            <input
               type="file"
               accept="image/*"
               hidden
               id="upload-banner"
               onChange={handleImageChange}
            />
            <ImageLabel htmlFor="upload-banner">
               {imagePreview ? (
                  <PreviewImg src={imagePreview} alt="preview" />
               ) : (
                  <>
                     <img src={Icons.photo} alt="add" />

                     <StyledCaption>
                        Нажмите для добавления фотографии
                     </StyledCaption>
                  </>
               )}
            </ImageLabel>
         </ImageBox>

         <StyledTextField
            required
            label="Название рассылки"
            placeholder="Введите название рассылки"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />

         <StyledTextField
            required
            label="Описание рассылки"
            placeholder="Введите описание рассылки"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
         />

         <DatesRow>
            <StyledDatePickerBox>
               <DatePicker
                  label="Дата начала акции"
                  value={startDate}
                  onChange={setStartDate}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
               />
            </StyledDatePickerBox>
            <StyledDatePickerBox>
               <DatePicker
                  label="Дата окончания акции"
                  value={endDate}
                  onChange={setEndDate}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
               />
            </StyledDatePickerBox>
         </DatesRow>

         <Actions>
            <StyledButton
               variant="outlined"
               color="secondary"
               onClick={onCancel}
            >
               Отменить
            </StyledButton>
            <StyledButton variant="contained" onClick={handleSubmit}>
               Отправить
            </StyledButton>
         </Actions>
      </Root>
   )
}

export default Mailing

const Root = styled(Box)({
   background: '#fff',
   padding: '12px',
   display: 'flex',
   flexDirection: 'column',
   height: '100%',
})

const Title = styled(Typography)({
   textAlign: 'center',
   marginBottom: 24,
})

const ImageBox = styled(Box)({
   width: 176,
   height: 176,
   background: '#F4F6F9',
   borderRadius: 12,
   margin: '0 auto 24px auto',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   cursor: 'pointer',
   overflow: 'hidden',
   position: 'relative',
})

const ImageLabel = styled('label')({
   cursor: 'pointer',
   width: '100%',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
})

const PreviewImg = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
})

const StyledCaption = styled(Typography)({
   fontSize: 13,
   color: '#7B7B7B',
   marginTop: 8,
})

const StyledTextField = styled(TextField)({
   marginBottom: 16,
   '& .MuiInputBase-root': {
      background: '#fff',
      borderRadius: 6,
      fontSize: 16,
   },
   '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E3E4E8',
   },
})

const DatesRow = styled(Box)({
   display: 'flex',
   gap: 16,
   marginBottom: 24,
})

const Actions = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   marginTop: 'auto',
   gap: 16,
})

const StyledButton = styled(Button)(({ theme }) => ({
   maxWidth: 180,
   fontWeight: 500,
   fontSize: 16,
   height: 44,
   borderRadius: 8,
   boxShadow: 'none',
   textTransform: 'none',
   ...(theme.palette.mode === 'light'
      ? {
           '&.MuiButton-contained': {
              background: '#D300A4',
              '&:hover': { background: '#B000A4' },
           },
           '&.MuiButton-outlined': {
              color: '#D100C9',
              borderColor: '#D100C9',
              '&:hover': { borderColor: '#D100C9', background: '#F9E6F9' },
           },
        }
      : {}),
}))

const StyledDatePickerBox = styled(Box)({
   width: '100%',
   '& .MuiInputBase-root': {
      background: '#fff',
      borderRadius: 6,
      fontSize: 16,
   },
   '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E3E4E8',
   },
})
