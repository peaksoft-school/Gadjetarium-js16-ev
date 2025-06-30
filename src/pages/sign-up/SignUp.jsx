import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import { registrationSchema } from '../../utils/helpers/validation'

const SignUp = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [phone, setPhone] = useState('+996')
   const [isSubmitting, setIsSubmitting] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(registrationSchema),
   })

   const onSubmit = async (values) => {
      setIsSubmitting(true)

      const requestData = {
         firstName: values.firstName,
         lastName: values.lastName,
         email: values.email,
         password: values.password,
         phoneNumber: phone,
      }

      try {
         await dispatch(
            AUTH_THUNK.signUp({
               values: requestData,
               navigate,
               setSubmitting: setIsSubmitting,
            })
         )
      } catch (error) {
         console.error('Registration error:', error)
         setIsSubmitting(false)
      }
   }

   const handlePhoneChange = (e) => {
      const value = e.target.value
      if (value.startsWith('+996') && value.length <= 13) {
         setPhone(value)
      }
   }

   const handleGoBack = () => navigate('/')

   return (
      <StyledWrapper>
         <StyledContainer component="main">
            <StyledPaper elevation={3}>
               <CloseButton onClick={() => handleGoBack()}>×</CloseButton>

               <StyledTitle component="h1" variant="h5">
                  Регистрация
               </StyledTitle>

               <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Input
                     fullWidth
                     label="Напишите ваше имя"
                     {...register('firstName')}
                     error={!!errors.firstName}
                     helperText={errors.firstName?.message}
                  />

                  <Input
                     fullWidth
                     label="Напишите вашу фамилию"
                     {...register('lastName')}
                     error={!!errors.lastName}
                     helperText={errors.lastName?.message}
                  />

                  <Input
                     fullWidth
                     label="Телефон"
                     name="phone"
                     value={phone}
                     onChange={handlePhoneChange}
                     inputProps={{ maxLength: 13 }}
                  />

                  <Input
                     fullWidth
                     label="Напишите email"
                     {...register('email')}
                     error={!!errors.email}
                     helperText={errors.email?.message}
                  />

                  <Input
                     fullWidth
                     label="Напишите пароль"
                     type="password"
                     showToggle
                     {...register('password')}
                     error={!!errors.password}
                     helperText={errors.password?.message}
                  />

                  <Input
                     fullWidth
                     label="Подтвердите пароль"
                     type="password"
                     showToggle
                     {...register('confirmPassword')}
                     error={!!errors.confirmPassword}
                     helperText={errors.confirmPassword?.message}
                  />

                  <StyledButton type="submit" fullWidth disabled={isSubmitting}>
                     {isSubmitting ? 'Обработка...' : 'Создать аккаунт'}
                  </StyledButton>

                  <StyledLinkBox>
                     <StyledText>
                        У вас уже есть аккаунт?
                        <Link href="/sign-in">Войти</Link>
                     </StyledText>
                  </StyledLinkBox>
               </StyledForm>
            </StyledPaper>
         </StyledContainer>
      </StyledWrapper>
   )
}

export default SignUp

const StyledWrapper = styled(Box)({
   background: 'linear-gradient(135deg, #D3138A 0%, #3B0DCD 100%)',
   minHeight: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '20px',
})

const StyledContainer = styled(Container)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
})

const StyledPaper = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(4),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   width: '100%',
   maxWidth: '500px',
   borderRadius: '16px',
   boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
   position: 'relative',
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   fontSize: '24px',
   fontWeight: 600,
}))

const StyledForm = styled('form')(({ theme }) => ({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: theme.spacing(2),
   marginTop: theme.spacing(2),
}))

const StyledButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(3),
   backgroundColor: '#D3138A',
   fontWeight: 500,
   fontSize: '16px',
   '&:hover': {
      backgroundColor: '#b50f74',
   },
   textTransform: 'none',
   height: '48px',
}))

const StyledLinkBox = styled(Box)(({ theme }) => ({
   textAlign: 'center',
   marginTop: theme.spacing(2),
   '& a': {
      color: '#3B0DCD',
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
         textDecoration: 'underline',
      },
   },
}))

const StyledText = styled(Typography)({
   fontSize: '14px',
   color: 'black',
   display: 'flex',
   gap: '5px',
   justifyContent: 'center',
})

const CloseButton = styled('div')({
   position: 'absolute',
   top: '12px',
   right: '16px',
   fontSize: '28px',
   fontWeight: 'bold',
   cursor: 'pointer',
   color: '#999',
   '&:hover': {
      color: '#000',
   },
})
