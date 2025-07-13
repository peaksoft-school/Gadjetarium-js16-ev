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
      color,
      count,
      price,
      discount,
      oldPrice,
      images = [],
      productResponse = {},
      pdfUrl,
      brand = {},
   } = selectedProduct

   const colorList = Object.entries(productResponse.colors || {})

   const specs = [
      { label: 'Экран', value: '5.3" (2340×1080) IPS' },
      { label: 'Цвет', value: color || 'Black' },
      { label: 'Дата выпуска', value: productResponse.date || 'Март 2022' },
      { label: 'Операционная система', value: 'Android 12' },
      { label: 'Память', value: '128GB' },
      { label: 'SIM-карты', value: productResponse.sim || '2' },
      { label: 'Гарантия (месяцев)', value: productResponse.warranty ? `${productResponse.warranty}` : '12' },
      { label: 'Процессор', value: productResponse.processor || 'Exynos 1280 (5 nm)' },
      { label: 'Вес', value: productResponse.weight || '177' },
   ]

   return (
      <Wrapper>
         <Breadcrumbs>Товары › {productResponse.name || 'Galaxy S21 5G'}</Breadcrumbs>

         <BrandRow>
            <BrandLogo>SAMSUNG</BrandLogo>
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
               <Title>{productResponse.name || 'Galaxy S21 5G'}</Title>

               <StockRow>
                  <InStock>В наличии ({available || 105})</InStock>
                  <Article>Артикул: {article || '030696'}</Article>
               </StockRow>

               <RatingBox>
                  <img src={Icons.starFul} alt="star" width={16} height={16} />
                  <RatingText>4.5</RatingText>
                  <ReviewCount>(56)</ReviewCount>
               </RatingBox>

               <PriceRow>
                  <DiscountBadge>-{discount || 10}%</DiscountBadge>
                  <CurrentPrice>{price || '54 190'} ₽</CurrentPrice>
                  <OldPrice>{oldPrice || '57 190'} ₽</OldPrice>
               </PriceRow>

               <ColorLabelRow>
                  <Label>Цвет товара:</Label>
               </ColorLabelRow>

               <ColorRow>
                  {colorList.length > 0 ? (
                     colorList.map(([key, colorValue]) => (
                        <ColorDot
                           key={key}
                           active={selectedColor === key}
                           sx={{ backgroundColor: colorValue.toLowerCase() }}
                           onClick={() => setSelectedColor(key)}
                        />
                     ))
                  ) : (
                     <>
                        <ColorDot 
                           active={selectedColor === 'black'} 
                           sx={{ backgroundColor: '#000' }}
                           onClick={() => setSelectedColor('black')}
                        />
                        <ColorDot 
                           active={selectedColor === 'purple'} 
                           sx={{ backgroundColor: '#8B5CF6' }}
                           onClick={() => setSelectedColor('purple')}
                        />
                        <ColorDot 
                           active={selectedColor === 'gray'} 
                           sx={{ backgroundColor: '#6B7280' }}
                           onClick={() => setSelectedColor('gray')}
                        />
                        <ColorDot 
                           active={selectedColor === 'red'} 
                           sx={{ backgroundColor: '#EF4444' }}
                           onClick={() => setSelectedColor('red')}
                        />
                        <ColorDot 
                           active={selectedColor === 'blue'} 
                           sx={{ backgroundColor: '#3B82F6' }}
                           onClick={() => setSelectedColor('blue')}
                        />
                     </>
                  )}
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

               <Actions>
                  <IconBtn>
                     <img src={Icons.deleteb} alt="basket" />
                  </IconBtn>
                  <PrimaryBtn variant="contained">РЕДАКТИРОВАТЬ</PrimaryBtn>
               </Actions>

               <Box mt={2} display="flex" justifyContent="flex-end">
                  <DownloadLink
                     href={productResponse.pdfUrl || '#'}
                     download
                  >
                     <img src={Icons.download} alt="pdf" width={16} height={16} />
                     Скачать документ.pdf
                  </DownloadLink>
               </Box>
            </InfoBox>
         </Content>

         <BottomTabs>
            <TabFooter>Описание</TabFooter>
            <TabFooter>Характеристики</TabFooter>
            <TabFooter active>Отзывы</TabFooter>
         </BottomTabs>
      </Wrapper>
   )
}

export default ProductDetails

// ========== СТИЛИ ТОЧЬ-В-ТОЧЬ КАК НА ФОТО ==========
const Wrapper = styled(Box)({
   width: '100%',
   maxWidth: 1240,
   margin: '0 auto',
   padding: '32px 24px 80px',
   backgroundColor: '#fff',
})

const Breadcrumbs = styled(Typography)({
   fontSize: 14,
   color: '#666',
   marginBottom: 16,
})

const BrandRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   marginBottom: 24,
})

const BrandLogo = styled(Typography)({
   fontSize: 28,
   fontWeight: 700,
   color: '#1976d2',
   letterSpacing: '0.1em',
})

const TopTabs = styled(Box)({
   display: 'flex',
   gap: 4,
   marginBottom: 32,
})

const Tab = styled(Button)(({ active }) => ({
   background: active ? '#4a5568' : '#f7f8fa',
   color: active ? '#fff' : '#4a5568',
   borderRadius: 8,
   fontWeight: 500,
   fontSize: 14,
   padding: '8px 24px',
   textTransform: 'none',
   '&:hover': {
      background: active ? '#2d3748' : '#e2e8f0',
   },
}))

const Content = styled(Box)({
   display: 'flex',
   gap: 64,
   alignItems: 'flex-start',
})

const SliderBox = styled(Box)({
   minWidth: 320,
   maxWidth: 320,
   flexShrink: 0,
})

const InfoBox = styled(Box)({
   flex: 1,
   maxWidth: 500,
})

const Title = styled(Typography)({
   fontSize: 32,
   fontWeight: 600,
   color: '#1a202c',
   marginBottom: 16,
})

const StockRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 24,
   marginBottom: 16,
})

const InStock = styled(Typography)({
   color: '#48bb78',
   fontWeight: 500,
   fontSize: 14,
})

const Article = styled(Typography)({
   color: '#718096',
   fontSize: 14,
})

const RatingBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 8,
   marginBottom: 24,
})

const RatingText = styled(Typography)({
   fontWeight: 600,
   fontSize: 14,
   color: '#1a202c',
})

const ReviewCount = styled('span')({
   fontSize: 14,
   color: '#718096',
})

const PriceRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 16,
   marginBottom: 24,
})

const DiscountBadge = styled(Box)({
   backgroundColor: '#e53e3e',
   color: '#fff',
   fontSize: 12,
   fontWeight: 600,
   padding: '4px 8px',
   borderRadius: 4,
})

const CurrentPrice = styled(Typography)({
   fontSize: 32,
   fontWeight: 700,
   color: '#1a202c',
})

const OldPrice = styled(Typography)({
   fontSize: 16,
   color: '#a0aec0',
   textDecoration: 'line-through',
})

const ColorLabelRow = styled(Box)({
   marginBottom: 12,
})

const Label = styled(Typography)({
   fontSize: 14,
   fontWeight: 500,
   color: '#4a5568',
})

const ColorRow = styled(Box)({
   display: 'flex',
   gap: 12,
   marginBottom: 32,
})

const ColorDot = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   width: 32,
   height: 32,
   borderRadius: '50%',
   border: `2px solid ${active ? '#8B5CF6' : '#e2e8f0'}`,
   cursor: 'pointer',
   transition: 'all 0.2s ease',
   '&:hover': {
      borderColor: '#8B5CF6',
      transform: 'scale(1.05)',
   },
}))

const SpecTitle = styled(Typography)({
   fontSize: 16,
   fontWeight: 600,
   color: '#1a202c',
   marginBottom: 16,
})

const SpecTable = styled(Box)({
   marginBottom: 32,
})

const SpecRow = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   fontSize: 14,
   padding: '12px 0',
   borderBottom: '1px dashed #e2e8f0',
})

const SpecLabel = styled('span')({
   color: '#718096',
})

const SpecValue = styled('span')({
   fontWeight: 500,
   color: '#1a202c',
})

const Actions = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   gap: 16,
   marginBottom: 16,
})

const IconBtn = styled(Button)({
   minWidth: 48,
   height: 48,
   borderRadius: 8,
   border: '1px solid #e2e8f0',
   backgroundColor: '#fff',
   '&:hover': {
      backgroundColor: '#f7fafc',
   },
   '& img': {
      width: 20,
      height: 20,
   },
})

const PrimaryBtn = styled(Button)({
   backgroundColor: '#8B5CF6',
   color: '#fff',
   fontWeight: 600,
   fontSize: 14,
   borderRadius: 8,
   padding: '12px 32px',
   textTransform: 'none',
   '&:hover': {
      backgroundColor: '#7C3AED',
   },
})

const DownloadLink = styled('a')({
   display: 'flex',
   alignItems: 'center',
   gap: 8,
   fontSize: 14,
   color: '#4a5568',
   textDecoration: 'none',
   '&:hover': {
      color: '#8B5CF6',
   },
})

const BottomTabs = styled(Box)({
   display: 'flex',
   gap: 32,
   marginTop: 64,
   paddingTop: 32,
   borderTop: '1px solid #e2e8f0',
})

const TabFooter = styled('div')(({ active }) => ({
   fontSize: 14,
   fontWeight: 500,
   color: active ? '#8B5CF6' : '#a0aec0',
   borderBottom: active ? '2px solid #8B5CF6' : 'none',
   paddingBottom: 8,
   cursor: 'pointer',
   '&:hover': {
      color: active ? '#8B5CF6' : '#718096',
   },
}))