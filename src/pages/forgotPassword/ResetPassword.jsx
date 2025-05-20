import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router'
import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Paper } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'

const ResetPassword = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [searchParams] = useSearchParams()
   const token = searchParams.get('token')
   
   const { isLoading, error, resetPasswordSuccess } = useSelector(state => state.auth)
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [errors, setErrors] = useState({
      password: '',
      confirmPassword: '',
   })

   const validate = () => {
      const newErrors = {
         password: '',
         confirmPassword: '',
      }
      let isValid = true

      if (!password) {
         newErrors.password = 'Пароль обязателен'
         isValid = false
      } else if (password.length < 8) {
         newErrors.password = 'Пароль должен быть не менее 8 символов'
         isValid = false
      }

      if (password !== confirmPassword) {
         newErrors.confirmPassword = 'Пароли должны совпадать'
         isValid = false
      }

      setErrors(newErrors)
      return isValid
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      
      if (validate()) {
         dispatch(AUTH_THUNK.resetPassword({ 
            token, 
            password,
            navigate 
         }))
      }
   }

   return (
      <Container component="main" maxWidth="xs">
         <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5" align="center">
               Сброс пароля
            </Typography>

            {resetPasswordSuccess ? (
               <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body1">
                     Пароль успешно изменен
                  </Typography>
                  <Button
                     fullWidth
                     variant="contained"
                     onClick={() => navigate('/sign-in')}
                     sx={{ mt: 3 }}
                  >
                     Войти с новым паролем
                  </Button>
               </Box>
            ) : (
               <StyledForm onSubmit={handleSubmit}>
                  <Input
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Новый пароль"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
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
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     error={!!errors.confirmPassword}
                     helperText={errors.confirmPassword}
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
                     {isLoading ? 'Сохранение...' : 'Сохранить новый пароль'}
                  </Button>
               </StyledForm>
            )}
         </StyledPaper>
      </Container>
   )
}

export default ResetPassword

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