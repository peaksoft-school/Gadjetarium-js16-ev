import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
   Box,
   Typography,
   styled,
   Button,
   CircularProgress,
   Tabs,
   Tab,
   Rating,
   Chip,
   Select,
   MenuItem,
} from '@mui/material'
import { fetchProductDetail } from '../store/product/productThunk2'
import { clearSelectedProduct } from '../store/product/productSlice2'
import { fetchReviewsByStatus } from '../store/reviews/ReviewsThunk'
import { Icons } from '../assets/icons'
import PhonesSlider from '../components/PhonesSlider'
import CompactCard from '../components/UI/cards/CompactCard'
import UserHeader from '../layout/user/UserHeader'
import DeliveryPage from './DeliveryPage'
import ReviewForm from './ReviewsForm'
import Modal from '@mui/material/Modal'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Images } from '../assets/images'
import { toggleFavoriteOnServer } from '../store/favorites/favoritesSlice'
import { addToBasket } from '../store/basket/basketThunk'
import { showToast } from '../utils/helpers/showToast'

const ProductDetailPage = () => {
   const dispatch = useDispatch()
   const { productId } = useParams()

   const { selectedProduct, loading, error } = useSelector(
      (state) => state.products
   )
   const {
      items: reviews,
      status: reviewsStatus,
      error: reviewsError,
   } = useSelector((state) => state.reviews)
   const userId = useSelector((state) => state.auth?.user?.id || 1)
   const favoriteIds = useSelector((state) => state.favorites.ids)
   const isLiked = favoriteIds
      .map(String)
      .includes(String(selectedProduct?.productTypeId))

   const [activeTab, setActiveTab] = useState(0)
   const [selectedStatus, setSelectedStatus] = useState('все')
   const [openReviewModal, setOpenReviewModal] = useState(false)
   const [visibleCount, setVisibleCount] = useState(3)
   const [showSuccessModal, setShowSuccessModal] = useState(false)
   const productResponse = selectedProduct?.productResponse
   const colorList =
      productResponse &&
      productResponse.colors &&
      typeof productResponse.colors === 'object'
         ? Object.entries(productResponse.colors)
         : []
   const [selectedColor, setSelectedColor] = useState(() =>
      colorList.length > 0 ? colorList[0][0] : null
   )

   useEffect(() => {
      console.log('Dispatching fetchProductDetail with productId:', productId)
      if (productId) {
         const productIdNum = Number(productId)
         console.log('Validated productId:', productIdNum)
         dispatch(fetchProductDetail(productId))
         dispatch(fetchReviewsByStatus(selectedStatus))
      } else {
         console.error('productId is undefined or invalid')
      }
      return () => dispatch(clearSelectedProduct())
   }, [dispatch, productId, selectedStatus])

   useEffect(() => {
      setVisibleCount(3)
   }, [selectedStatus, productId])

   useEffect(() => {
      if (selectedProduct) {
         const viewed = JSON.parse(
            localStorage.getItem('viewedProducts') || '[]'
         )
         if (
            !viewed.some(
               (p) => p.productTypeId === selectedProduct.productTypeId
            )
         ) {
            viewed.unshift(selectedProduct)
            localStorage.setItem(
               'viewedProducts',
               JSON.stringify(viewed.slice(0, 10))
            )
         }
      }
   }, [selectedProduct])

   const viewedProducts = JSON.parse(
      localStorage.getItem('viewedProducts') || '[]'
   )

   if (loading || (reviewsStatus === 'loading' && activeTab === 2))
      return (
         <CenterBox>
            <CircularProgress />
         </CenterBox>
      )

   if (error)
      return (
         <CenterBox>
            <Typography color="error">Ошибка: {String(error)}</Typography>
         </CenterBox>
      )

   if (!selectedProduct)
      return (
         <CenterBox>
            <Typography>Продукт не найден</Typography>
         </CenterBox>
      )

   const {
      images = [],
      description = '',
      price = '—',
      totalPrice = null,
      discount = null,
      color = '—',
      count = 0,
      article = '—',
      attributes = {},
      brand = { name: '', imageUrl: '' },
      basketed = false,
   } = selectedProduct

   const {
      name = '',
      date = '',
      warranty = 0,
      videoUrl = '',
      pdfUrl = '',
   } = productResponse

   const sliderImages = images.length
      ? images.map((img, index) => ({ id: index, image: img }))
      : [{ id: 0, image: 'https://via.placeholder.com/300x400?text=Нет+фото' }]

   const handleTabChange = (event, newValue) => {
      setActiveTab(newValue)
   }

   const handleStatusChange = (event) => {
      setSelectedStatus(event.target.value)
   }

   const handleReviewSuccess = () => {
      setOpenReviewModal(false)
      setShowSuccessModal(true)
      setTimeout(() => setShowSuccessModal(false), 2000)
   }

   const handleAddToBasket = async () => {
      try {
         await dispatch(
            addToBasket({
               productId: selectedProduct.productTypeId,
               quantity: 1,
            })
         ).unwrap()
         showToast({ message: 'Товар успешно добавлен в корзину!' })
      } catch (e) {
         showToast({ message: 'Ошибка добавления в корзину', type: 'error' })
         console.error('Ошибка добавления в корзину:', e)
      }
   }

   console.log('selectedProduct:', selectedProduct)

   const totalReviews = reviews.length
   const ratings = reviews.map((r) => r.review?.rating || r.rating || 0)
   const averageRating = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0
   const starCounts = [5, 4, 3, 2, 1].map(
      (star) => ratings.filter((r) => Math.round(r) === star).length
   )

   const productSpecs = [
      {
         label: 'Экран',
         value: attributes.screen || attributes.screenSize || '-',
      },
      { label: 'Цвет', value: color || '-' },
      { label: 'Дата выпуска', value: productResponse?.date || '-' },
      {
         label: 'Операционная система',
         value: attributes.os || attributes.OS || '-',
      },
      { label: 'Память', value: attributes.memory || attributes.Memory || '-' },
      { label: 'SIM-карты', value: attributes.sim || attributes.SIM || '-' },
      { label: 'Гарантия (месяцев)', value: productResponse?.warranty || '-' },
      { label: 'Процессор', value: attributes.cpu || attributes.CPU || '-' },
      { label: 'Вес', value: attributes.weight || attributes.Weight || '-' },
      { label: 'Скорость', value: attributes.Speed || '-' },
      { label: 'Порты', value: attributes.Ports || '-' },
      { label: 'WiFi Standard', value: attributes['WiFi Standard'] || '-' },
      { label: 'Диапазоны', value: attributes.Bands || '-' },
   ]

   return (
      <div>
         <DetailWrapper>
            <MainContent>
               <SliderSection>
                  <PhonesSlider images={sliderImages} />
               </SliderSection>

               <ProductInfo>
                  <TopInfoRow>
                     <ReviewsBadge>
                        {totalReviews} отзывов ({averageRating.toFixed(1)}★)
                     </ReviewsBadge>
                     <ArticleText>Артикул: {article}</ArticleText>
                     <StarsRow>
                        {/* Здесь можно отрисовать звёзды через map или компонент Rating */}
                        <Rating value={averageRating} readOnly size="medium" />
                     </StarsRow>
                  </TopInfoRow>
                  <Typography variant="h3" fontWeight={700} mb={2}>
                     {name}
                  </Typography>
                  {pdfUrl && pdfUrl !== 'string' && (
                     <Button
                        variant="outlined"
                        color="primary"
                        sx={{ marginLeft: 'auto', marginRight: '20px' }}
                        onClick={() =>
                           window.open(pdfUrl, '_blank', 'noopener,noreferrer')
                        }
                     >
                        Скачать PDF
                     </Button>
                  )}
                  <Typography fontSize={16} mb={1}>
                     Цвет: {color}
                  </Typography>
                  <ColorDotsRow>
                     {colorList.map(([key, value]) => (
                        <ColorDotStyled
                           key={key}
                           onClick={() => setSelectedColor(key)}
                           active={selectedColor === key}
                           sx={{ backgroundColor: value }}
                        />
                     ))}
                  </ColorDotsRow>
                  <PriceRow>
                     <MainPrice>{discount ? `-${price}` : price} c</MainPrice>
                     {discount && <DiscountLabel>-{discount}%</DiscountLabel>}
                     {totalPrice && (
                        <OldPriceStyled>{totalPrice} c</OldPriceStyled>
                     )}
                  </PriceRow>

                  <ProductShortInfoBlock>
                     <ShortInfoTitle>Коротко о товаре:</ShortInfoTitle>
                     <ShortInfoList>
                        {productSpecs.map((spec, idx) => {
                           if (spec.value !== '-') {
                              return (
                                 <ShortInfoRow key={idx}>
                                    <ShortInfoLabel>
                                       {spec.label}
                                    </ShortInfoLabel>
                                    <ShortInfoDots />
                                    <ShortInfoValue>
                                       {spec.value}
                                    </ShortInfoValue>
                                 </ShortInfoRow>
                              )
                           }
                        })}
                     </ShortInfoList>
                  </ProductShortInfoBlock>

                  {/* <Box display="flex" alignItems="center" mt={2} mb={2}>
                     <img
                        src={productResponse?.brand?.imageUrl}
                        alt={productResponse?.brand?.name}
                        style={{ width: 32, height: 32, marginRight: 8 }}
                     />
                     <Typography variant="body2">
                        {productResponse?.brand?.name}
                     </Typography>
                  </Box> */}

                  {/* {productResponse?.videoUrl && (
                     <a
                        href={productResponse.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Видеообзор
                     </a>
                  )} */}
                  {/* {productResponse?.pdfUrl && (
                     <a
                        href={productResponse.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Инструкция (PDF)
                     </a>
                  )} */}

                  <Actions>
                     <AddToCartButton
                        variant="contained"
                        disabled={count === 0}
                        fullWidth
                        onClick={handleAddToBasket}
                     >
                        {basketed ? 'В корзине' : 'В корзину'}
                     </AddToCartButton>
                     <FavoriteButton
                        variant="outlined"
                        onClick={() =>
                           dispatch(
                              toggleFavoriteOnServer({
                                 productTypeId: selectedProduct.productTypeId,
                                 userId,
                              })
                           )
                        }
                        sx={{ backgroundColor: 'grey' }}
                     >
                        <img
                           src={isLiked ? Icons.likeR : Icons.likeW}
                           alt="like"
                           style={{
                              width: 24,
                              height: 24,
                              transition: '0.2s',
                           }}
                        />
                     </FavoriteButton>
                  </Actions>
               </ProductInfo>
            </MainContent>

            <TabsSection>
               <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                     mb: 3,
                     background: '#fff',
                     borderRadius: '12px',
                     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                     minHeight: 56,
                     px: 2,
                     '& .MuiTab-root': {
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#888',
                        minHeight: 56,
                        borderRadius: '8px 8px 0 0',
                        transition: 'color 0.2s',
                        '&:hover': {
                           color: '#CB11AB',
                           background: '#f9f6fb',
                        },
                     },
                     '& .Mui-selected': {
                        color: '#CB11AB !important',
                        background: '#fff',
                        fontWeight: 700,
                        borderBottom: '2.5px solid #CB11AB',
                     },
                     '& .MuiTabs-indicator': {
                        backgroundColor: '#CB11AB',
                        height: 3,
                        borderRadius: 2,
                     },
                  }}
               >
                  <Tab label="Описание" />
                  <Tab label="Характеристики" />
                  <Tab label="Отзывы" />
                  <Tab label="Доставка и оплата" />

                  {pdfUrl && pdfUrl !== 'string' && (
                     <Button
                        variant="outlined"
                        color="primary"
                        sx={{ marginLeft: 'auto', marginRight: '20px' }}
                        onClick={() =>
                           window.open(pdfUrl, '_blank', 'noopener,noreferrer')
                        }
                     >
                        Скачать PDF
                     </Button>
                  )}
               </Tabs>

               {activeTab === 0 && (
                  <TabContent>
                     <BannerBox>
                        <BannerText>
                           <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, mb: 2 }}
                           >
                              {description}
                           </Typography>
                           {videoUrl && videoUrl !== 'string' ? (
                              <Box
                                 sx={{
                                    mt: 2,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 12px #0002',
                                    maxWidth: 600,
                                 }}
                              >
                                 <iframe
                                    width="420"
                                    height="236"
                                    src={
                                       videoUrl.includes('watch?v=')
                                          ? videoUrl.replace(
                                               'watch?v=',
                                               'embed/'
                                            )
                                          : videoUrl.replace(
                                               '/shorts/',
                                               '/embed/'
                                            )
                                    }
                                    title="Product Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                       display: 'block',
                                       width: '100%',
                                       height: 336,
                                       background: '#000',
                                    }}
                                 />
                              </Box>
                           ) : (
                              <VideoButton
                                 startIcon={<PlayCircleOutlineIcon />}
                              >
                                 Видео о товаре
                              </VideoButton>
                           )}
                        </BannerText>
                        <BannerImage
                           src={Images.bannerF}
                           alt="4K Wallpapers"
                           style={{ width: '60%', height: '500px' }}
                        />
                     </BannerBox>
                     <SectionTitle>
                        Non ultricies sollicitudin nisi quisque?
                     </SectionTitle>
                     <DescriptionText>
                        Non ultricies sollicitudin nisi quisque. Morbi integer
                        quis tincidunt vitae penatibus. Feugiat quis tincidunt
                        volutpat scelerisque elit fermentum nullam rhoncus
                        adipiscing. Sem tortor molestie odio.
                        <br />
                        <br />
                        Adipiscing etiam vitae in semper sed eget nec aliquet
                        aliquam. Morbi integer quis tincidunt vitae penatibus.
                        Feugiat quis tincidunt volutpat scelerisque elit
                        fermentum nullam rhoncus adipiscing. Sem tortor molestie
                        odio.Adipiscing etiam vitae in semper sed eget nec
                        aliquet aliquam. Morbi integer quis tincidunt vitae
                        penatibus. Feugiat quis tincidunt volutpat scelerisque
                        elit fermentum nullam rhoncus adipiscing. Sem tortor
                        molestie odio.
                        <br />
                        <br />
                        Vel at convallis tempus nisl ut posuere. Sagittis vitae
                        sodales scelerisque egestas platea nulla aenean.
                        Facilisis feugiat est aliquet amet eu neque. Magna
                        elementum laoreet tincidunt dolor, quam pulvinar.
                        Feugiat lectus iaculis tortor magna vel eget in sem
                        amet. Metus, tellus diam in neque sit sagittis
                        ullamcorper. Nisl pulvinar lobortis enim morbi arcu, sed
                        dictumst id. Tellus dolor eget magna auctor molestie
                        eget.
                     </DescriptionText>
                     <SectionTitle sx={{ mt: 4, mb: 2 }}>
                        Просмотренные товары
                     </SectionTitle>
                     <ProductGrid>
                        {viewedProducts.map((product) => (
                           <CompactCard
                              key={product.productTypeId}
                              image={product.images?.[0] || product.imageUrl}
                              title={
                                 product.productResponse?.name || product.name
                              }
                              price={product.totalPrice ?? product.price}
                              rating={
                                 product.productResponse?.rating ||
                                 product.rating ||
                                 0
                              }
                              reviews={
                                 product.productResponse?.reviews ||
                                 product.reviews ||
                                 0
                              }
                              productId={product.productTypeId}
                           />
                        ))}
                     </ProductGrid>
                  </TabContent>
               )}

               {activeTab === 1 && (
                  <TabContent>
                     <CharacteristicsBlock>
                        <CharSectionTitle>
                           Основные характеристики
                        </CharSectionTitle>
                        <CharTable>
                           <tbody>
                              <CharRow>
                                 <CharCellTitle>Артикул:</CharCellTitle>
                                 <CharCell>{article ?? '—'}</CharCell>
                              </CharRow>
                              <CharRow>
                                 <CharCellTitle>Цвет:</CharCellTitle>
                                 <CharCell>{color ?? '—'}</CharCell>
                              </CharRow>
                              <CharRow>
                                 <CharCellTitle>В наличии:</CharCellTitle>
                                 <CharCell>{count ?? '—'}</CharCell>
                              </CharRow>
                              <CharRow>
                                 <CharCellTitle>Гарантия:</CharCellTitle>
                                 <CharCell>
                                    {warranty ? `${warranty} мес.` : '—'}
                                 </CharCell>
                              </CharRow>
                              <CharRow>
                                 <CharCellTitle>Дата выпуска:</CharCellTitle>
                                 <CharCell>
                                    {productResponse?.date ?? '—'}
                                 </CharCell>
                              </CharRow>
                              {attributes &&
                                 Object.entries(attributes).map(
                                    ([key, value]) => (
                                       <CharRow key={key}>
                                          <CharCellTitle>{key}:</CharCellTitle>
                                          <CharCell>{value ?? '—'}</CharCell>
                                       </CharRow>
                                    )
                                 )}
                           </tbody>
                        </CharTable>
                        <CharSectionTitle>Память и процессор</CharSectionTitle>
                        <CharTable>
                           <tbody>
                              <CharRow>
                                 <CharCell colSpan={2}>—</CharCell>
                              </CharRow>
                           </tbody>
                        </CharTable>
                        <CharSectionTitle>
                           Дополнительные характеристики
                        </CharSectionTitle>
                        <CharTable>
                           <tbody>
                              <CharRow>
                                 <CharCell colSpan={2}>—</CharCell>
                              </CharRow>
                           </tbody>
                        </CharTable>
                     </CharacteristicsBlock>
                     <SectionTitle sx={{ mt: 4, mb: 2 }}>
                        Просмотренные товары
                     </SectionTitle>
                     <ProductGrid>
                        {viewedProducts.map((product) => (
                           <CompactCard
                              key={product.productTypeId}
                              image={product.images?.[0] || product.imageUrl}
                              title={
                                 product.productResponse?.name || product.name
                              }
                              price={product.totalPrice ?? product.price}
                              rating={
                                 product.productResponse?.rating ||
                                 product.rating ||
                                 0
                              }
                              reviews={
                                 product.productResponse?.reviews ||
                                 product.reviews ||
                                 0
                              }
                              productId={product.productTypeId}
                           />
                        ))}
                     </ProductGrid>
                  </TabContent>
               )}

               {activeTab === 2 && (
                  <TabContent
                     sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}
                  >
                     <Box sx={{ flex: 1 }}>
                        <Typography
                           variant="h5"
                           sx={{ mb: 3, color: '#222', fontWeight: 700 }}
                        >
                           Отзывы
                        </Typography>

                        {reviewsStatus === 'loading' && <CircularProgress />}
                        {reviewsStatus === 'failed' && (
                           <Typography color="error">
                              Ошибка:{' '}
                              {reviewsError || 'Неизвестная ошибка (CORS)'}
                           </Typography>
                        )}
                        {reviewsStatus === 'succeeded' && (
                           <>
                              {reviews.length === 0 ? (
                                 <Typography color="text.secondary">
                                    Отзывы по выбранному статусу отсутствуют.
                                 </Typography>
                              ) : (
                                 <>
                                    {reviews
                                       .slice(0, visibleCount)
                                       .map((review) => (
                                          <ReviewCard
                                             key={
                                                review.id || review.review?.id
                                             }
                                             review={review}
                                          />
                                       ))}
                                    {visibleCount < reviews.length && (
                                       <Box
                                          sx={{
                                             display: 'flex',
                                             justifyContent: 'center',
                                             mt: 3,
                                          }}
                                       >
                                          <Button
                                             variant="outlined"
                                             color="secondary"
                                             sx={{
                                                borderRadius: 8,
                                                borderColor: '#CB11AB',
                                                color: '#CB11AB',
                                                fontWeight: 600,
                                                px: 4,
                                                py: 1.5,
                                                mt: 2,
                                                '&:hover': {
                                                   background: '#f9f6fb',
                                                   borderColor: '#CB11AB',
                                                },
                                             }}
                                             onClick={() =>
                                                setVisibleCount((c) => c + 3)
                                             }
                                          >
                                             Показать ещё
                                          </Button>
                                       </Box>
                                    )}
                                 </>
                              )}
                           </>
                        )}
                     </Box>
                     <ReviewSummaryBox>
                        <Typography
                           variant="h4"
                           sx={{ fontWeight: 700, mb: 1 }}
                        >
                           {averageRating.toFixed(1)}
                        </Typography>
                        <Rating
                           value={averageRating}
                           precision={0.5}
                           readOnly
                           size="large"
                           sx={{ mb: 1 }}
                        />
                        <Typography
                           variant="body2"
                           sx={{ color: '#888', mb: 2 }}
                        >
                           {totalReviews} отзывов
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                           {[5, 4, 3, 2, 1].map((star, idx) => (
                              <Box
                                 key={star}
                                 sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                 }}
                              >
                                 <Rating value={star} readOnly size="small" />
                                 <Typography
                                    variant="body2"
                                    sx={{ color: '#888' }}
                                 >
                                    {starCounts[idx]} отзывов
                                 </Typography>
                              </Box>
                           ))}
                        </Box>
                        <Button
                           variant="contained"
                           fullWidth
                           sx={{
                              mt: 2,
                              background: '#CB11AB',
                              color: '#fff',
                              fontWeight: 700,
                              borderRadius: 8,
                              boxShadow: '0 2px 8px rgba(251,194,235,0.12)',
                              '&:hover': {
                                 background: '#CB11AB',
                              },
                           }}
                           onClick={() => setOpenReviewModal(true)}
                        >
                           Оставить отзыв
                        </Button>
                     </ReviewSummaryBox>
                  </TabContent>
               )}

               {activeTab === 3 && (
                  <TabContent>
                     <DeliveryPayment>
                        <DeliveryPage />
                        <br />
                     </DeliveryPayment>
                     <br />
                     <hr />
                     <br />
                     <br />
                     <br />
                     <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                        Просмотренные товары
                     </Typography>
                     <br />
                     <ProductGrid>
                        {viewedProducts.map((product) => (
                           <CompactCard
                              key={product.productTypeId}
                              image={product.images?.[0] || product.imageUrl}
                              title={
                                 product.productResponse?.name || product.name
                              }
                              price={product.totalPrice ?? product.price}
                              rating={
                                 product.productResponse?.rating ||
                                 product.rating ||
                                 0
                              }
                              reviews={
                                 product.productResponse?.reviews ||
                                 product.reviews ||
                                 0
                              }
                              productId={product.productTypeId}
                           />
                        ))}
                     </ProductGrid>
                  </TabContent>
               )}
            </TabsSection>
         </DetailWrapper>
         <Modal
            open={openReviewModal}
            onClose={() => setOpenReviewModal(false)}
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: '#fff',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 3,
                  minWidth: 350,
                  border: '1px solid #f0f0f0',
               }}
            >
               <ReviewForm
                  productId={selectedProduct?.productTypeId}
                  onSuccess={handleReviewSuccess}
               />
            </Box>
         </Modal>
         <Modal
            open={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: '#fff',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 3,
                  minWidth: 340,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
               }}
            >
               <CheckCircleOutlineIcon
                  sx={{ color: '#4caf50', fontSize: 60, mb: 1 }}
               />
               <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Спасибо за отзыв!
               </Typography>
               <Typography
                  variant="body2"
                  sx={{ color: '#888', mb: 2, textAlign: 'center' }}
               >
                  Ваш отзыв успешно отправлен и появится на сайте после
                  модерации.
               </Typography>
               <Button
                  variant="contained"
                  sx={{
                     background:
                        'linear-gradient(90deg,#CB11AB 0%,#fbc2eb 100%)',
                     color: '#fff',
                     fontWeight: 700,
                     borderRadius: 2,
                     px: 4,
                     py: 1,
                     boxShadow: '0 2px 8px #CB11AB20',
                     '&:hover': {
                        background:
                           'linear-gradient(90deg,#CB11AB 0%,#f9c5d1 100%)',
                     },
                  }}
                  onClick={() => setShowSuccessModal(false)}
               >
                  Ок
               </Button>
            </Box>
         </Modal>
      </div>
   )
}

export default ProductDetailPage

const CenterBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   backgroundColor: '#fff',
   borderRadius: '8px',
   boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}))

const DetailWrapper = styled(Box)(({ theme }) => ({
   maxWidth: '1500px',
   margin: '0 auto',
   padding: '20px',
   backgroundColor: '#f9f9f9',
   minHeight: '100vh',
}))

const MainContent = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '48px',
   marginBottom: '30px',
   backgroundColor: '#fff',
   padding: '40px 48px',
   borderRadius: '24px',
   boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
   alignItems: 'flex-start',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '24px',
      padding: '24px',
   },
}))

const SliderSection = styled(Box)(({ theme }) => ({
   flex: '0 0 450px',
   [theme.breakpoints.down('md')]: {
      flex: '1 1 auto',
      width: '100%',
   },
}))

const ProductInfo = styled(Box)(({ theme }) => ({
   flex: '1',
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}))

const ProductTitle = styled(Typography)(({ theme }) => ({
   fontSize: '32px',
   fontWeight: 700,
   lineHeight: '1.2',
   color: '#1a1a1a',
   marginBottom: '15px',
}))

const ReviewsSection = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '12px',
   marginBottom: '15px',
   color: '#666',
}))

const ColorSection = styled(Box)(({ theme }) => ({
   marginBottom: '20px',
}))

const ColorOptions = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '12px',
   marginTop: '10px',
}))

const ColorCircle = styled(Box)(({ theme, color, selected }) => ({
   width: '32px',
   height: '32px',
   borderRadius: '50%',
   backgroundColor: color,
   border: selected ? '3px solid #CB11AB' : '2px solid #eee',
   cursor: 'pointer',
   transition: 'all 0.2s ease',
   boxShadow: selected ? '0 0 0 2px #fbc2eb' : 'none',
   '&:hover': {
      transform: 'scale(1.12)',
      boxShadow: '0 0 8px #fbc2eb',
   },
}))

const PriceSection = styled(Box)(({ theme }) => ({
   marginBottom: '20px',
   display: 'flex',
   alignItems: 'center',
   gap: '24px',
}))

const PriceRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 16px;
   margin: 24px 0 12px 0;
`

const CurrentPrice = styled(Typography)(({ theme }) => ({
   fontSize: '38px',
   fontWeight: 800,
   color: '#CB11AB',
}))

const DiscountBadge = styled(Box)(({ theme }) => ({
   backgroundColor: '#CB11AB',
   color: 'white',
   padding: '6px 12px',
   borderRadius: '8px',
   fontSize: '16px',
   fontWeight: 700,
}))

const SpecsGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: '1fr',
   gap: '0',
   marginBottom: '30px',
   padding: '0',
   backgroundColor: 'transparent',
   borderRadius: '0',
}))

const SpecItem = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '10px 0',
   borderBottom: '1px dashed #e0e0e0',
   fontSize: '16px',
   '&:last-child': {
      borderBottom: 'none',
   },
}))

const Actions = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '20px',
   alignItems: 'center',
   marginTop: '20px',
}))

const AddToCartButton = styled(Button)(({ theme }) => ({
   background: '#CB11AB ',
   color: 'white',
   padding: '14px 36px',
   fontSize: '18px',
   fontWeight: 700,
   borderRadius: '12px',
   textTransform: 'none',
   boxShadow: '0 2px 8px rgba(251,194,235,0.12)',
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   '&:hover': {
      background: 'linear-gradient(90deg,#CB11AB 0%,#f9c5d1 100%)',
   },
   '&:disabled': {
      backgroundColor: '#eee',
      color: '#aaa',
   },
}))

const FavoriteButton = styled(Button)(({ theme }) => ({
   minWidth: '48px',
   padding: '14px',
   border: '2px solid #eee',
   borderRadius: '12px',
   color: '#CB11AB',
   background: '#faf7fa',
   '&:hover': {
      background: '#f9f6fb',
      borderColor: '#CB11AB',
   },
}))

const TabsSection = styled(Box)(({ theme }) => ({
   backgroundColor: '#fff',
   padding: '10px',
   borderRadius: '12px',
   boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
}))

const TabContent = styled(Box)(({ theme }) => ({
   backgroundColor: '#fff',
   padding: '32px',
   borderRadius: '12px',
   boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
   marginBottom: '32px',
}))

const Description = styled(Typography)(({ theme }) => ({
   fontSize: '16px',
   lineHeight: '1.6',
   color: '#444',
   marginBottom: '25px',
}))

const MediaSection = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   marginBottom: '30px',
}))

const VideoWrapper = styled(Box)(({ theme }) => ({
   borderRadius: '10px',
   overflow: 'hidden',
   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}))

const SimilarProducts = styled(Box)(({ theme }) => ({
   marginTop: '40px',
   background: '#f9f9fb',
   borderRadius: '16px',
   padding: '32px 24px',
}))

const ProductGrid = styled(Box)(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
   gap: '32px',
}))

const CharacteristicsGrid = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '15px',
}))

const CharacteristicRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '12px 0',
   borderBottom: '1px solid #eee',
   '&:last-child': {
      borderBottom: 'none',
   },
}))

const Reviews = styled(Box)(({ theme }) => ({
   padding: '20px',
   borderRadius: '10px',
   backgroundColor: '#fff',
   boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
}))

const ReviewItem = styled(Box)(({ theme }) => ({
   padding: '15px',
   borderBottom: '1px solid #eee',
   '&:last-child': {
      borderBottom: 'none',
   },
}))

const DeliveryPayment = styled(Box)(({ theme }) => ({
   padding: '20px',
   borderRadius: '10px',
   backgroundColor: '#fff',
   boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
}))

const BannerBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: 32,
   background: '#181828',
   borderRadius: 16,
   overflow: 'hidden',
   marginBottom: 32,
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: 16,
   },
}))
const BannerText = styled(Box)(({ theme }) => ({
   color: '#fff',
   padding: '32px 32px 32px 40px',
   flex: 1,
   [theme.breakpoints.down('md')]: {
      padding: '24px',
   },
}))
const BannerImage = styled('img')({
   width: 400,
   height: '100%',
   objectFit: 'cover',
   display: 'block',
})
const VideoButton = styled(Button)(({ theme }) => ({
   background: 'linear-gradient(90deg,#CB11AB 0%,#fbc2eb 100%)',
   color: '#fff',
   fontWeight: 700,
   borderRadius: 8,
   px: 3,
   py: 1.2,
   mt: 2,
   boxShadow: '0 2px 8px #CB11AB20',
   textTransform: 'none',
   fontSize: 16,
   '&:hover': {
      background: 'linear-gradient(90deg,#CB11AB 0%,#f9c5d1 100%)',
   },
   display: 'flex',
   alignItems: 'center',
   gap: 1,
}))
const DescriptionText = styled(Typography)(({ theme }) => ({
   fontSize: 16,
   lineHeight: 1.7,
   color: '#444',
   marginBottom: 24,
}))
const SectionTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 700,
   fontSize: 18,
   margin: '32px 0 16px 0',
   color: '#222',
}))
const ProductCard = styled(Box)(({ theme }) => ({
   background: '#fff',
   borderRadius: 12,
   boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
   padding: 20,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: 1,
}))

const ReviewCard = ({ review }) => {
   const userName = review.user?.fullName || 'Аноним'
   const userAvatar = review.user?.profile
   const comment = review.review?.comment || 'Без текста'
   const rating = review.review?.rating || 0
   const createdAt = review.review?.createdAt
   const response = review.review?.response
   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mb: 3,
            p: 3,
            borderRadius: 3,
            background: '#fff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0',
         }}
      >
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {userAvatar ? (
               <img
                  src={userAvatar}
                  alt={userName}
                  style={{
                     width: 44,
                     height: 44,
                     borderRadius: '50%',
                     objectFit: 'cover',
                     background: '#eee',
                  }}
               />
            ) : (
               <Box
                  sx={{
                     width: 44,
                     height: 44,
                     borderRadius: '50%',
                     background: '#CB11AB',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     fontWeight: 700,
                     fontSize: 20,
                     color: '#fff',
                     boxShadow: '0 2px 8px rgba(251,194,235,0.2)',
                  }}
               >
                  {userName[0]}
               </Box>
            )}
            <Box>
               <Typography sx={{ fontWeight: 700, color: '#222' }}>
                  {userName}
               </Typography>
               <Typography variant="caption" color="#888">
                  {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
               </Typography>
            </Box>
         </Box>
         <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#222' }}>
               Оценка
            </Typography>
            <Rating
               value={rating}
               readOnly
               size="small"
               sx={{ color: '#eab308' }}
            />
         </Box>
         <Box sx={{ mt: 1 }}>
            <Typography
               variant="body2"
               sx={{ color: '#222', whiteSpace: 'pre-line', fontSize: 15 }}
            >
               {comment}
            </Typography>
         </Box>
         {response && (
            <Box
               sx={{
                  mt: 2,
                  background: '#f9f6fb',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  p: 2,
               }}
            >
               <Typography sx={{ fontWeight: 600, mb: 0.5, color: '#888' }}>
                  Ответ от представителя
               </Typography>
               <Typography variant="body2" sx={{ color: '#444' }}>
                  {response}
               </Typography>
            </Box>
         )}
      </Box>
   )
}

const ReviewSummaryBox = styled(Box)(({ theme }) => ({
   minWidth: 280,
   maxWidth: 320,
   background: '#fff',
   borderRadius: 20,
   boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
   padding: 32,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   border: '1px solid #f0f0f0',
}))

const CharacteristicsBlock = styled(Box)(({ theme }) => ({
   background: '#fff',
   borderRadius: 16,
   boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
   padding: '32px 40px',
   marginBottom: 32,
   [theme.breakpoints.down('md')]: {
      padding: '20px',
   },
}))
const CharSectionTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 700,
   fontSize: 18,
   marginBottom: 18,
   color: '#222',
}))
const CharTable = styled('table')({
   width: '100%',
   borderCollapse: 'collapse',
   marginBottom: 24,
})
const CharRow = styled('tr')({
   borderBottom: '1px solid #ececec',
   '&:last-child': { borderBottom: 'none' },
})
const CharCell = styled('td')({
   padding: '12px 8px',
   fontSize: 16,
   color: '#444',
   verticalAlign: 'top',
})
const CharCellTitle = styled(CharCell)({
   fontWeight: 500,
   color: '#222',
   width: '40%',
})

const TopInfoRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 24px;
   margin-bottom: 16px;
`
const ReviewsBadge = styled(Box)`
   background: #27ae60;
   color: #fff;
   border-radius: 16px;
   padding: 4px 14px;
   font-size: 16px;
   font-weight: 600;
   display: flex;
   align-items: center;
   gap: 6px;
`
const ArticleText = styled(Typography)`
   color: #888;
   font-size: 16px;
`
const StarsRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 2px;
`
const ColorDotsRow = styled(Box)`
   display: flex;
   gap: 12px;
   margin: 12px 0 24px 0;
`
const ColorDotStyled = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   width: 28,
   height: 28,
   borderRadius: '50%',
   border: active ? '3px solid #CB11AB' : '2px solid #ddd',
   boxShadow: active ? '0 0 0 2px #F3E6F9' : 'none',
   cursor: 'pointer',
   transition: 'border 0.2s, box-shadow 0.2s',
}))

const MainPrice = styled('span')`
   font-size: 40px;
   font-weight: 700;
   color: #e100af;
`
const DiscountLabel = styled('span')`
   background: #e100af;
   color: #fff;
   font-size: 18px;
   font-weight: 700;
   border-radius: 10px;
   padding: 6px 18px;
   margin-left: 8px;
`
const OldPriceStyled = styled('span')`
   font-size: 20px;
   color: #999;
   text-decoration: line-through;
   margin-left: 8px;
`

const ProductShortInfoBlock = styled(Box)`
   margin-top: 24px;
   background: #fafafa;
   border-radius: 12px;
   padding: 24px;
   max-width: 350px;
`

const ShortInfoTitle = styled(Typography)`
   font-weight: 700;
   font-size: 18px;
   margin-bottom: 18px;
`

const ShortInfoList = styled(Box)`
   display: flex;
   flex-direction: column;
   gap: 8px;
`

const ShortInfoRow = styled(Box)`
   display: flex;
   align-items: center;
   font-size: 15px;
`

const ShortInfoLabel = styled('span')`
   color: #888;
   min-width: 140px;
`

const ShortInfoDots = styled('span')`
   flex: 1;
   border-bottom: 1px dashed #d0d0d0;
   margin: 0 8px;
   height: 1px;
`

const ShortInfoValue = styled('span')`
   font-weight: 500;
   color: #222;
   min-width: 60px;
   text-align: right;
`

const DownloadPdfButton = styled(Button)`
   background: linear-gradient(90deg, #cb11ab 0%, #fbc2eb 100%);
   color: #fff;
   font-weight: 700;
   border-radius: 8px;
   box-shadow: 0 2px 8px #cb11ab20;
   text-transform: none;
   font-size: 16px;
   &:hover {
      background: linear-gradient(90deg, #cb11ab 0%, #f9c5d1 100%);
   }
`
