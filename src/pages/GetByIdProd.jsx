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
   if (selectedError)
      return (
         <Box p={4} color="red">
            {selectedError}
         </Box>
      )
   if (!selectedProduct)
      return (
         <Box p={4} color="red">
            Товар не найден
         </Box>
      )

   const {
      article,
      attributes = {},
      available = 0,
      color,
      price,
      discount,
      oldPrice,
      images = [],
      productResponse = {},
      pdfUrl,
      brand = {},
      count,
   } = selectedProduct

   const colorList = Object.entries(productResponse.colors || {})

   const specs = [
      { label: 'Цвет', value: color || 'Black' },
      { label: 'Дата выпуска', value: productResponse.date || '-' },
      {
         label: 'Гарантия',
         value: productResponse.warranty
            ? `${productResponse.warranty} мес`
            : '-',
      },
      { label: 'SIM-карты', value: productResponse.sim || 'нет' },
      { label: 'Процессор', value: productResponse.processor || '-' },
      { label: 'Вес', value: productResponse.weight || '-' },
      { label: 'Количество', value: count || '-' },
   ]

   return (
      <Wrapper>
         <Breadcrumbs>Товары › {productResponse.name}</Breadcrumbs>

         <BrandRow>
            {brand.imageUrl && (
               <BrandLogo src={brand.imageUrl} alt={brand.name} />
            )}
         </BrandRow>

         <TopTabs>
            <Tab active>Товар</Tab>
            <Tab>Детали товара</Tab>
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
                  <RatingText>4.5</RatingText>
                  <ReviewCount>(56)</ReviewCount>
               </RatingBox>

               <Label>Цвет товара:</Label>
               <ColorRow>
                  {colorList.map(([key, val]) => (
                     <ColorDot
                        key={key}
                        active={selectedColor === key}
                        sx={{ color: val.toLowerCase() }}
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
                     href={productResponse.pdfUrl}
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
                     <img
                        src={Icons.download}
                        alt="pdf"
                        width={16}
                        height={16}
                     />
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

// Стили ниже — без изменений

const Wrapper = styled(Box)({
   width: '100%',
   maxWidth: 1240,
   margin: '0 auto',
   padding: '32px 0 80px',
})

const Breadcrumbs = styled(Box)({
   fontSize: 13,
   color: '#6C6C6C',
   marginBottom: 16,
})

const BrandRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   marginBottom: 8,
})

const BrandLogo = styled('img')({
   height: 26,
   objectFit: 'contain',
})

const TopTabs = styled(Box)({
   display: 'flex',
   gap: 8,
   marginBottom: 32,
})

const Tab = styled(Button)(({ active }) => ({
   background: active ? '#363636' : '#F7F7F8',
   color: active ? '#fff' : '#363636',
   borderRadius: 10,
   fontWeight: 600,
   fontSize: 14,
   padding: '7px 20px',
   textTransform: 'none',
   '&:hover': {
      background: active ? '#232323' : '#EDEDED',
      color: active ? '#fff' : '#CB11AB',
   },
}))

const Content = styled(Box)({
   display: 'flex',
   gap: 64,
   alignItems: 'flex-start',
})

const SliderBox = styled(Box)({
   minWidth: 360,
   maxWidth: 360,
})

const InfoBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 20,
   maxWidth: 460,
})

const Title = styled(Typography)({
   fontSize: 24,
   fontWeight: 600,
   color: '#1A1A1A',
})

const StockRow = styled(Box)({
   display: 'flex',
   gap: 20,
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
   gap: 6,
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
   color: '#1A1A1A',
})

const ColorRow = styled(Box)({
   display: 'flex',
   gap: 10,
})

const ColorDot = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   width: 22,
   height: 22,
   borderRadius: '50%',
   border: `2px solid ${active ? '#CB11AB' : '#D6D6D6'}`,
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
      transform: 'scale(1.06)',
   },
}))

const SpecTitle = styled(Typography)({
   fontSize: 16,
   fontWeight: 600,
   color: '#1A1A1A',
   marginTop: 12,
})

const SpecTable = styled(Box)({
   borderTop: '1px dashed #D6D6D6',
   marginTop: 10,
})

const SpecRow = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   fontSize: 14,
   padding: '10px 0',
   borderBottom: '1px dashed #E0E0E0',
})

const SpecLabel = styled('span')({
   color: '#7A7A7A',
})

const SpecValue = styled('span')({
   fontWeight: 500,
   color: '#1A1A1A',
})

const PriceBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 14,
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
   padding: '2px 8px',
   borderRadius: 6,
})

const Actions = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   gap: 14,
})

const IconBtn = styled(Button)({
   minWidth: 36,
   height: 36,
   borderRadius: 8,
   border: '1px solid #D6D6D6',
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
   borderRadius: 10,
   padding: '10px 28px',
   '&:hover': {
      backgroundColor: '#A4088E',
   },
})

const BottomTabs = styled(Box)({
   display: 'flex',
   gap: 32,
   marginTop: 48,
   borderBottom: '1.5px solid #E0E0E0',
})

const TabFooter = styled('div')(({ active }) => ({
   fontSize: 15,
   fontWeight: 600,
   color: active ? '#CB11AB' : '#888',
   borderBottom: active ? '2px solid #CB11AB' : 'none',
   padding: '10px 0',
   cursor: 'pointer',
}))
