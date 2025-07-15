import { useState, useRef } from 'react'
import { Box, TextField, Rating, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { addReview } from '../store/reviews/ReviewsThunk'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const FormContainer = styled(Box)(({ theme }) => ({
   padding: theme.spacing(2),
   backgroundColor: '#f5f5f5',
   borderRadius: theme.shape.borderRadius,
   marginTop: theme.spacing(2),
}))

const ReviewForm = ({ productId, onSuccess }) => {
   const dispatch = useDispatch()
   const [formData, setFormData] = useState({
      commentary: '',
      rating: 0,
   })
   const [images, setImages] = useState([])
   const fileInputRef = useRef(null)

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
   }

   const handleRatingChange = (event, newValue) => {
      setFormData((prev) => ({ ...prev, rating: newValue }))
   }

   const handleFilesChange = (e) => {
      const files = Array.from(e.target.files)
      setImages(files)
   }

   const handleDrop = (e) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      setImages((prev) => [...prev, ...files])
   }

   const handleDragOver = (e) => {
      e.preventDefault()
   }

   const handlePickFiles = () => {
      fileInputRef.current?.click()
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!productId) {
         alert('Ошибка: не найден productId товара!')
         return
      }
      const body = {
         rating: formData.rating,
         content: formData.commentary,
         images: [], // пока не отправляем файлы
      }
      await dispatch(addReview({ ...body, productId }))
      setFormData({ commentary: '', rating: 0 })
      setImages([])
      if (onSuccess) onSuccess()
   }

   return (
      <FormContainer
         sx={{ p: 0, background: 'none', boxShadow: 'none', borderRadius: 0 }}
      >
         <Box
            sx={{
               p: 3,
               background: '#fff',
               borderRadius: 3,
               boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
               border: '2px solid #00bfff20',
               minWidth: 340,
            }}
         >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
               Оставьте свой отзыв
            </Typography>
            <form onSubmit={handleSubmit}>
               <Typography sx={{ fontWeight: 500, mb: 1 }}>Оценка</Typography>
               <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  size="large"
                  sx={{ mb: 2 }}
               />
               <Typography sx={{ fontWeight: 500, mb: 1 }}>
                  Ваш комментарий
               </Typography>
               <TextField
                  fullWidth
                  name="commentary"
                  label="Напишите комментарий"
                  value={formData.commentary}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Напишите комментарий"
                  sx={{ mb: 2 }}
               />
               <Box
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  sx={{
                     border: '1.5px dashed #bdbdbd',
                     borderRadius: 2,
                     p: 2,
                     mb: 2,
                     display: 'flex',
                     alignItems: 'center',
                     gap: 2,
                     background: '#fafbfc',
                     cursor: 'pointer',
                  }}
                  onClick={handlePickFiles}
               >
                  <PhotoCameraIcon sx={{ color: '#bdbdbd', fontSize: 32 }} />
                  <Typography variant="body2" sx={{ color: '#888' }}>
                     <span
                        style={{
                           color: '#e91e63',
                           fontWeight: 500,
                           textDecoration: 'underline',
                           cursor: 'pointer',
                        }}
                     >
                        Нажмите на ссылку
                     </span>{' '}
                     чтобы выбрать фотографии или просто перетащите их сюда
                  </Typography>
                  <input
                     type="file"
                     multiple
                     accept="image/*"
                     ref={fileInputRef}
                     style={{ display: 'none' }}
                     onChange={handleFilesChange}
                  />
               </Box>
               {images.length > 0 && (
                  <Box
                     sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}
                  >
                     {images.map((file, idx) => (
                        <Box
                           key={idx}
                           sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              overflow: 'hidden',
                              border: '1px solid #eee',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                           }}
                        >
                           <img
                              src={URL.createObjectURL(file)}
                              alt="preview"
                              style={{
                                 width: '100%',
                                 height: '100%',
                                 objectFit: 'cover',
                              }}
                           />
                        </Box>
                     ))}
                  </Box>
               )}
               <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                     mt: 2,
                     background:
                        'linear-gradient(90deg,#e91e63 0%,#fbc2eb 100%)',
                     color: '#fff',
                     fontWeight: 700,
                     borderRadius: 2,
                     fontSize: 18,
                     py: 1.5,
                     boxShadow: '0 2px 8px #e91e6320',
                     '&:hover': {
                        background:
                           'linear-gradient(90deg,#e91e63 0%,#f9c5d1 100%)',
                     },
                  }}
               >
                  Отправить отзыв
               </Button>
            </form>
         </Box>
      </FormContainer>
   )
}

export default ReviewForm
