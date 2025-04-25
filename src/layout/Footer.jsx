import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container } from '@mui/material'
import SubscribeForm from './SubscribeForm'

const Footer = () => (
   <FooterContainer>
      <TopSection>
         <StyledContainer>
            <Column>
               <SectionTitle>Каталог</SectionTitle>
               <StyledLink href="#">Смартфоны</StyledLink>
               <StyledLink href="#">Ноутбуки и планшеты</StyledLink>
               <StyledLink href="#">Смарт-часы и браслеты</StyledLink>
               <StyledLink href="#">Аксессуары</StyledLink>
            </Column>

            <Column>
               <SectionTitle>Будь с нами</SectionTitle>
               <StyledLink href="#">Акции</StyledLink>
               <StyledLink href="#">Новинки</StyledLink>
               <StyledLink href="#">Популярные категории</StyledLink>
            </Column>

            <Column>
               <SectionTitle>Помощь и сервисы</SectionTitle>
               <StyledLink href="#">О магазине</StyledLink>
               <StyledLink href="#">Доставка</StyledLink>
               <StyledLink href="#">FAQ</StyledLink>
               <StyledLink href="#">Контакты</StyledLink>
            </Column>
         </StyledContainer>

         <SubscribeColumn>
            <SectionTitle>Расскажем об акциях и скидках</SectionTitle>

            <SubscribeForm />

            <Caption>
               Нажимая на кнопку «подписаться» Вы соглашаетесь <br /> на обработку персональных данных
            </Caption>

            <InfoWrapper>
               <InfoRow>+996 (501) 46 99 44</InfoRow>
               <InfoRow>Gadgetarium.kg</InfoRow>
               <InfoRow>г.Бишкек, ул. Гражданская 119</InfoRow>
               <InfoRow>С 10:00 до 21:00 (без выходных)</InfoRow>
            </InfoWrapper>
         </SubscribeColumn>
      </TopSection>

      <BottomSection>
         <Logo>
            <Gadgetarium>G</Gadgetarium>adgetarium
         </Logo>
         <Caption>© 2022 Gadgetarium. Интернет магазин</Caption>
         <Caption>Все права защищены.</Caption>
      </BottomSection>
   </FooterContainer>
)

export default Footer

// Стили

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
   justifyContent: 'space-between',
   marginBottom: '40px',
   flexWrap: 'wrap',
   gap: '40px',
})

const StyledContainer = styled(Container)({
   display: 'flex',
   gap: '90px',
   padding: 0,
   margin: 0,
   maxWidth: 'none',
   flexWrap: 'wrap',
})

const Column = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   minWidth: '180px',
})

const SubscribeColumn = styled(Column)({
   maxWidth: '320px',
})

const SectionTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '16px',
   marginBottom: '12px',
})

const StyledLink = styled(Link)({
   color: 'grey',
   fontSize: '16px',
   textDecoration: 'none',
   '&:hover': {
      color: 'white',
   },
})

const Caption = styled(Typography)({
   fontSize: '12px',
   color: '#bbb',
   marginTop: '8px',
   lineHeight: 1.4,
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
   gap: '8px',
   color: '#BBB',
   fontSize: '14px',
})

const BottomSection = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   marginTop: '50px',
   paddingTop: '50px',
   borderTop: '1px solid #2A2A3B',
})

const Logo = styled('span')({
   fontSize: '24px',
   fontWeight: 'bold',
   color: '#fff',
   display: 'flex',
   alignItems: 'center',
   gap: '2px',
   cursor: 'pointer',
})

const Gadgetarium = styled('span')({
   backgroundColor: '#E11383',
   borderRadius: '4px',
   padding: '2px 6px',
   fontSize: '22px',
})
