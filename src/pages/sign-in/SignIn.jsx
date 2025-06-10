import { useState } from 'react'
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
import { useForm } from 'react-hook-form'

const SignIn = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [googleLoading, setGoogleLoading] = useState(false)
   const [error, setError] = useState(null)
   const isLoading = useSelector((state) => state.auth.isLoading)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: 'onChange' })

   const onSubmit = (values) => {
      dispatch(
         AUTH_THUNK.signIn({
            values,
            navigate,
            setSubmitting: () => {},
            handleClose: () => {},
         })
      )
   }

   const handleGoogleSignIn = async () => {
      try {
         setGoogleLoading(true)
         setError(null)
         await dispatch(AUTH_THUNK.googleSignIn({ navigate })).unwrap()
      } catch (err) {
         console.error('Google sign-in failed:', err)
         setError(err.message || 'Ошибка входа через Google')
      } finally {
         setGoogleLoading(false)
      }
   }

   return (
      <StyledBox>
         <StyledContainer>
            <Typography variant="h5" align="center" gutterBottom>
               Вход в систему
            </Typography>

            <GoogleButton
               fullWidth
               variant="outlined"
               onClick={handleGoogleSignIn}
               disabled={googleLoading}
               startIcon={
                  googleLoading ? (
                     <CircularProgress size={20} />
                  ) : (
                     <GoogleIcon />
                  )
               }
            >
               {googleLoading ? 'Вход...' : 'Войти через Google'}
            </GoogleButton>

            <Divider sx={{ my: 2 }}>или</Divider>

            <form onSubmit={handleSubmit(onSubmit)}>
               <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  type="email"
                  {...register('email', {
                     required: 'Email обязателен',
                     pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Некорректный email',
                     },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
               />

               <TextField
                  fullWidth
                  margin="normal"
                  label="Пароль"
                  type="password"
                  {...register('password', {
                     required: 'Пароль обязателен',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
         </StyledContainer>
      </StyledBox>
   )
}

export default SignIn

const StyledContainer = styled(Box)(({ theme }) => ({
   maxWidth: '400px',
   margin: '2rem auto',
   padding: '2rem',
   boxShadow: theme.shadows[3],
   borderRadius: '8px',
   backgroundColor: 'white',
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

const StyledBox = styled(Box)({
   background: 'linear-gradient(135deg, #D3138A 0%, #3B0DCD 100%)',
   height: '100vh',
   marginTop: 0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
})
