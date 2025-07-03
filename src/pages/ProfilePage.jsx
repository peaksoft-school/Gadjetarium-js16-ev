import { useEffect, useState } from 'react'
import {
   fetchProfile,
   updateProfile,
   uploadPhoto,
   deleteProfile,
} from '../store/profile/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   TextField,
   Button,
   Typography,
   Avatar,
   CircularProgress,
   InputAdornment,
   IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { data, status } = useSelector((state) => state.profile)
   const [form, setForm] = useState({})
   const [preview, setPreview] = useState(null)
   const [showOldPassword, setShowOldPassword] = useState(false)
   const [showNewPassword, setShowNewPassword] = useState(false)

   useEffect(() => {
      dispatch(fetchProfile())
   }, [dispatch])

   useEffect(() => {
      if (data) setForm(data)
   }, [data])

   const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value })

   const handleUpdate = () => {
      dispatch(updateProfile(form))
   }

   const handlePhotoChange = (e) => {
      const file = e.target.files[0]
      if (file) {
         setPreview(URL.createObjectURL(file))
         dispatch(uploadPhoto(file))
      }
   }

   const handleDelete = () => {
      dispatch(deleteProfile())
   }

   if (status === 'loading') return <CircularProgress />

   return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
         <Typography variant="h5" mb={2}>
            Смена пароля
         </Typography>

         <Avatar
            src={preview || data?.photoUrl}
            sx={{ width: 80, height: 80, mb: 2 }}
         />
         <Button component="label" variant="outlined" fullWidth>
            Сменить фото
            <input type="file" hidden onChange={handlePhotoChange} />
         </Button>

         <TextField
            name="firstName"
            label="Имя"
            value={form.firstName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
         />
         <TextField
            name="lastName"
            label="Фамилия"
            value={form.lastName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
         />
         <TextField
            name="phoneNumber"
            label="Телефон"
            value={form.phoneNumber || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
         />
         <TextField
            name="address"
            label="Адрес"
            value={form.address || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
         />

         <TextField
            name="oldPassword"
            label="Старый пароль"
            type={showOldPassword ? 'text' : 'password'}
            value={form.oldPassword || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton
                        onClick={() => setShowOldPassword((prev) => !prev)}
                     >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               ),
            }}
         />
         <TextField
            name="newPassword"
            label="Новый пароль"
            type={showNewPassword ? 'text' : 'password'}
            value={form.newPassword || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton
                        onClick={() => setShowNewPassword((prev) => !prev)}
                     >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               ),
            }}
         />
         <Button color="error" onClick={handleDelete}>
            Удалить профиль
         </Button>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
               variant="outlined"
               onClick={() => navigate('/profile')}
               sx={{ mb: 2 }}
            >
               Назад
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
               Редактировать
            </Button>
         </Box>
      </Box>
   )
}
