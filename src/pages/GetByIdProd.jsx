import { Box, Typography, Button, Chip, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import PhonesSlider from '../components/PhonesSlider'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductById } from '../store/products/productThunk'
import { useParams } from 'react-router'

const ProductDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
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

   const colorList = Object.values(colors)

   const specs = [
      { label: 'Тип', value: attributes.Type || '-' },
      { label: 'Цвет', value: attributes.Color || '-' },
      { label: 'Подключение', value: attributes.Connectivity || '-' },
      { label: 'Дуплекс', value: attributes.Duplex || '-' },
      { label: 'Дата выпуска', value: productResponse.date || '-' },
      { label: 'Гарантия (мес)', value: productResponse.warranty || '-' },
      { label: 'Вес', value: productResponse.weight || '-' },
      { label: 'Количество', value: count || '-' },
      { label: 'SIM-карты', value: productResponse.sim || 'нет' },
      { label: 'Процессор', value: productResponse.processor || '-' },
   ]

   return (
      <PageWrapper>
         <BreadCrumbs>Товары › {productResponse.name}</BreadCrumbs>
         <BrandRow>
            {brand.imageUrl && (
               <BrandLogo src={brand.imageUrl} alt={brand.name} />
            )}
            <BrandName>{brand.name}</BrandName>
         </BrandRow>
         <TabsRow>
            <TabButton active>Товар</TabButton>
            <TabButton>Детали товара</TabButton>
         </TabsRow>
         <Container>
            <SliderBox>
               <PhonesSlider images={images} />
            </SliderBox>
            <InfoSection>
               <Title>{productResponse.name}</Title>
               <StatusRow>
                  <Status>В наличии ({available})</Status>
                  <Article>Артикул: {article}</Article>
               </StatusRow>
               <RatingRow>
                  <Chip label="★ 4.8" color="success" size="small" />
                  <ReviewsCount>(56)</ReviewsCount>
               </RatingRow>
               <Label>Цвет товара:</Label>
               <ColorRow>
                  {colorList.map((color, i) => (
                     <ColorDot
                        key={i}
                        sx={{ backgroundColor: color.toLowerCase() }}
                     />
                  ))}
               </ColorRow>
               <ShortSpecTitle>Коротко о товаре:</ShortSpecTitle>
               <SpecTable>
                  {specs.map(({ label, value }, i) => (
                     <SpecRow key={i}>
                        <SpecLabel>{label}</SpecLabel>
                        <SpecValue>{value}</SpecValue>
                     </SpecRow>
                  ))}
               </SpecTable>
               <PriceSection>
                  <CurrentPrice>{price} с</CurrentPrice>
                  {oldPrice && <OldPrice>{oldPrice} с</OldPrice>}
                  {discount && <DiscountTag>-{discount}%</DiscountTag>}
               </PriceSection>
               <ActionButtons>
                  <EditButton variant="contained">Редактировать</EditButton>
               </ActionButtons>
               <Box mt={2} display="flex" justifyContent="flex-end">
                  <Link
                     href={pdfUrl}
                     target="_blank"
                     underline="none"
                     sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14 }}
                  >
                     <img src="/icons/pdf.svg" alt="pdf" width={16} height={16} />
                     Скачать документ.pdf
                  </Link>
               </Box>
            </InfoSection>
         </Container>
         <TabsFooter>
            <TabFooter active>Отзывы</TabFooter>
         </TabsFooter>
      </PageWrapper>
   )
}

export default ProductDetails

// Стили
const PageWrapper = styled(Box)({
   width: '100%',
   maxWidth: '1200px',
   margin: '0 auto',
   padding: '32px 24px',
})

const BreadCrumbs = styled(Box)({
   fontSize: 13,
   color: '#888',
   marginBottom: 12,
})

const BrandRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 12,
   marginBottom: 12,
})

const BrandLogo = styled('img')({
   height: 28,
   width: 'auto',
   objectFit: 'contain',
})

const BrandName = styled(Typography)({
   fontWeight: 700,
   fontSize: 18,
   color: '#1A1A1A',
   letterSpacing: 1,
})

const TabsRow = styled(Box)({
   display: 'flex',
   gap: 8,
   marginBottom: 24,
})

const TabButton = styled(Button)(({ active }) => ({
   background: active ? '#363636' : '#F7F7F8',
   color: active ? '#fff' : '#363636',
   borderRadius: 8,
   fontWeight: 600,
   fontSize: 15,
   padding: '6px 22px',
   boxShadow: active ? '0 2px 8px rgba(54,54,54,0.10)' : 'none',
   textTransform: 'none',
   '&:hover': {
      background: active ? '#232323' : '#ececec',
      color: active ? '#fff' : '#CB11AB',
   },
}))

const Container = styled(Box)({
   display: 'flex',
   alignItems: 'flex-start',
   gap: 56,
})

const SliderBox = styled(Box)({
   minWidth: 340,
   maxWidth: 340,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const InfoSection = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   maxWidth: '420px',
})

const Title = styled(Typography)({
   fontSize: '24px',
   fontWeight: 600,
})

const StatusRow = styled(Box)({
   display: 'flex',
   gap: '16px',
   fontSize: '14px',
})

const Status = styled(Typography)({
   color: '#27AE60',
   fontWeight: 500,
})

const Article = styled(Typography)({
   color: '#888',
})

const RatingRow = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 8,
})

const ReviewsCount = styled('span')({
   color: '#888',
   fontSize: 14,
})

const Label = styled(Typography)({
   fontSize: '14px',
   fontWeight: 500,
   color: '#333',
})

const ColorRow = styled(Box)({
   display: 'flex',
   gap: '8px',
})

const ColorDot = styled(Box)({
   width: 20,
   height: 20,
   borderRadius: '50%',
   border: '1.5px solid #ccc',
   cursor: 'pointer',
   transition: '0.2s',
   '&:hover': {
      borderColor: '#CB11AB',
      transform: 'scale(1.05)',
   },
})

const ShortSpecTitle = styled(Typography)({
   fontSize: 15,
   fontWeight: 600,
   marginTop: 10,
   marginBottom: 2,
   color: '#363636',
})

const SpecTable = styled(Box)({
   borderTop: '1px dotted #ccc',
   marginTop: '8px',
})

const SpecRow = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   fontSize: '14px',
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

const PriceSection = styled(Box)({
   display: 'flex',
   alignItems: 'flex-end',
   gap: '12px',
   marginTop: 8,
})

const CurrentPrice = styled(Typography)({
   fontSize: '22px',
   fontWeight: 'bold',
   color: '#000',
})

const OldPrice = styled(Typography)({
   fontSize: '16px',
   textDecoration: 'line-through',
   color: '#888',
})

const DiscountTag = styled(Typography)({
   color: '#CB11AB',
   fontWeight: 600,
   fontSize: 16,
   marginLeft: 8,
})

const ActionButtons = styled(Box)({
   display: 'flex',
   gap: '12px',
   marginTop: 12,
})

const EditButton = styled(Button)({
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

const TabsFooter = styled(Box)({
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
   transition: 'color 0.2s, border-bottom 0.2s',
}))
