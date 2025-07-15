import { styled, keyframes } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Icons } from '../assets/icons' // замени на путь к своей SVG или PNG

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = () => {
   return (
      <Wrapper>
         <PhoneContainer>
            <RotatingCircle>
               <PhoneImage src={Icons.phone} alt="spinning phone" />
            </RotatingCircle>
         </PhoneContainer>
      </Wrapper>
   )
}

export default Spinner

const Wrapper = styled(Box)({
   width: '100vw',
   height: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
})

const PhoneContainer = styled(Box)({
   width: 140,
   height: 140,
   borderRadius: '50%',
   background: '#fefefe',
   boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
})

const RotatingCircle = styled(Box)(({ theme }) => ({
   width: 100,
   height: 100,
   borderRadius: '50%',
   border: '3px solid #222',
   background: 'radial-gradient(circle at center, #ffffff 40%, #dcdcdc 100%)',
   animation: `${spin} 2.5s linear infinite`,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const PhoneImage = styled('img')({
   width: 48,
   height: 48,
   objectFit: 'contain',
   filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
})
