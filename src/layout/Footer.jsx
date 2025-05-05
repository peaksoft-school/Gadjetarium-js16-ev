import { styled } from '@mui/material/styles'
import { Box, Typography, Link, Container } from '@mui/material'
import SubscribeForm from '../components/SubscribeForm'
import { Icons } from '../assets/icons'

const Footer = () => (
   <BigContainer>
      <FooterContainer>
         <TopSection>
            <StyledContainer>
               <Column>
                  <StyledTitle>Каталог</StyledTitle>
                  <StyledLink href="#">Смартфоны</StyledLink>
                  <StyledLink href="#">Ноутбуки и планшеты</StyledLink>
                  <StyledLink href="#">Смарт-часы и браслеты</StyledLink>
                  <StyledLink href="#">Аксессуары</StyledLink>
               </Column>

               <Column>
                  <StyledTitle>Будь с нами</StyledTitle>
                  <StyledLink href="#">Акции</StyledLink>
                  <StyledLink href="#">Новинки</StyledLink>
                  <StyledLink href="#">Популярные категории</StyledLink>
               </Column>

               <Column>
                  <StyledTitle>Помощь и сервисы</StyledTitle>
                  <StyledLink href="#">О магазине</StyledLink>
                  <StyledLink href="#">Доставка</StyledLink>
                  <StyledLink href="#">FAQ</StyledLink>
                  <StyledLink href="#">Контакты</StyledLink>
               </Column>
            </StyledContainer>

            <Column>
               <StyledTitle>Расскажем об акциях и скидках</StyledTitle>

               <SubscribeForm />

               <Caption>
                  Нажимая на кнопку «подписаться» Вы соглашаетесь <br /> на
                  обработку персональных данных
               </Caption>

               <InfoWrapper>
                  <InfoRow>
                     <img src={Icons.telefon} alt="" /> +996 (501) 46 99 44
                  </InfoRow>
                  <InfoRow>
                     <img src={Icons.gmail} alt="" />
                     Gadgetarium.kg
                  </InfoRow>
                  <InfoRow>
                     <img src={Icons.mestoPolojenie} alt="" />
                     г.Бишкек, ул. Гражданская 119
                  </InfoRow>
                  <InfoRow>
                     <img src={Icons.clock} alt="" /> 10:00 до 21:00 (без
                     выходных)
                  </InfoRow>
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
   width: '100%',
   height: '600px',
})

const FooterContainer = styled(Box)({
   backgroundColor: '#0B0B1F',
   color: '#FFFFFF',
   padding: '60px 80px 20px',
   display: 'flex',
   flexDirection: 'column',
   height: '600px',
   width: '100%',
})

const TopSection = styled(Box)({
   display: 'flex',
   marginBottom: '40px',
})

const Column = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   '& > *:not(:last-child)': {
      marginBottom: 12,
   },
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
   display: 'inline',
   transition: 'color 0.5s ease',
   '&:hover': {
      color: 'white',
   },
})

const StyledTitle = styled(Typography)(({ theme }) => ({
   fontSize: '16px',
   marginBottom: '12px',
   fontWeight: theme.typography.fontWeightBold,
}))

const StyledContainer = styled(Container)({
   display: 'flex',
   gap: '90px',
})

const Caption = styled(Typography)({
   fontSize: '12px',
   color: '#bbb',
   marginTop: '8px',
})
