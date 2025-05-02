import {
   Box,
   Container,
   Typography,
   styled,
   List,
   ListItem,
   ListItemText,
} from '@mui/material'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'
import UserSlider from '../components/UserSlider'

const products = [
   {
      id: 1,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
   },
   {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
   },
   {
      id: 3,
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
   },
   {
      id: 4,
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620',
   },
]

const AboutPage = () => {
   return (
      <Box>
         <UserHeader />
         <StyledKingContainer>
            <StyledKingText>О магазине</StyledKingText>
            <br />
            <hr width="90%" />
         </StyledKingContainer>

         <UserSlider products={products} />

         <Root disableGutters>
            <Section>
               <StyledZagolovok1 variant="h5" gutterBottom>
                  Магазин Gadgetarium
               </StyledZagolovok1>
               <StyledTextFirst>
                  {[
                     'Слаженная команда людей, любящих спорт и здоровый образ жизни знающих свое дело и ориентирующихся во всех новых видах обследования;',
                     'Широкая номенклатура качественной продукции ведущих мировых брендов с огромным выбором товаров в наличии;',
                     'Склад запчастей для обеспечения качественного сервиса и бесперебойной работы оборудования;',
                     'Полный последовательный сервис с информационной и технической поддержкой;',
                     'Строгое соблюдение всех обязательств перед партнерами;',
                     'Отличные цены и заключенные условия для постоянных партнеров.',
                  ].map((text, index) => (
                     <ListItem key={index} disableGutters>
                        <Bullet>•</Bullet>
                        <ListItemText primary={text} />
                     </ListItem>
                  ))}
               </StyledTextFirst>
            </Section>

            <Section>
               <StyledZagolovok2 variant="h5" gutterBottom>
                  В чем причина нашего успеха?
               </StyledZagolovok2>
               <br />
               <StyledTextSecond>
                  Non ultricies sollicitudin mis galagus. Menti integer quis
                  tirodium vitae paratibus. Feugiat quis tirodium volutpat
                  scelerisque elit fermentum nullam moncua adipiscing. Sem
                  tortor molestie odio. Adipiscing etiam vitae in sempre sed
                  eget nec aliquet aliquam. Menti integer quis tirodium vitae
                  penatibus. Feugiat quis tirodium volutpat scelerisque elit
                  fermentum nullam moncua adipiscing. Sem tortor molestie odio.
                  In semper sed eget nec aliquet aliquam. Menti integer quis
                  tirodium vitae penatibus. Feugiat quis tirodium volutpat
                  scelerisque elit fermentum nullam moncua adipiscing. Sem
                  tortor molestie odio.
                  <br />
                  <br />
                  Non ultricies sollicitudin mis galagus. Menti integer quis
                  tirodium vitae paratibus. Feugiat quis tirodium volutpat
                  scelerisque elit fermentum nullam moncua adipiscing. Sem
                  tortor molestie odio. Adipiscing etiam vitae in sempre sed
                  eget nec aliquet aliquam. Menti integer quis tirodium vitae
                  penatibus. Feugiat quis tirodium volutpat scelerisque elit
                  fermentum nullam moncua adipiscing. Sem tortor molestie odio.
               </StyledTextSecond>
            </Section>

            <Section>
               <StyledZagolovok3 variant="h1" gutterBottom>
                  Мы сегодня — это:
               </StyledZagolovok3>
               <br />
               <TextImageWrapper>
                  <Box flex={1}>
                     <StyledTextThird>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Amet amet est orci volutpat placerat maecenas egestas
                        augue ac. Tortor, sed magnis interdum massa. Id
                        phasellus lectus dui nisl. Adipiscing etiam vitae in
                        semper sed eget nec aliquet aliquam.
                        <br />
                        <br />
                        Non ultricies sollicitudin nisi quisque. Morbi integer
                        quis tincidunt vitae penatibus. Feugiat quis tincidunt
                        volutpat scelerisque elit fermentum nullam rhoncus
                        adipiscing. Sem tortor molestie odio. Adipiscing etiam
                        vitae in semper sed eget nec aliquet aliquam. Morbi
                        integer quis tincidunt vitae penatibus. Feugiat quis
                        tincidunt volutpat scelerisque elit fermentum nullam
                        rhoncus adipiscing. Sem tortor molestie odio.
                     </StyledTextThird>
                  </Box>
                  <ImageWrapper>
                     <MapImage
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Kyrgyzstan_provinces_map.png"
                        alt="Карта магазинов"
                     />
                  </ImageWrapper>
               </TextImageWrapper>
            </Section>
         </Root>
         <Footer />
      </Box>
   )
}

export default AboutPage

const Root = styled(Container)({
   width: '100%',
})

const Section = styled(Box)({
   marginBottom: '50px',
})

const Bullet = styled('span')(({ theme }) => ({
   color: theme.palette.text.primary,
   marginRight: theme.spacing(1.5),
   fontSize: '1.5rem',
   lineHeight: 1,
}))

const TextImageWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   gap: theme.spacing(4),
   alignItems: 'center',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
   },
}))

const ImageWrapper = styled(Box)({
   width: 'auto',
})

const MapImage = styled('img')({
   width: '700px',
   height: '300px',
})

const StyledTextFirst = styled(List)({
   width: '1020px',
   fontSize: '16px',
   fontWeight: 400,
   lineHeight: '150%',
})

const StyledTextSecond = styled(Typography)({
   width: '1020px',
   fontSize: '18px',
   fontWeight: 400,
   lineHeight: '150%',
})

const StyledTextThird = styled(Typography)({
   width: '572px',
   fontSize: '18px',
   fontWeight: 400,
   lineHeight: '150%',
})

const StyledZagolovok1 = styled(Typography)({
   width: '220px',
   fontSize: '20px',
   fontWeight: 600,
   lineHeight: '120%',
})

const StyledZagolovok2 = styled(Typography)({
   width: '316px',
   fontSize: '20px',
   fontWeight: 600,
   lineHeight: '120%',
})

const StyledZagolovok3 = styled(Typography)({
   width: '200px',
   fontSize: '20px',
   fontWeight: 600,
   lineHeight: '120%',
})

const StyledKingText = styled(Typography)({
   width: '200',
   height: '33px',
   fontSize: '30px',
   fontWeight: 500,
   lineHeight: '110%',
})

const StyledKingContainer = styled(Box)({
   position: 'relative',
   top: '60px',
   marginLeft: '10%',
})
