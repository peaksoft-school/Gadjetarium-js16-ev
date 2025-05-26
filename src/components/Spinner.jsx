import { styled, keyframes } from '@mui/material/styles'

const yinYang = keyframes`
  100% {
    transform: rotate(-360deg);
  }

`

const Spinner = () => {
   return (
      <div
         style={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <StyledSpinner>
            <div className="dot-top" />
            <div className="dot-bottom" />
         </StyledSpinner>
      </div>
   )
}

const StyledSpinner = styled('div')({
   width: '96px',
   height: '96px',
   borderRadius: '50%',
   background: 'conic-gradient(#080808 0deg 180deg, #f2e707 180deg 360deg)',
   position: 'relative',
   animation: `${yinYang} 3s linear infinite`,

   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '48px',
      height: '48px',
      backgroundColor: '#080808',
      borderRadius: '50%',
   },

   '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '48px',
      height: '48px',
      backgroundColor: '#f2e707',
      borderRadius: '50%',
   },

   '& .dot-top': {
      position: 'absolute',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '12px',
      height: '12px',
      backgroundColor: '#f2e707',
      borderRadius: '50%',
      zIndex: 1,
   },

   '& .dot-bottom': {
      position: 'absolute',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '12px',
      height: '12px',
      backgroundColor: '#080808',
      borderRadius: '50%',
      zIndex: 1,
   },
})
