import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
   Button,
   Typography,
   Box,
   CircularProgress,
   Alert,
   Divider,
   Link,
   TextField,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import { signInWithGoogle } from '../../configs/firebase'

const SignIn = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [googleLoading, setGoogleLoading] = useState(false)
   const [error, setError] = useState(null)
   const isLoading = useSelector((state) => state.auth.isLoading)

   // Форма для обычного входа
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      onSubmit: (values, { setSubmitting }) => {
         setError(null)
         dispatch(
            AUTH_THUNK.signIn({
               values,
               navigate,
               setSubmitting,
               handleClose: () => {},
            })
         )
            .unwrap()
            .catch((err) => {
               setError(err.message || 'Неправильный email или пароль')
            })
      },
   })

   // Обработчик Google входа
   const handleGoogleSignIn = async () => {
      try {
         setGoogleLoading(true)
         setError(null)

         const { idToken, email } = await signInWithGoogle()

         await dispatch(
            AUTH_THUNK.googleSignIn({
               idToken,
               email,
               navigate,
            })
         ).unwrap()
      } catch (err) {
         console.error('Google sign-in failed:', err)
         setError(err.message || 'Ошибка входа через Google')
      } finally {
         setGoogleLoading(false)
      }
   }

   return (
      <Box
         sx={{
            maxWidth: '400px',
            margin: '2rem auto',
            padding: '2rem',
            boxShadow: 3,
            borderRadius: '8px',
         }}
      >
         <Typography variant="h5" align="center" gutterBottom>
            Вход в систему
         </Typography>

         <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            startIcon={
               googleLoading ? <CircularProgress size={20} /> : <GoogleIcon />
            }
            sx={{
               mt: 1,
               mb: 2,
               color: '#4285F4',
               borderColor: '#4285F4',
               '&:hover': {
                  borderColor: '#3367D6',
                  backgroundColor: 'rgba(66, 133, 244, 0.04)',
               },
               height: '48px',
            }}
         >
            {googleLoading ? 'Вход...' : 'Войти через Google'}
         </Button>

         <Divider sx={{ my: 2 }}>или</Divider>

         <form onSubmit={formik.handleSubmit}>
            <TextField
               fullWidth
               margin="normal"
               label="Email"
               name="email"
               type="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               required
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
               fullWidth
               margin="normal"
               label="Пароль"
               name="password"
               type="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               required
               error={
                  formik.touched.password && Boolean(formik.errors.password)
               }
               helperText={formik.touched.password && formik.errors.password}
            />

            {error && (
               <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
               </Alert>
            )}

            <Button
               fullWidth
               type="submit"
               variant="contained"
               disabled={isLoading}
               sx={{
                  mt: 2,
                  bgcolor: '#D901A6',
                  '&:hover': { bgcolor: '#b1008b' },
                  height: '48px',
               }}
            >
               {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
               ) : (
                  'Войти'
               )}
            </Button>
         </form>

         <Typography align="center" sx={{ mt: 2 }}>
            Нет аккаунта?{' '}
            <Link href="/sign-up" underline="hover">
               Зарегистрироваться
            </Link>
         </Typography>
      </Box>
   )
}

export default SignIn
