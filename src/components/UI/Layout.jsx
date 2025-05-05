import { Box, Typography, styled } from '@mui/material'
import { layoutData } from '../../utils/constants'

const Layout = () => (
   <Wrapper>
      {layoutData.map(({ text, icon }, i) => (
         <Card key={i}>
            <img src={icon} alt={text} style={imgStyle} />

            <Text align="center">{text}</Text>
         </Card>
      ))}
   </Wrapper>
)

export default Layout

const Wrapper = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
   gap: '40px',
   marginTop: '30px',
})

const Card = styled(Box)({
   backgroundColor: '#ffffff',
   borderRadius: '4px',
   paddingBottom: '40px',
   paddingTop: '30px',
   width: '222px',
   height: '192px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
})

const imgStyle = {
   width: '70px',
   height: '70px',
}

const Text = styled(Typography)({
   fontWeight: 400,
   fontSize: '16px',
   lineHeight: '130%',
   textAlign: 'center',
})
