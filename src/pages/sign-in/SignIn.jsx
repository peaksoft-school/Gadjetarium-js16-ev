import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'

import GoogleIcon from '@mui/icons-material/Google'
import { Typography, Box, CircularProgress, Alert, Link } from '@mui/material'
import { styled } from '@mui/system'

const SignIn = () => {
   const dispatch = useDispatch()

   const navigate = useNavigate()

   const [googleLoading, setGoogleLoading] = useState(false)

   const [error, setError] = useState(null)

   const isLoading = useSelector((state) => state.auth)

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

   const handleGoBack = () => navigate('/')

   return (
      <Wrapper>
         <ModalBox>
            <CloseButton onClick={() => handleGoBack()}>×</CloseButton>

            <Title variant="h4" align="center">
               Войти
            </Title>

            <Form onSubmit={handleSubmit(onSubmit)}>
               <StyledInput
                  fullWidth
                  label="Напишите email"
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

               <StyledInput
                  fullWidth
                  label="Напишите пароль"
                  type="password"
                  showToggle
                  {...register('password', {
                     required: 'Пароль обязателен',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
               />

               {error && <StyledAlert severity="error">{error}</StyledAlert>}

               <StyledButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
               >
                  {isLoading ? <StyledLoader size={24} /> : 'Войти'}
               </StyledButton>
            </Form>

            <ForgotPasswordLink href="/forgot-password">
               Забыли пароль?
            </ForgotPasswordLink>

            <TextLink>
               Нет аккаунта?
               <StyledLink href="/sign-up"> Зарегистрироваться</StyledLink>
            </TextLink>

            <StyledGoogleButton
               type="button"
               onClick={handleGoogleSignIn}
               disabled={googleLoading}
            >
               {googleLoading ? (
                  <StyledLoader size={20} />
               ) : (
                  <GoogleIconStyled />
               )}
               Войти через Google
            </StyledGoogleButton>
         </ModalBox>
      </Wrapper>
   )
}

export default SignIn

const Wrapper = styled(Box)({
   background: 'linear-gradient(135deg, #D3138A 0%, #3B0DCD 100%)',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '20px',
})

const ModalBox = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: '520px',
   backgroundColor: '#fff',
   borderRadius: '16px',
   padding: '48px 40px',
   boxShadow: theme.shadows[6],
   position: 'relative',
   textAlign: 'center',
   display: 'flex',
   flexDirection: 'column',
}))

const CloseButton = styled('div')({
   position: 'absolute',
   top: '16px',
   right: '20px',
   fontSize: '28px',
   fontWeight: 'bold',
   cursor: 'pointer',
   color: '#999',
   '&:hover': {
      color: '#000',
   },
})

const Title = styled(Typography)({
   fontSize: '28px',
   fontWeight: 600,
   marginBottom: '32px',
})

const Form = styled('form')({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
})

const StyledButton = styled(Button)({
   marginTop: '12px',
   background: '#D3138A',
   fontWeight: 600,
   fontSize: '18px',
   textTransform: 'none',
   height: '52px',
   borderRadius: '8px',
   '&:hover': {
      background: '#b10f75',
   },
})

const StyledGoogleButton = styled(Button)({
   marginTop: '24px',
   textTransform: 'none',
   fontWeight: 500,
   fontSize: '16px',
   color: '#444',
   border: '1px solid #ddd',
   backgroundColor: '#fff',
   height: '50px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '10px',
   '&:hover': {
      backgroundColor: '#f5f5f5',
   },
})

const StyledLink = styled(Link)({
   color: '#0057FF',
   fontWeight: 500,
   textDecoration: 'none',
   marginLeft: '6px',
   fontSize: '16px',
   '&:hover': {
      textDecoration: 'underline',
   },
})

const TextLink = styled(Typography)({
   marginTop: '20px',
   fontSize: '16px',
   textAlign: 'center',
})

const ForgotPasswordLink = styled(Link)({
   marginTop: '16px',
   fontSize: '15px',
   textAlign: 'center',
   display: 'block',
   color: '#3B0DCD',
   textDecoration: 'none',
   '&:hover': {
      textDecoration: 'underline',
   },
})

const StyledAlert = styled(Alert)({
   fontSize: '16px',
   marginTop: '12px',
})

const StyledLoader = styled(CircularProgress)({
   color: 'white',
})

const GoogleIconStyled = styled(GoogleIcon)({
   fontSize: '22px',
   marginRight: '6px',
})

const StyledInput = styled(Input)({
   '& input': {
      height: '52px',
      padding: '0 16px',
      fontSize: '16px',
   },
})
