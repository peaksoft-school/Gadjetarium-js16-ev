import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'

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
   } = useForm()

   const password = watch('password')

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
      <Container component="main" maxWidth="xs">
         <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5">
               Регистрация
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
               <Input
                  margin="normal"
                  fullWidth
                  label="Имя"
                  {...register('firstName', { required: 'Имя обязательно' })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
               />

               <Input
                  margin="normal"
                  fullWidth
                  label="Фамилия"
                  {...register('lastName', { required: 'Фамилия обязательна' })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
               />

               <Input
                  margin="normal"
                  fullWidth
                  label="Телефон"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputProps={{ maxLength: 13 }}
               />

               <Input
                  margin="normal"
                  fullWidth
                  label="Email"
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

               <Input
                  margin="normal"
                  fullWidth
                  label="Пароль"
                  type="password"
                  {...register('password', {
                     required: 'Пароль обязателен',
                     minLength: {
                        value: 8,
                        message: 'Пароль должен быть не менее 8 символов',
                     },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
               />

               <Input
                  margin="normal"
                  fullWidth
                  label="Подтвердите пароль"
                  type="password"
                  {...register('confirmPassword', {
                     required: 'Подтвердите пароль',
                     validate: (value) =>
                        value === password || 'Пароли должны совпадать',
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
               />

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? 'Обработка...' : 'Создать аккаунт'}
               </Button>

               <Box textAlign="center" mt={2}>
                  <Link href="/sign-in" variant="body2">
                     У вас уже есть аккаунт? Войти
                  </Link>
               </Box>
            </StyledForm>
         </StyledPaper>
      </Container>
   )
}

export default Registration

const StyledPaper = styled(Paper)(({ theme }) => ({
   marginTop: theme.spacing(8),
   padding: theme.spacing(4),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

const StyledForm = styled('form')(({ theme }) => ({
   width: '100%',
   marginTop: theme.spacing(2),
}))
