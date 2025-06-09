import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router'
import { styled } from '@mui/material/styles'
import { Typography, Paper } from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import { resetPasswordSchema } from '../../utils/helpers/validation'

const ResetPassword = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [searchParams] = useSearchParams()
   const token = searchParams.get('token')

   const { isLoading, error, resetPasswordSuccess } = useSelector(
      (state) => state.auth
   )
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [errors, setErrors] = useState({ password: '', confirmPassword: '' })

   const validate = async () => {
      try {
         await resetPasswordSchema.validate(
            { password, confirmPassword },
            { abortEarly: false }
         )
         setErrors({ password: '', confirmPassword: '' })
         return true
      } catch (validationError) {
         const newErrors = { password: '', confirmPassword: '' }
         validationError.inner.forEach((err) => {
            if (err.path in newErrors) {
               newErrors[err.path] = err.message
            }
         })
         setErrors(newErrors)
         return false
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const isValid = await validate()
      if (isValid) {
         dispatch(AUTH_THUNK.resetPassword({ token, password, navigate }))
      }
   }

   if (!token) {
      return (
         <CenteredContainer>
            <StyledPaper elevation={3}>
               <Typography color="error" align="center">
                  Токен недействителен или отсутствует
               </Typography>
            </StyledPaper>
         </CenteredContainer>
      )
   }

   return (
      <CenteredContainer>
         <StyledPaper elevation={3}>
            <Title variant="h5" component="h1">
               Сброс пароля
            </Title>

            {resetPasswordSuccess ? (
               <CenteredBox>
                  <Typography variant="body1">
                     Пароль успешно изменен
                  </Typography>
                  <StyledButton
                     fullWidth
                     variant="contained"
                     onClick={() => navigate('/sign-in')}
                  >
                     Войти с новым паролем
                  </StyledButton>
               </CenteredBox>
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
                     autoComplete="new-password"
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
                     autoComplete="new-password"
                  />

                  {error && <ErrorText color="error">{error}</ErrorText>}

                  <StyledButton
                     type="submit"
                     fullWidth
                     variant="contained"
                     disabled={isLoading}
                  >
                     {isLoading ? 'Сохранение...' : 'Сохранить новый пароль'}
                  </StyledButton>
               </StyledForm>
            )}
         </StyledPaper>
      </CenteredContainer>
   )
}

export default ResetPassword

const CenteredContainer = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   minHeight: '100vh',
   padding: theme.spacing(2),
   backgroundColor: '#f5f5f5',
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
   textAlign: 'center',
}))

const StyledForm = styled('form')(({ theme }) => ({
   width: '100%',
   marginTop: theme.spacing(1),
}))

const StyledButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(2),
}))

const CenteredBox = styled('div')(({ theme }) => ({
   marginTop: theme.spacing(3),
   textAlign: 'center',
   width: '100%',
}))

const ErrorText = styled(Typography)(({ theme }) => ({
   marginTop: theme.spacing(1),
}))
