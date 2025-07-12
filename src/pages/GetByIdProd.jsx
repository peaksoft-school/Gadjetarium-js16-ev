import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import PhonesSlider from '../components/PhonesSlider'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductById } from '../store/products/productThunk'
import { useParams } from 'react-router'
import { Icons } from '../assets/icons'

const ProductDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [selectedColor, setSelectedColor] = useState(null)

   const { selectedProduct, selectedLoading, selectedError } = useSelector(
      (state) => state.product
   )

   useEffect(() => {
      if (id) dispatch(fetchProductById(id))
   }, [id, dispatch])

   if (selectedLoading) return <Box p={4}>Загрузка...</Box>
   if (selectedError) return <Box p={4} color="red">{selectedError}</Box>
   if (!selectedProduct) return <Box p={4} color="red">Товар не найден</Box>

   const {
      article,
      attributes = {},
      available = 0,
      colors = {},
      price,
      discount,
      images = [],
      oldPrice,
      pdfUrl,
      productResponse = {},
      brand = {},
      count,
   } = selectedProduct

   const colorList = Object.entries(colors)

   const specs = [
      { label: 'Цвет', value: attributes.Color || 'Black' },
      { label: 'Дата выпуска', value: productResponse.date || '-' },
      { label: 'Гарантия', value: productResponse.warranty + ' мес' || '-' },
      { label: 'SIM-карты', value: productResponse.sim || 'нет' },
      { label: 'Процессор', value: productResponse.processor || '-' },
      { label: 'Вес', value: productResponse.weight || '-' },
      { label: 'Количество', value: count || '-' },
   ]

   return (
      <Wrapper>
         <Breadcrumbs>Товары › {productResponse.name}</Breadcrumbs>
         <BrandRow>
            {brand.imageUrl && <BrandLogo src={brand.imageUrl} alt={brand.name} />}
         </BrandRow>
         <TopTabs>
            <Tab active>Товар</Tab>
            <Tab>Детали</Tab>
         </TopTabs>
         <Content>
            <SliderBox>
               <PhonesSlider images={images} />
            </SliderBox>
            <InfoBox>
               <Title>{productResponse.name}</Title>
               <StockRow>
                  <InStock>В наличии ({available})</InStock>
                  <Article>Артикул: {article}</Article>
               </StockRow>
               <RatingBox>
                  <img src={Icons.starFul} alt="star" width={16} height={16} />
                  <RatingText>4.8</RatingText>
                  <ReviewCount>(56)</ReviewCount>
               </RatingBox>
               <Label>Цвет товара:</Label>
               <ColorRow>
                  {colorList.map(([key, color]) => (
                     <ColorDot
                        key={key}
                        active={selectedColor === key}
                        sx={{ color: color.toLowerCase() }}
                        onClick={() => setSelectedColor(key)}
                     />
                  ))}
               </ColorRow>
               <SpecTitle>Коротко о товаре:</SpecTitle>
               <SpecTable>
                  {specs.map(({ label, value }, i) => (
                     <SpecRow key={i}>
                        <SpecLabel>{label}</SpecLabel>
                        <SpecValue>{value}</SpecValue>
                     </SpecRow>
                  ))}
               </SpecTable>
               <PriceBox>
                  <CurrentPrice>{price} с</CurrentPrice>
                  {oldPrice && <OldPrice>{oldPrice} с</OldPrice>}
                  {discount && <DiscountTag>-{discount}%</DiscountTag>}
               </PriceBox>
               <Actions>
                  <IconBtn>
                     <img src={Icons.deleteb} alt="basket" />
                  </IconBtn>
                  <PrimaryBtn variant="contained">Редактировать</PrimaryBtn>
               </Actions>
               <Box mt={2} display="flex" justifyContent="flex-end">
                  <a
                     href={pdfUrl}
                     download
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 14,
                        color: '#1A1A1A',
                        textDecoration: 'none',
                     }}
                  >
                     <img src={Icons.download} alt="pdf" width={16} height={16} />
                     Скачать документ.pdf
                  </a>
               </Box>
            </InfoBox>
         </Content>
         <BottomTabs>
            <TabFooter active>Отзывы</TabFooter>
         </BottomTabs>
      </Wrapper>
   )
}

export default ProductDetails

const Wrapper = styled(Box)({
   width: '100%',
   maxWidth: 1200,
   margin: '0 auto',
   padding: '32px 24px',
})

const Breadcrumbs = styled(Box)({
   fontSize: 13,
   color: '#888',
   marginBottom: 12,
})

const BrandRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   marginBottom: 12,
})

const BrandLogo = styled('img')({
   height: 28,
   objectFit: 'contain',
})

const TopTabs = styled(Box)({
   display: 'flex',
   gap: 8,
   marginBottom: 24,
})

const Tab = styled(Button)(({ active }) => ({
   background: active ? '#363636' : '#F7F7F8',
   color: active ? '#fff' : '#363636',
   borderRadius: 8,
   fontWeight: 600,
   fontSize: 15,
   padding: '6px 22px',
   textTransform: 'none',
   '&:hover': {
      background: active ? '#232323' : '#ececec',
      color: active ? '#fff' : '#CB11AB',
   },
}))

const Content = styled(Box)({
   display: 'flex',
   gap: 56,
})

const SliderBox = styled(Box)({
   minWidth: 340,
   maxWidth: 340,
})

const InfoBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 16,
   maxWidth: 420,
})

const Title = styled(Typography)({
   fontSize: 24,
   fontWeight: 600,
})

const StockRow = styled(Box)({
   display: 'flex',
   gap: 16,
   fontSize: 14,
})

const InStock = styled(Typography)({
   color: '#27AE60',
   fontWeight: 500,
})

const Article = styled(Typography)({
   color: '#888',
})

const RatingBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 4,
})

const RatingText = styled(Typography)({
   fontWeight: 600,
   fontSize: 14,
})

const ReviewCount = styled('span')({
   fontSize: 14,
   color: '#888',
})

const Label = styled(Typography)({
   fontSize: 14,
   fontWeight: 500,
   color: '#333',
})

const ColorRow = styled(Box)({
   display: 'flex',
   gap: 8,
})

const ColorDot = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   width: 22,
   height: 22,
   borderRadius: '50%',
   border: `2px solid ${active ? '#CB11AB' : '#ccc'}`,
   cursor: 'pointer',
   position: 'relative',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   transition: '0.2s',
   '&::after': {
      content: '""',
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
   },
   '&:hover': {
      borderColor: '#CB11AB',
      transform: 'scale(1.05)',
   },
}))

const SpecTitle = styled(Typography)({
   fontSize: 15,
   fontWeight: 600,
   color: '#363636',
})

const SpecTable = styled(Box)({
   borderTop: '1px dotted #ccc',
   marginTop: 8,
})

const SpecRow = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   fontSize: 14,
   padding: '6px 0',
   borderBottom: '1px dotted #ccc',
})

const SpecLabel = styled('span')({
   color: '#888',
})

const SpecValue = styled('span')({
   fontWeight: 500,
   color: '#000',
})

const PriceBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 12,
})

const CurrentPrice = styled(Typography)({
   fontSize: 28,
   fontWeight: 700,
   color: '#1A1A1A',
})

const OldPrice = styled(Typography)({
   fontSize: 16,
   color: '#888',
   textDecoration: 'line-through',
})

const DiscountTag = styled(Box)({
   fontSize: 14,
   fontWeight: 600,
   color: '#CB11AB',
   background: '#FFE6F7',
   padding: '2px 6px',
   borderRadius: 4,
})

const Actions = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   gap: 12,
})

const IconBtn = styled(Button)({
   minWidth: 36,
   height: 36,
   borderRadius: 8,
   border: '1px solid #ccc',
   backgroundColor: '#fff',
   '& img': {
      width: 20,
      height: 20,
   },
})

const PrimaryBtn = styled(Button)({
   backgroundColor: '#CB11AB',
   color: '#fff',
   fontWeight: 600,
   fontSize: 15,
   borderRadius: 8,
   padding: '10px 28px',
   '&:hover': {
      backgroundColor: '#A4088E',
   },
})

const BottomTabs = styled(Box)({
   display: 'flex',
   gap: 24,
   marginTop: 32,
   borderBottom: '1.5px solid #eee',
})

const TabFooter = styled('div')(({ active }) => ({
   fontSize: 15,
   fontWeight: 600,
   color: active ? '#CB11AB' : '#888',
   borderBottom: active ? '2px solid #CB11AB' : 'none',
   padding: '8px 0',
   cursor: 'pointer',
}))
