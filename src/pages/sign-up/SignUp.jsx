import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles'
import { Typography, Link, Box, Container, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import { registrationSchema } from '../../utils/helpers/validation'

const Registration = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [phone, setPhone] = useState('+996')
   const [isSubmitting, setIsSubmitting] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm({
      resolver: yupResolver(registrationSchema),
      mode: 'onChange',
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
         ).unwrap()
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

   return (
      <CenteredContainer maxWidth="xs">
         <StyledPaper elevation={3}>
            <Title variant="h5" component="h1">
               Регистрация
            </Title>

            <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
               <Input
                  fullWidth
                  label="Имя"
                  {...register('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
               />

               <Input
                  fullWidth
                  label="Фамилия"
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
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
               />

               <Input
                  fullWidth
                  label="Пароль"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
               />

               <Input
                  fullWidth
                  label="Подтвердите пароль"
                  type="password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
               />

               <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? 'Обработка...' : 'Создать аккаунт'}
               </StyledButton>

               <Box textAlign="center" mt={2}>
                  <Link href="/sign-in" variant="body2">
                     У вас уже есть аккаунт? Войти
                  </Link>
               </Box>
            </StyledForm>
         </StyledPaper>
      </CenteredContainer>
   )
}

export default Registration

const CenteredContainer = styled(Container)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '100vh',
   backgroundColor: '#f7f7f7',
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
   padding: theme.spacing(4),
   maxWidth: 400,
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   boxShadow: theme.shadows[3],
}))

const Title = styled(Typography)(({ theme }) => ({
   marginBottom: theme.spacing(2),
}))

const StyledForm = styled('form')(({ theme }) => ({
   width: '100%',
   marginTop: theme.spacing(1),
}))

const StyledButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(3),
}))
