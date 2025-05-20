import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container, Paper } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { resetForgotPasswordState } from '../../store/authSlice/authSlice'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'

const ForgotPassword = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading, error, forgotPasswordSuccess } = useSelector(
      (state) => state.auth
   )
   const [email, setEmail] = useState('')
   const [errors, setErrors] = useState({ email: '' })

   const validate = () => {
      const newErrors = { email: '' }
      let isValid = true

      if (!email) {
         newErrors.email = 'Email обязателен'
         isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         newErrors.email = 'Некорректный email'
         isValid = false
      }

      setErrors(newErrors)
      return isValid
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      if (validate()) {
         dispatch(AUTH_THUNK.forgotPassword({ email, navigate }))
      }
   }

   return (
      <Container component="main" maxWidth="xs">
         <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5" align="center">
               Восстановление пароля
            </Typography>

            {forgotPasswordSuccess ? (
               <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body1">
                     Инструкции по восстановлению пароля отправлены на {email}
                  </Typography>
                  <Button
                     fullWidth
                     variant="contained"
                     onClick={() => navigate('/login')}
                     sx={{ mt: 3 }}
                  >
                     Вернуться к входу
                  </Button>
               </Box>
            ) : (
               <StyledForm onSubmit={handleSubmit}>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                     Введите email, указанный при регистрации
                  </Typography>

                  <Input
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email"
                     name="email"
                     autoComplete="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     error={!!errors.email}
                     helperText={errors.email}
                  />

                  {error && (
                     <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                     </Typography>
                  )}

                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     disabled={isLoading}
                     sx={{ mt: 3, mb: 2 }}
                  >
                     {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                  </Button>

                  <Box textAlign="center">
                     <Link
                        href="/login"
                        variant="body2"
                        onClick={() => dispatch(resetForgotPasswordState())}
                     >
                        Вспомнили пароль? Войти
                     </Link>
                  </Box>
               </StyledForm>
            )}
         </StyledPaper>
      </Container>
   )
}

export default ForgotPassword

const StyledPaper = styled(Paper)(({ theme }) => ({
   marginTop: theme.spacing(8),
   padding: theme.spacing(3),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

const StyledForm = styled('form')(({ theme }) => ({
   width: '100%',
   marginTop: theme.spacing(1),
}))
