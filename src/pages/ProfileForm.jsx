import { useEffect, useState } from 'react'
import {
   TextField,
   Button,
   Box,
   Typography,
   Avatar,
   CircularProgress,
   styled,
   Container,
   Tabs,
   Tab,
} from '@mui/material'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
   fetchProfile,
   updateProfile,
   uploadPhoto,
} from '../store/profile/profileSlice'
import UserHeader from '../layout/user/UserHeader'
import Breadcrumbs from '../components/UI/BreadCrums'

const ProfileMain = ({
   form,
   handleChange,
   handleSave,
   data,
   handlePhotoChange,
   status,
   tabValue,
   handleTabChange,
   navigate,
}) => {
   if (status === 'loading') return <CircularProgress />

   return (
      <>
         <Typography variant="h3">Профиль</Typography>
         <br />
         <hr />
         <br />
         {/* Компактные табы под заголовком */}
         <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            size="small"
            sx={{ mb: 2 }}
         >
            <Tab label="История заказов" />
            <Tab label="Избранное" />
            <Tab label="Профиль" />
         </Tabs>
         <br />
         <br />
         <StyledBox1>
            <Avatar
               src={data?.photoUrl}
               sx={{ width: 100, height: 100, left: '25px' }}
            />
            <br />
            <Button
               component="label"
               variant="outlined"
               sx={{ width: '160px', height: '40px' }}
            >
               Сменить фото
               <input type="file" hidden onChange={handlePhotoChange} />
            </Button>
         </StyledBox1>
         <StyledBox2>
            <Typography variant="h5">Личные данные</Typography>
            <br />
            <StyledBoxK1>
               <Styledbox3>
                  <TextField
                     label="Имя"
                     name="firstName"
                     value={form.firstName || ''}
                     onChange={handleChange}
                  />
                  <TextField
                     label="Фамилия"
                     name="lastName"
                     value={form.lastName || ''}
                     onChange={handleChange}
                  />
               </Styledbox3>
               <br />
               <br />
               <Styledbox4>
                  <TextField
                     label="Телефон"
                     name="phoneNumber"
                     value={form.phoneNumber || ''}
                     onChange={handleChange}
                  />
                  <TextField
                     label="Адрес"
                     name="address"
                     value={form.address || ''}
                     onChange={handleChange}
                  />
               </Styledbox4>
            </StyledBoxK1>
            <br />
            <br />
            <Box
               sx={{
                  display: 'flex',
                  gap: 22.4,
               }}
            >
               <Button
                  variant="outlined"
                  onClick={() => navigate('/profile/password')}
               >
                  сменить пароль
               </Button>
               <Button variant="contained" onClick={handleSave}>
                  Редактировать
               </Button>
            </Box>
         </StyledBox2>
      </>
   )
}

const ProfileForm = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const dispatch = useDispatch()
   const { data, status } = useSelector((state) => state.profile)
   const [form, setForm] = useState({})

   useEffect(() => {
      dispatch(fetchProfile())
   }, [dispatch])

   useEffect(() => {
      if (data) setForm(data)
   }, [data])

   const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
   }

   const handleSave = () => {
      dispatch(updateProfile(form))
   }

   const handlePhotoChange = (e) => {
      const file = e.target.files[0]
      dispatch(uploadPhoto(file))
   }

   const tabPaths = ['/profile', '/profile/orders', '/profile/favorites']
   const currentTab = tabPaths.indexOf(location.pathname)
   const tabValue = currentTab === -1 ? 0 : currentTab

   const handleTabChange = (event, newValue) => {
      navigate(tabPaths[newValue])
   }

   return (
      <div>
         <UserHeader />
         <StyledBreadCrumbs>
            <Breadcrumbs
               baseLabel="Личный кабинет"
               pathLabels={{
                  orders: 'История заказов',
                  favorites: 'Избранное',
                  profile: 'Учетная запись',
               }}
            />
         </StyledBreadCrumbs>

         <Container1
            sx={{
               maxWidth: 600,
               mx: 'auto',
               display: 'flex',
               flexDirection: 'column',
               gap: 3,
            }}
         >
            <Box sx={{ mt: 3 }}>
               <Routes>
                  <Route
                     path=""
                     element={
                        <ProfileMain
                           form={form}
                           handleChange={handleChange}
                           handleSave={handleSave}
                           data={data}
                           handlePhotoChange={handlePhotoChange}
                           status={status}
                           tabValue={tabValue}
                           handleTabChange={handleTabChange}
                           navigate={navigate}
                        />
                     }
                  />
                  <Route
                     path="orders"
                     element={<div>Твоя история заказов</div>}
                  />
                  <Route path="favorites" element={<div>Твои избранные</div>} />
               </Routes>
            </Box>
         </Container1>
         {/* <Footer /> */}
      </div>
   )
}

export default ProfileForm

const StyledBox1 = styled('div')({
   display: 'flex',
   flexDirection: 'column',
})
const Container1 = styled(Container)({})

const StyledBox2 = styled(Box)({
   position: 'relative',
   left: '15%',
   bottom: '24vh',
   marginLeft: '6%',
})
const Styledbox3 = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
})
const Styledbox4 = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
})

const StyledBoxK1 = styled(Box)({
   display: 'flex',
   gap: '10px',
})

const StyledBreadCrumbs = styled(Box)(() => ({
   marginLeft: '12.2%',
   marginTop: '2%',
   position: 'relative',
   top: '10px',
}))
