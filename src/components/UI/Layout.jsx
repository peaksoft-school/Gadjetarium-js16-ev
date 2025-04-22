import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Icons } from '../../assets/icons'

export default function Layout() {
   return (
      <Wrapper>
         <Card>
            <img
               src={Icons.diary}
               alt="Официальный дистрибьютер"
               style={imgStyle}
            />
            <Text1 align="center">Официальный дистрибьютер</Text1>
         </Card>
         <Card>
            <img
               src={Icons.repair}
               alt="Гарантийное обслуживание"
               style={imgStyle}
            />
            <Text2 align="center">Гарантийное обслуживание</Text2>
         </Card>
         <Card>
            <img
               src={Icons.cardPay}
               alt="Оплата любым удобным способом"
               style={imgStyle}
            />
            <Text3 align="center">Оплата любым удобным способом</Text3>
         </Card>
         <Card>
            <img src={Icons.handshake} alt="Оптовые продажи" style={imgStyle} />
            <Text4 align="center">Оптовые продажи</Text4>
         </Card>
         <Card>
            <img
               src={Icons.delivery}
               alt="Доставка в любой регион Кыргызстана"
               style={imgStyle}
            />
            <Text5 align="center">Доставка в любой регион Кыргызстана</Text5>
         </Card>
      </Wrapper>
   )
}

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

const Text1 = styled(Typography)({
   width: '114px',
   height: '42px',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
})
const Text2 = styled(Typography)({
   width: '115px',
   height: '42px',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
})
const Text3 = styled(Typography)({
   width: '153px',
   height: '42px',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
})
const Text4 = styled(Typography)({
   width: '71px',
   height: '44px',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
})
const Text5 = styled(Typography)({
   width: '164px',
   height: '42px',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '130%',
})
