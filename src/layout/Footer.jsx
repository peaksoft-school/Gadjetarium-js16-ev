import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container } from '@mui/material'
import SubscribeForm from '../components/SubscribeForm'

const Footer = () => (
   <BigContainer>
      <FooterContainer>
         <TopSection>
            <StyledContainer>
               <Column>
                  <StyledTypography fontWeight={600}>Каталог</StyledTypography>
                  <StyledLink href="#">Смартфоны</StyledLink>
                  <StyledLink href="#">Ноутбуки и планшеты</StyledLink>
                  <StyledLink href="#">Смарт-часы и браслеты</StyledLink>
                  <StyledLink href="#">Аксессуары</StyledLink>
               </Column>

               <Column>
                  <StyledTypography fontWeight={600}>
                     Будь с нами
                  </StyledTypography>
                  <StyledLink href="#">Акции</StyledLink>
                  <StyledLink href="#">Новинки</StyledLink>
                  <StyledLink href="#">Популярные категории</StyledLink>
               </Column>

               <Column>
                  <StyledTypography fontWeight={600}>
                     Помощь и сервисы
                  </StyledTypography>
                  <StyledLink href="#">О магазине</StyledLink>
                  <StyledLink href="#">Доставка</StyledLink>
                  <StyledLink href="#">FAQ</StyledLink>
                  <StyledLink href="#">Контакты</StyledLink>
               </Column>
            </StyledContainer>

            <Column>
               <StyledTypography fontWeight={600}>
                  Расскажем об акциях и скидках
               </StyledTypography>

               <SubscribeForm />

               <Caption>
                  Нажимая на кнопку «подписаться» Вы соглашаетесь <br /> на
                  обработку персональных данных
               </Caption>

               <InfoWrapper>
                  <InfoRow>+996 (501) 46 99 44</InfoRow>
                  <InfoRow>Gadgetarium.kg</InfoRow>
                  <InfoRow>г.Бишкек, ул. Гражданская 119</InfoRow>
                  <InfoRow>С 10:00 до 21:00 (без выходных)</InfoRow>
               </InfoWrapper>
            </Column>
         </TopSection>

         <BottomSection>
            <Logo>
               <Gadgetarium>G</Gadgetarium>adgetarium
            </Logo>
            <Caption>© 2022 Gadgetarium. Интернет магазин</Caption>
            <Caption>Все права защищены.</Caption>
         </BottomSection>
      </FooterContainer>
   </BigContainer>
)

export default Footer

const BigContainer = styled(Box)({
   width: '100vv',
   height: '100vh',
})

const FooterContainer = styled(Box)({
   backgroundColor: '#0B0B1F',
   color: '#FFFFFF',
   padding: '60px 80px 20px',
   display: 'flex',
   flexDirection: 'column',
   height: '600px',
   width:'100%'
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

const InfoWrapper = styled(Box)({
   marginTop: '16px',
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
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

const Gadgetarium = styled('span')({
   backgroundColor: '#E11383',
   borderRadius: 4,
   padding: '2px 6px',
   fontSize: 22,
})

const StyledLink = styled(Link)({
   color: 'grey',
   fontSize: '16px',
   textDecoration: 'none',
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

const Caption = styled(Typography)({
   fontSize: '12px',
   color: '#bbb',
   marginTop: '8px',
})
