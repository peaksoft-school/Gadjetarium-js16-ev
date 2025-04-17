import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Divider, Container } from '@mui/material'
import SubscribeForm from './SubscribeForm'

const Footer = () => {
   return (
      <FooterContainer>
         <TopSection>
            <StyledContainer>
               <Column>
                  <StyledTypography fontWeight={600}>Каталог</StyledTypography>
                  <StyledLink color="inherit" underline="none" href="#">
                     Смартфоны
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Ноутбуки и планшеты
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Смарт-часы и браслеты
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Аксессуары
                  </StyledLink>
               </Column>

               <Column>
                  <StyledTypography fontWeight={600}>
                     Будь с нами
                  </StyledTypography>
                  <StyledLink color="inherit" underline="none" href="#">
                     Акции
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Новинки
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Популярные категории
                  </StyledLink>
               </Column>

               <Column>
                  <StyledTypography fontWeight={600}>
                     Помощь и сервисы
                  </StyledTypography>
                  <StyledLink color="inherit" underline="none" href="#">
                     О магазине
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Доставка
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     FAQ
                  </StyledLink>
                  <StyledLink color="inherit" underline="none" href="#">
                     Контакты
                  </StyledLink>
               </Column>
            </StyledContainer>
            <Column>
               <Typography fontWeight={600}>
                  Расскажем об акциях и скидках
               </Typography>

               <SubscribeForm />

               <Typography variant="caption" color="#bbb">
                  Нажимая на кнопку «подписаться» Вы соглашаетесь <br /> на
                  обработку персональных данных
               </Typography>

               <Box
                  sx={{
                     mt: 2,
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 1,
                  }}
               >
                  <InfoRow>+996 (501) 46 99 44</InfoRow>
                  <InfoRow>Gadgetarium.kg</InfoRow>
                  <InfoRow>г.Бишкек, ул. Гражданская 119</InfoRow>
                  <InfoRow>С 10:00 до 21:00 (без выходных)</InfoRow>
               </Box>
            </Column>
         </TopSection>

         <BottomSection>
            <Logo>
               <G>G</G>adgetarium
            </Logo>
            <Typography variant="caption" sx={{ color: '#bbb', mt: 1 }}>
               © 2022 Gadgetarium. Интернет магазин
            </Typography>
            <Typography variant="caption" sx={{ color: '#bbb' }}>
               Все права защищены.
            </Typography>
         </BottomSection>
      </FooterContainer>
   )
}

export default Footer

const FooterContainer = styled(Box)({
   backgroundColor: '#0B0B1F',
   color: '#FFFFFF',
   padding: '60px 80px 20px',
   display: 'flex',
   flexDirection: 'column',
   height: '600px',
   
})

const TopSection = styled(Box)({
   display: 'flex',
   marginBottom: '40px',
})

const Column = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 12,
})

const InfoRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 8,
   color: '#BBB',
   fontSize: 14,
})

const BottomSection = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   marginTop: 50,
   paddingTop: 50,
   borderTop: '1px solid #2A2A3B',
})

const Logo = styled('span')({
   fontSize: 24,
   fontWeight: 'bold',
   color: '#fff',
   display: 'flex',
   alignItems: 'center',
   gap: 2,
   cursor: 'pointer',
})

const G = styled('span')({
   backgroundColor: '#E11383',
   borderRadius: 4,
   padding: '2px 6px',
   fontSize: 22,
})
const StyledLink = styled(Link)({
   color: 'grey',
   fontSize: '16px',

   '&:hover': {
      color: 'white',
   },
})

const StyledTypography = styled(Typography)({
   fontSize: '16px',
   marginBottom: '12px',
})

const StyledContainer = styled(Container)({
   display: 'flex',
   gap: '90px',
})
