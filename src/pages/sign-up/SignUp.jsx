import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container, Paper } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'

const Registration = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [phone, setPhone] = useState('+996')
   const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
   })
   const [isSubmitting, setIsSubmitting] = useState(false)

   const validate = (values) => {
      const newErrors = {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
         confirmPassword: '',
      }

      let isValid = true

      if (!values.firstName.trim()) {
         newErrors.firstName = 'Имя обязательно'
         isValid = false
      }

      if (!values.lastName.trim()) {
         newErrors.lastName = 'Фамилия обязательна'
         isValid = false
      }

      if (!values.email) {
         newErrors.email = 'Email обязателен'
         isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
         newErrors.email = 'Некорректный email'
         isValid = false
      }

      if (!values.password) {
         newErrors.password = 'Пароль обязателен'
         isValid = false
      } else if (values.password.length < 8) {
         newErrors.password = 'Пароль должен быть не менее 8 символов'
         isValid = false
      }

      if (values.password !== values.confirmPassword) {
         newErrors.confirmPassword = 'Пароли должны совпадать'
         isValid = false
      }

      setErrors(newErrors)
      return isValid
   }

   const handleSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true)

      const formData = new FormData(event.currentTarget)

      const values = {
         firstName: formData.get('firstName'),
         lastName: formData.get('lastName'),
         email: formData.get('email'),
         password: formData.get('password'),
         confirmPassword: formData.get('confirmPassword'),
      }

      if (validate(values)) {
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
         }
      } else {
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
            <StyledForm onSubmit={handleSubmit} noValidate>
               <Input
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
               />

               <Input
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
               />

               <Input
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Телефон"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                     maxLength: 13,
                  }}
               />

               <Input
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
               />

               <Input
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
               />

               <Input
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Подтвердите пароль"
                  type="password"
                  id="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
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
