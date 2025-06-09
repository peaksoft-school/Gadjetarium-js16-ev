import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { styled } from '@mui/material/styles'
import {
   Box as MuiBox,
   Typography as MuiTypography,
   Link as MuiLink,
   Container,
   Paper as MuiPaper,
} from '@mui/material'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { resetForgotPasswordState } from '../../store/authSlice/authSlice'
import { AUTH_THUNK } from '../../store/authSlice/authThunk'
import { forgotPasswordSchema } from '../../utils/helpers/validation'

const ForgotPassword = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading, error, forgotPasswordSuccess } = useSelector(
      (state) => state.auth
   )

   const [email, setEmail] = useState('')
   const [errors, setErrors] = useState({ email: '' })

   const validate = async () => {
      try {
         await forgotPasswordSchema.validate({ email }, { abortEarly: false })
         setErrors({ email: '' })
         return true
      } catch (validationError) {
         const newErrors = { email: '' }
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
         dispatch(AUTH_THUNK.forgotPassword({ email, navigate }))
      }
   }

   return (
      <Container component="main" maxWidth="xs">
         <StyledPaper elevation={3}>
            <StyledTitle component="h1" variant="h5">
               Восстановление пароля
            </StyledTitle>

            {forgotPasswordSuccess ? (
               <SuccessBox>
                  <StyledBody1>
                     Инструкции по восстановлению пароля отправлены на {email}
                  </StyledBody1>
                  <StyledButton
                     fullWidth
                     variant="contained"
                     onClick={() => navigate('/sign-in')}
                  >
                     Вернуться к входу
                  </StyledButton>
               </SuccessBox>
            ) : (
               <StyledForm onSubmit={handleSubmit}>
                  <StyledBody2>
                     Введите email, указанный при регистрации
                  </StyledBody2>

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

                  {error && <ErrorText>{error}</ErrorText>}

                  <StyledButton
                     type="submit"
                     fullWidth
                     variant="contained"
                     disabled={isLoading}
                  >
                     {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                  </StyledButton>

                  <StyledLink
                     href="/sign-in"
                     variant="body2"
                     onClick={() => dispatch(resetForgotPasswordState())}
                  >
                     Вспомнили пароль? Войти
                  </StyledLink>
               </StyledForm>
            )}
         </StyledPaper>
      </Container>
   )
}

export default ForgotPassword

const StyledPaper = styled(MuiPaper)(({ theme }) => ({
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

const StyledTitle = styled(MuiTypography)({
   textAlign: 'center',
})

const SuccessBox = styled(MuiBox)(({ theme }) => ({
   marginTop: theme.spacing(3),
   textAlign: 'center',
}))

const ErrorText = styled(MuiTypography)(({ theme }) => ({
   color: theme.palette.error.main,
   marginTop: theme.spacing(1),
}))

const StyledButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(3),
   marginBottom: theme.spacing(2),
}))

const StyledLink = styled(MuiLink)(({ theme }) => ({
   display: 'block',
   textAlign: 'center',
}))

const StyledBody1 = styled(MuiTypography)(({ theme }) => ({
   fontSize: '16px',
   lineHeight: '24px',
   color: theme.palette.text.primary,
}))

const StyledBody2 = styled(MuiTypography)(({ theme }) => ({
   fontSize: '14px',
   lineHeight: '20px',
   color: theme.palette.text.secondary,
}))
