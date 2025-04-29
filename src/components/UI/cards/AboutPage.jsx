import {
   Box,
   Container,
   Typography,
   styled,
   List,
   ListItem,
   ListItemText,
} from '@mui/material'

const AboutPage = () => {
   return (
      <Root>
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
               scelerisque elit fermentum nullam moncua adipiscing. Sem tortor
               molestie odio. Adipiscing etiam vitae in sempre sed eget nec
               aliquet aliquam. Menti integer quis tirodium vitae penatibus.
               Feugiat quis tirodium volutpat scelerisque elit fermentum nullam
               moncua adipiscing. Sem tortor molestie odio. In semper sed eget
               nec aliquet aliquam. Menti integer quis tirodium vitae penatibus.
               Feugiat quis tirodium volutpat scelerisque elit fermentum nullam
               moncua adipiscing. Sem tortor molestie odio.
               <br />
               <br />
               Non ultricies sollicitudin mis galagus. Menti integer quis
               tirodium vitae paratibus. Feugiat quis tirodium volutpat
               scelerisque elit fermentum nullam moncua adipiscing. Sem tortor
               molestie odio. Adipiscing etiam vitae in sempre sed eget nec
               aliquet aliquam. Menti integer quis tirodium vitae penatibus.
               Feugiat quis tirodium volutpat scelerisque elit fermentum nullam
               moncua adipiscing. Sem tortor molestie odio.
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
                     Amet amet est orci volutpat placerat maecenas egestas augue
                     ac. Tortor, sed magnis interdum massa. Id phasellus lectus
                     dui nisl. Adipiscing etiam vitae in semper sed eget nec
                     aliquet aliquam.
                     <br />
                     <br />
                     Non ultricies sollicitudin nisi quisque. Morbi integer quis
                     tincidunt vitae penatibus. Feugiat quis tincidunt volutpat
                     scelerisque elit fermentum nullam rhoncus adipiscing. Sem
                     tortor molestie odio. Adipiscing etiam vitae in semper sed
                     eget nec aliquet aliquam. Morbi integer quis tincidunt
                     vitae penatibus. Feugiat quis tincidunt volutpat
                     scelerisque elit fermentum nullam rhoncus adipiscing. Sem
                     tortor molestie odio.
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
   )
}

export default AboutPage

const Root = styled(Container)(({ theme }) => ({
   width: '100vw',
   padding: theme.spacing(4, 2),
}))

const Section = styled(Box)(({ theme }) => ({
   marginBottom: '50px',
}))

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

const ImageWrapper = styled(Box)(({ theme }) => ({
   width: 'auto',
}))

const MapImage = styled('img')(({ theme }) => ({
   width: '700px',
   height: '300px',
}))

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
