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
import { styled } from '@mui/system'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import { signInWithGoogle } from '../../configs/firebase'

const SignIn = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [googleLoading, setGoogleLoading] = useState(false)
   const [error, setError] = useState(null)
   const isLoading = useSelector((state) => state.auth.isLoading)

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
      <Container>
         <Typography variant="h5" align="center" gutterBottom>
            Вход в систему
         </Typography>

         <GoogleButton
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            startIcon={
               googleLoading ? <CircularProgress size={20} /> : <GoogleIcon />
            }
         >
            {googleLoading ? 'Вход...' : 'Войти через Google'}
         </GoogleButton>

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

            <SubmitButton
               fullWidth
               type="submit"
               variant="contained"
               disabled={isLoading}
            >
               {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
               ) : (
                  'Войти'
               )}
            </SubmitButton>
         </form>

         <StyledLinkText>
            Нет аккаунта?
            <Link href="/sign-up" underline="hover">
               Зарегистрироваться
            </Link>
         </StyledLinkText>

         <StyledLinkText>
            <Link href="/forgot-password" underline="hover">
               Забыли пароль?
            </Link>
         </StyledLinkText>
      </Container>
   )
}

export default SignIn

const Container = styled(Box)(({ theme }) => ({
   maxWidth: '400px',
   margin: '2rem auto',
   padding: '2rem',
   boxShadow: theme.shadows[3],
   borderRadius: '8px',
}))

const GoogleButton = styled(Button)({
   marginTop: '8px',
   marginBottom: '16px',
   color: '#4285F4',
   borderColor: '#4285F4',
   height: '48px',
   '&:hover': {
      borderColor: '#3367D6',
      backgroundColor: 'rgba(66, 133, 244, 0.04)',
   },
})

const SubmitButton = styled(Button)({
   marginTop: '16px',
   backgroundColor: '#D901A6',
   height: '48px',
   '&:hover': {
      backgroundColor: '#b1008b',
   },
})

const StyledLinkText = styled(Typography)({
   marginTop: '16px',
   textAlign: 'center',
})
