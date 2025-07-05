// import { useEffect, useState } from 'react'
// import {
//    fetchProfile,
//    updateProfile,
//    uploadPhoto,
//    deleteProfile,
// } from '../store/profile/profileSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//    Box,
//    TextField,
//    Button,
//    Typography,
//    Avatar,
//    CircularProgress,
//    InputAdornment,
//    IconButton,
// } from '@mui/material'
// import { Visibility, VisibilityOff } from '@mui/icons-material'
// import { useNavigate } from 'react-router-dom'

// export default function ProfilePage() {
//    const dispatch = useDispatch()
//    const navigate = useNavigate()

//    const { data, status } = useSelector((state) => state.profile)
//    const [form, setForm] = useState({})
//    const [preview, setPreview] = useState(null)
//    const [showOldPassword, setShowOldPassword] = useState(false)
//    const [showNewPassword, setShowNewPassword] = useState(false)

//    useEffect(() => {
//       dispatch(fetchProfile())
//    }, [dispatch])

//    useEffect(() => {
//       if (data) setForm(data)
//    }, [data])

//    const handleChange = (e) =>
//       setForm({ ...form, [e.target.name]: e.target.value })

//    const handleUpdate = () => {
//       dispatch(updateProfile(form))
//    }

//    const handlePhotoChange = (e) => {
//       const file = e.target.files[0]
//       if (file) {
//          setPreview(URL.createObjectURL(file))
//          dispatch(uploadPhoto(file))
//       }
//    }

//    const handleDelete = () => {
//       dispatch(deleteProfile())
//    }

//    if (status === 'loading') return <CircularProgress />

//    return (
//       <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
//          <Typography variant="h5" mb={2}>
//             Смена пароля
//          </Typography>

//          <Avatar
//             src={preview || data?.photoUrl}
//             sx={{ width: 80, height: 80, mb: 2 }}
//          />
//          <Button component="label" variant="outlined" fullWidth>
//             Сменить фото
//             <input type="file" hidden onChange={handlePhotoChange} />
//          </Button>

//          <TextField
//             name="firstName"
//             label="Имя"
//             value={form.firstName || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//          />
//          <TextField
//             name="lastName"
//             label="Фамилия"
//             value={form.lastName || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//          />
//          <TextField
//             name="phoneNumber"
//             label="Телефон"
//             value={form.phoneNumber || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//          />
//          <TextField
//             name="address"
//             label="Адрес"
//             value={form.address || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//          />

//          <TextField
//             name="oldPassword"
//             label="Старый пароль"
//             type={showOldPassword ? 'text' : 'password'}
//             value={form.oldPassword || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             InputProps={{
//                endAdornment: (
//                   <InputAdornment position="end">
//                      <IconButton
//                         onClick={() => setShowOldPassword((prev) => !prev)}
//                      >
//                         {showOldPassword ? <VisibilityOff /> : <Visibility />}
//                      </IconButton>
//                   </InputAdornment>
//                ),
//             }}
//          />
//          <TextField
//             name="newPassword"
//             label="Новый пароль"
//             type={showNewPassword ? 'text' : 'password'}
//             value={form.newPassword || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             InputProps={{
//                endAdornment: (
//                   <InputAdornment position="end">
//                      <IconButton
//                         onClick={() => setShowNewPassword((prev) => !prev)}
//                      >
//                         {showNewPassword ? <VisibilityOff /> : <Visibility />}
//                      </IconButton>
//                   </InputAdornment>
//                ),
//             }}
//          />
//          <Button color="error" onClick={handleDelete}>
//             Удалить профиль
//          </Button>
//          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Button
//                variant="outlined"
//                onClick={() => navigate('/profile')}
//                sx={{ mb: 2 }}
//             >
//                Назад
//             </Button>
//             <Button variant="contained" onClick={handleUpdate}>
//                Редактировать
//             </Button>
//          </Box>
//       </Box>
//    )
// }

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
   Stack,
   styled,
   Tabs,
   Tab,
   Container,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'

export default function ProfilePage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { data, status } = useSelector((state) => state.profile)
   const [form, setForm] = useState({})
   const [preview, setPreview] = useState(null)
   const [showOldPassword, setShowOldPassword] = useState(false)
   const [showNewPassword, setShowNewPassword] = useState(false)
   const [tabValue, setTabValue] = useState(2)

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

   const handleTabChange = (event, newValue) => {
      setTabValue(newValue)
   }

   if (status === 'loading') return <CircularProgress sx={{ mt: 5 }} />

   return (
      <div>
         <UserHeader />
         <PageContainer>
            <Header>
               <Typography variant="h5" fontWeight="500" color="#333">
                  Профиль
               </Typography>
            </Header>

            <StyledTabs value={tabValue} onChange={handleTabChange}>
               <Tab label="История заказов" />
               <Tab label="Избранное" />
               <Tab label="Профиль" />
            </StyledTabs>

            <ProfileSection>
               <AvatarSection>
                  <Avatar
                     src={preview || data?.photoUrl}
                     sx={{ width: 100, height: 100, mb: 1 }}
                  />
                  <PhotoButton variant="text" component="label">
                     Сменить фото
                     <input type="file" hidden onChange={handlePhotoChange} />
                  </PhotoButton>
               </AvatarSection>

               <FormSection>
                  <Typography variant="h6" fontWeight="500" mb={3} color="#333">
                     Личные данные
                  </Typography>

                  <Stack direction="row" spacing={2} width="100%">
                     <StyledTextField
                        name="firstName"
                        label="Имя *"
                        value={form.firstName || ''}
                        onChange={handleChange}
                        fullWidth
                        required
                     />
                     <StyledTextField
                        name="lastName"
                        label="Фамилия *"
                        value={form.lastName || ''}
                        onChange={handleChange}
                        fullWidth
                        required
                     />
                  </Stack>
                  <br />
                  <Stack direction="row" spacing={2} width="100%">
                     <StyledTextField
                        name="email"
                        label="E-mail *"
                        value={form.email || ''}
                        onChange={handleChange}
                        fullWidth
                        required
                     />
                     <StyledTextField
                        name="phoneNumber"
                        label="Телефон *"
                        value={form.phoneNumber || ''}
                        onChange={handleChange}
                        fullWidth
                        required
                     />
                  </Stack>
                  <br />
                  <StyledTextField
                     name="address"
                     label="Адрес доставки *"
                     value={form.address || ''}
                     onChange={handleChange}
                     fullWidth
                     required
                  />

                  <StyledTextField
                     name="oldPassword"
                     label="Старый пароль *"
                     type={showOldPassword ? 'text' : 'password'}
                     value={form.oldPassword || ''}
                     onChange={handleChange}
                     fullWidth
                     required
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={() =>
                                    setShowOldPassword((prev) => !prev)
                                 }
                              >
                                 {showOldPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />

                  <StyledTextField
                     name="newPassword"
                     label="Новый пароль *"
                     type={showNewPassword ? 'text' : 'password'}
                     value={form.newPassword || ''}
                     onChange={handleChange}
                     fullWidth
                     required
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 onClick={() =>
                                    setShowNewPassword((prev) => !prev)
                                 }
                              >
                                 {showNewPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />

                  <StyledTextField
                     name="confirmPassword"
                     label="Подтвердите новый пароль *"
                     type="password"
                     value={form.confirmPassword || ''}
                     onChange={handleChange}
                     fullWidth
                     required
                  />

                  <ActionButtons>
                     <BackButton onClick={() => navigate('/profile')}>
                        Назад
                     </BackButton>
                     <EditButton variant="contained" onClick={handleUpdate}>
                        Редактировать
                     </EditButton>
                  </ActionButtons>
               </FormSection>
            </ProfileSection>
         </PageContainer>
         <br />
         <br />
         <Footer />
      </div>
   )
}

const PageContainer = styled(Container)(({ theme }) => ({
   maxWidth: '1000px',
   padding: '0 16px',
   margin: '0 auto',
}))

const Header = styled(Box)(({ theme }) => ({
   padding: '24px 0',
   borderBottom: '1px solid #f0f0f0',
   marginBottom: '0',
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
   marginBottom: '32px',
   '& .MuiTabs-indicator': {
      backgroundColor: '#000',
      height: '2px',
   },
   '& .MuiTab-root': {
      textTransform: 'none',
      fontSize: '14px',
      fontWeight: '400',
      color: '#666',
      padding: '12px 24px',
      minWidth: 'auto',
      '&.Mui-selected': {
         color: '#000',
         fontWeight: '500',
      },
   },
}))

const ProfileSection = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '32px',
   alignItems: 'flex-start',
}))

const AvatarSection = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   minWidth: '120px',
}))

const FormSection = styled(Box)(({ theme }) => ({
   flex: 1,
   maxWidth: '600px',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
   marginBottom: '20px',
   '& .MuiOutlinedInput-root': {
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      '& fieldset': {
         borderColor: '#e9ecef',
      },
      '&:hover fieldset': {
         borderColor: '#dee2e6',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#007bff',
         borderWidth: '1px',
      },
   },
   '& .MuiInputLabel-root': {
      fontSize: '14px',
      '&.Mui-focused': {
         color: '#495057',
      },
   },
   '& .MuiInputLabel-asterisk': {
      color: '#dc3545',
   },
}))

const PhotoButton = styled(Button)(({ theme }) => ({
   marginTop: '8px',
   textTransform: 'none',
   fontSize: '12px',
   color: '#007bff',
   padding: '4px 8px',
   minWidth: 'auto',
   '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
   },
}))

const ActionButtons = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '16px',
   marginTop: '20px',
   justifyContent: 'space-between',
}))

const StyledButton = styled(Button)(({ theme }) => ({
   textTransform: 'none',
   borderRadius: '4px',
   padding: '8px 24px',
   fontSize: '14px',
   fontWeight: '500',
}))

const BackButton = styled(StyledButton)(({ theme }) => ({
   border: '1px solid #e91e63',
   color: '#e91e63',
   backgroundColor: 'white',
   '&:hover': {
      backgroundColor: '#fce4ec',
      border: '1px solid #e91e63',
   },
}))

const EditButton = styled(StyledButton)(({ theme }) => ({
   backgroundColor: '#e91e63',
   color: 'white',
   '&:hover': {
      backgroundColor: '#c2185b',
   },
}))
