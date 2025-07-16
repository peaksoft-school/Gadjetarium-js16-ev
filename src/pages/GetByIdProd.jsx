import { Box, Typography, Button as MUIButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, fetchProductById } from '../store/products/productThunk'
import {
   fetchReviewsByStatus,
   postReviewResponse,
   updateReviewResponse,
} from '../store/reviews/ReviewsThunk'
import { useNavigate, useParams } from 'react-router'
import { Icons } from '../assets/icons'
import PhonesSlider from '../components/PhonesSlider'

const ProductDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [selectedColor, setSelectedColor] = useState(null)
   const [selectedTab, setSelectedTab] = useState(0)
   const navigate = useNavigate()

   const { selectedProduct, selectedLoading, selectedError } = useSelector(
      (state) => state.product
   )

   const handleDelete = () => {
      dispatch(deleteProduct(id))
      navigate('/admin/products')
   }

   useEffect(() => {
      if (id) dispatch(fetchProductById(id))
   }, [id, dispatch])
   const reviewsStatus = useSelector((state) => state.reviews.status)
   useEffect(() => {
      if (reviewsStatus === 'idle') {
         dispatch(fetchReviewsByStatus('все'))
      }
   }, [dispatch, reviewsStatus])

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
      count,
      price,
      discount,
      oldPrice,
      images = [],
      productResponse = {},
   } = selectedProduct

   const colorList = Object.entries(productResponse.colors || {})
   const { brand } = productResponse

   const specs = [
      { label: 'Цвет', value: color || '-' },
      { label: 'Дата выпуска', value: productResponse.date || '-' },
      { label: 'Гарантия (месяцев)', value: productResponse.warranty || '-' },
      { label: 'Память', value: attributes.Memory || '-' },
      { label: 'Оперативная память', value: attributes.RAM || '-' },
      { label: 'Батарея', value: attributes.Battery || '-' },
      { label: 'Камера', value: attributes.Camera || '-' },
   ]

   return (
      <Box>
         {/* Хлебные крошки — отдельной строкой */}
         <Box maxWidth={1240} mx="auto" mt={4} mb={1}>
            <Breadcrumbs>Товар › {productResponse.name}</Breadcrumbs>
         </Box>
         <Wrapper>
            <BrandTopContainer>
               <BrandLogo src={brand.imageUrl} alt={brand.name} />
               <Typography ml={2} fontSize={20} fontWeight={600}>
                  {brand.name}
               </Typography>
            </BrandTopContainer>
            <MainContainer>
               <LeftSide>
                  <PhonesSlider images={images} />
               </LeftSide>
               <RightSide>
                  <Title>{productResponse.name}</Title>
                  <InfoRow>
                     <InStock>В наличии ({count})</InStock>
                     <Article>Артикул: {article}</Article>
                  </InfoRow>
                  <Rating>
                     <img
                        src={Icons.starFul}
                        alt="star"
                        width={16}
                        height={16}
                     />
                     <span>4.5</span>
                     <span style={{ color: '#888' }}>(56)</span>
                  </Rating>
                  <PriceBlock>
                     {discount && <Discount>-{discount}%</Discount>}
                     <Price>{price} c</Price>
                     {oldPrice && <OldPrice>{oldPrice} c</OldPrice>}
                  </PriceBlock>
                  <ColorLabel>Цвет товара:</ColorLabel>
                  <ColorRow>
                     {colorList.map(([key, value]) => (
                        <ColorDot
                           key={key}
                           onClick={() => setSelectedColor(key)}
                           active={selectedColor === key}
                           sx={{
                              backgroundColor:
                                 value === 'Silver'
                                    ? '#C0C0C0'
                                    : value === 'Black'
                                      ? '#000'
                                      : value === 'White'
                                        ? '#fff'
                                        : value === 'Gold'
                                          ? '#FFD700'
                                          : value.toLowerCase(),
                           }}
                        />
                     ))}
                  </ColorRow>
                  <SpecTitle>Коротко о товаре:</SpecTitle>
                  <SpecBlock>
                     {specs.map(({ label, value }, idx) => {
                        if (value !== '-') {
                           return (
                              <SpecRow key={idx}>
                                 <span style={{ color: '#777' }}>{label}</span>
                                 <span style={{ fontWeight: 500 }}>
                                    {value}
                                 </span>
                              </SpecRow>
                           )
                        }
                        return null
                     })}
                  </SpecBlock>
                  <ActionRow>
                     <IconBtn onClick={() => handleDelete()}>
                        <img src={Icons.deleteb} alt="basket" />
                     </IconBtn>
                  </ActionRow>
               </RightSide>
            </MainContainer>
         </Wrapper>
         {/* Кнопка скачать — под карточкой товара */}
         <Box
            maxWidth={1240}
            mx="auto"
            mb={2}
            display="flex"
            justifyContent="flex-end"
         >
            <DownloadLink
               href={productResponse.pdfUrl}
               download
               target="_blank"
               rel="noopener noreferrer"
            >
               <img src={Icons.download} alt="pdf" width={16} height={16} />
               Скачать документ.pdf
            </DownloadLink>
         </Box>
         {/* Табы */}
         <Box
            display="flex"
            alignItems="center"
            maxWidth={1240}
            mx="auto"
            mb={2}
         >
            <TabsRow style={{ marginBottom: 0 }}>
               <Tab
                  active={selectedTab === 0}
                  onClick={() => setSelectedTab(0)}
               >
                  Описание
               </Tab>
               <Tab
                  active={selectedTab === 1}
                  onClick={() => setSelectedTab(1)}
               >
                  Характеристики
               </Tab>
               <Tab
                  active={selectedTab === 2}
                  onClick={() => setSelectedTab(2)}
               >
                  Отзывы
               </Tab>
            </TabsRow>
         </Box>
         {/* Контент таба */}
         {selectedTab === 0 && (
            <Box maxWidth={900} mx="auto" mt={4} mb={4}>
               {/* Баннер с картинкой, текстом и кнопкой */}
               <Box
                  sx={{
                     background: '#191C1F',
                     borderRadius: '10px',
                     overflow: 'hidden',
                     mb: 4,
                     display: 'flex',
                     alignItems: 'center',
                     position: 'relative',
                     minHeight: 220,
                  }}
               >
                  {images && images[0] && (
                     <img
                        src={images[0]}
                        alt={productResponse.name}
                        style={{
                           width: '100%',
                           height: '100%',
                           objectFit: 'cover',
                           opacity: 0.7,
                           position: 'absolute',
                           left: 0,
                           top: 0,
                        }}
                     />
                  )}
                  <Box
                     sx={{
                        position: 'relative',
                        zIndex: 2,
                        color: '#fff',
                        p: 4,
                        maxWidth: 400,
                     }}
                  >
                     <Typography fontSize={20} fontWeight={500} mb={2}>
                        {productResponse.description ||
                           'Описание товара отсутствует.'}
                     </Typography>
                     {productResponse.videoUrl && (
                        <a
                           href={productResponse.videoUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           style={{ textDecoration: 'none' }}
                        >
                           <MUIButton
                              variant="contained"
                              color="error"
                              sx={{ borderRadius: 2, mt: 2 }}
                              startIcon={
                                 <svg
                                    width="20"
                                    height="20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <circle
                                       cx="10"
                                       cy="10"
                                       r="10"
                                       fill="#fff"
                                       fillOpacity="0.2"
                                    />
                                    <polygon
                                       points="8,6 15,10 8,14"
                                       fill="#fff"
                                    />
                                 </svg>
                              }
                           >
                              Видео о товаре
                           </MUIButton>
                        </a>
                     )}
                  </Box>
               </Box>
               <Typography fontWeight={700} fontSize={18} mb={2}>
                  Подробнее о {productResponse.name}
               </Typography>
               <Typography mb={2} color="#444">
                  {productResponse.description || 'Нет описания'}
               </Typography>
               {productResponse.Memory && (
                  <Typography mb={2} color="#444">
                     <b>Память:</b> {productResponse.Memory}
                  </Typography>
               )}
               {productResponse.Processor && (
                  <Typography mb={2} color="#444">
                     <b>Процессор:</b> {productResponse.Processor}
                  </Typography>
               )}
               {productResponse.Display && (
                  <Typography mb={2} color="#444">
                     <b>Дисплей:</b> {productResponse.Display}
                  </Typography>
               )}
               {attributes && Object.keys(attributes).length > 0 && (
                  <Box mt={4}>
                     <Typography fontWeight={700} fontSize={18} mb={2}>
                        Характеристики товара
                     </Typography>
                     <Box
                        component="table"
                        sx={{
                           width: '100%',
                           borderCollapse: 'collapse',
                           background: '#fafafa',
                           borderRadius: 2,
                           overflow: 'hidden',
                        }}
                     >
                        <tbody>
                           {Object.entries(attributes).map(([key, value]) => (
                              <tr key={key}>
                                 <td
                                    style={{
                                       color: '#5A5A5A',
                                       fontWeight: 500,
                                       padding: '8px 12px',
                                       borderBottom: '1px solid #eee',
                                       minWidth: 180,
                                    }}
                                 >
                                    {key}
                                 </td>
                                 <td
                                    style={{
                                       color: '#222',
                                       padding: '8px 12px',
                                       borderBottom: '1px solid #eee',
                                    }}
                                 >
                                    {value}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Box>
                  </Box>
               )}
            </Box>
         )}
         {selectedTab === 1 && (
            <Box maxWidth={900} mx="auto" mt={4} mb={4}>
               <CharacteristicsAccordion
                  attributes={attributes}
                  productResponse={productResponse}
               />
            </Box>
         )}
         {selectedTab === 2 && <ReviewsSection />}
      </Box>
   )
}

const ReviewsSection = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const reviews = useSelector((state) => state.reviews.items)
   const productReviews = reviews.filter(
      (r) => String(r.product?.id) === String(id)
   )

   const total = productReviews.length
   const avg = total
      ? (
           productReviews.reduce((acc, r) => acc + (r.review?.rating || 0), 0) /
           total
        ).toFixed(1)
      : 0
   const byStars = [5, 4, 3, 2, 1].map((star) => ({
      stars: star,
      count: productReviews.filter((r) => r.review?.rating === star).length,
   }))

   const [replyOpen, setReplyOpen] = useState(null)
   const [editOpen, setEditOpen] = useState(null)
   const [replyValue, setReplyValue] = useState('')

   return (
      <ReviewsWrapper>
         <ReviewsTitle>Отзывы</ReviewsTitle>
         <ReviewsContent>
            <Box flex={2}>
               {productReviews.length === 0 && (
                  <Typography>Нет отзывов</Typography>
               )}
               {productReviews.map((r) => {
                  const hasResponse = Boolean(r.review.response)
                  return (
                     <ReviewCard key={r.review.id}>
                        <ReviewHeader>
                           <Avatar src={r.user.profile} />
                           <Box>
                              <ReviewName>{r.user.fullName}</ReviewName>
                              <ReviewDate>
                                 {new Date(r.review.createdAt).toLocaleString(
                                    'ru-RU'
                                 )}
                              </ReviewDate>
                           </Box>
                        </ReviewHeader>
                        <ReviewRating>
                           Оценка
                           <Stars>
                              {Array.from({ length: 5 }).map((_, i) => (
                                 <Star key={i} active={i < r.review.rating}>
                                    ★
                                 </Star>
                              ))}
                           </Stars>
                        </ReviewRating>
                        <ReviewText>{r.review.comment}</ReviewText>
                        {r.review.images && r.review.images.length > 0 && (
                           <Box display="flex" gap={1} mb={1} flexWrap="wrap">
                              {r.review.images.map((img, idx) => (
                                 <img
                                    key={idx}
                                    src={img}
                                    alt="review-img"
                                    style={{
                                       width: 60,
                                       height: 60,
                                       objectFit: 'cover',
                                       borderRadius: 6,
                                    }}
                                 />
                              ))}
                           </Box>
                        )}
                        {hasResponse && (
                           <ReviewAnswer>
                              <b>Ответ от представителя</b>
                              <div>{r.review.response}</div>
                           </ReviewAnswer>
                        )}
                        <ReviewActions>
                           {!hasResponse &&
                              (replyOpen === r.review.id ? (
                                 <form
                                    onSubmit={(e) => {
                                       e.preventDefault()
                                       dispatch(
                                          postReviewResponse({
                                             reviewId: r.review.id,
                                             response: replyValue,
                                          })
                                       ).then(() => {
                                          setReplyOpen(null)
                                          setReplyValue('')
                                       })
                                    }}
                                    style={{ display: 'flex', gap: 8 }}
                                 >
                                    <input
                                       type="text"
                                       value={replyValue}
                                       onChange={(e) =>
                                          setReplyValue(e.target.value)
                                       }
                                       placeholder="Введите ответ..."
                                       style={{
                                          flex: 1,
                                          padding: 6,
                                          borderRadius: 4,
                                          border: '1px solid #ccc',
                                       }}
                                       autoFocus
                                    />
                                    <button
                                       type="submit"
                                       style={{
                                          background: '#C26AEC',
                                          color: '#fff',
                                          border: 'none',
                                          borderRadius: 4,
                                          padding: '6px 14px',
                                          cursor: 'pointer',
                                       }}
                                    >
                                       Ответить
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => setReplyOpen(null)}
                                       style={{
                                          background: 'transparent',
                                          color: '#888',
                                          border: 'none',
                                          marginLeft: 4,
                                          cursor: 'pointer',
                                       }}
                                    >
                                       Отмена
                                    </button>
                                 </form>
                              ) : (
                                 <ReplyLink
                                    onClick={() => {
                                       setReplyOpen(r.review.id)
                                       setReplyValue('')
                                    }}
                                 >
                                    Ответить
                                 </ReplyLink>
                              ))}
                           {hasResponse &&
                              (editOpen === r.review.id ? (
                                 <form
                                    onSubmit={(e) => {
                                       e.preventDefault()
                                       dispatch(
                                          updateReviewResponse({
                                             reviewId: r.review.id,
                                             response: replyValue,
                                          })
                                       ).then(() => {
                                          setEditOpen(null)
                                          setReplyValue('')
                                       })
                                    }}
                                    style={{ display: 'flex', gap: 8 }}
                                 >
                                    <input
                                       type="text"
                                       value={replyValue}
                                       onChange={(e) =>
                                          setReplyValue(e.target.value)
                                       }
                                       placeholder="Изменить ответ..."
                                       style={{
                                          flex: 1,
                                          padding: 6,
                                          borderRadius: 4,
                                          border: '1px solid #ccc',
                                       }}
                                       autoFocus
                                    />
                                    <button
                                       type="submit"
                                       style={{
                                          background: '#C26AEC',
                                          color: '#fff',
                                          border: 'none',
                                          borderRadius: 4,
                                          padding: '6px 14px',
                                          cursor: 'pointer',
                                       }}
                                    >
                                       Сохранить
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => setEditOpen(null)}
                                       style={{
                                          background: 'transparent',
                                          color: '#888',
                                          border: 'none',
                                          marginLeft: 4,
                                          cursor: 'pointer',
                                       }}
                                    >
                                       Отмена
                                    </button>
                                 </form>
                              ) : (
                                 <EditLink
                                    onClick={() => {
                                       setEditOpen(r.review.id)
                                       setReplyValue(r.review.response || '')
                                    }}
                                 >
                                    Редактировать
                                 </EditLink>
                              ))}
                        </ReviewActions>
                     </ReviewCard>
                  )
               })}
            </Box>
            <Box flex={1}>
               <StatsCard>
                  <StatsAvgRow>
                     <StatsAvg>{avg}</StatsAvg>
                     <Stars>
                        {Array.from({ length: 5 }).map((_, i) => (
                           <Star key={i} active={i < Math.round(avg)}>
                              ★
                           </Star>
                        ))}
                     </Stars>
                  </StatsAvgRow>
                  <StatsTotal>
                     {total} отзыв
                     {total === 1 ? '' : total >= 2 && total <= 4 ? 'а' : 'ов'}
                  </StatsTotal>
                  <StatsStarsList>
                     {byStars.map((s) => (
                        <StatsStarsRow key={s.stars}>
                           <Stars style={{ minWidth: 70 }}>
                              {Array.from({ length: s.stars }).map((_, i) => (
                                 <Star key={i} active>
                                    ★
                                 </Star>
                              ))}
                           </Stars>
                           <StatsCount>
                              {s.count} отзыв
                              {s.count === 1
                                 ? ''
                                 : s.count >= 2 && s.count <= 4
                                   ? 'а'
                                   : 'ов'}
                           </StatsCount>
                        </StatsStarsRow>
                     ))}
                  </StatsStarsList>
               </StatsCard>
            </Box>
         </ReviewsContent>
      </ReviewsWrapper>
   )
}

import { useState as useAccordionState } from 'react'
const CharacteristicsAccordion = ({
   attributes = {},
   productResponse = {},
}) => {
   const keyToLabel = {
      type: 'Тип дорожки',
      enginePower: 'Мощность двигателя',
      engineType: 'Тип двигателя',
      speedRange: 'Регулировка скорости',
      runningBelt: 'Беговое полотно',
      incline: 'Наклон бегового полотна',
      beltSize: 'Размер бегового полотна (ДхШ)',
      shaftDiameter: 'Диаметр задних валов',
      trainingPrograms: 'Программы тренировки',
      RAM: 'Оперативная память',
      Memory: 'Память',
      CPU: 'Процессор',
      Processor: 'Процессор',
      warranty: 'Гарантия',
      date: 'Дата выпуска',
      Battery: 'Батарея',
      Camera: 'Камера',
      Display: 'Дисплей',
   }
   const keyToSection = {
      type: 'Основные характеристики',
      enginePower: 'Основные характеристики',
      engineType: 'Основные характеристики',
      speedRange: 'Основные характеристики',
      runningBelt: 'Основные характеристики',
      incline: 'Основные характеристики',
      beltSize: 'Основные характеристики',
      shaftDiameter: 'Основные характеристики',
      trainingPrograms: 'Основные характеристики',
      Battery: 'Основные характеристики',
      Camera: 'Основные характеристики',
      Display: 'Основные характеристики',
      // Память и процессор
      RAM: 'Память и процессор',
      Memory: 'Память и процессор',
      'Объем памяти': 'Память и процессор',
      'Оперативная память': 'Память и процессор',
      CPU: 'Память и процессор',
      Processor: 'Память и процессор',
      warranty: 'Дополнительные характеристики',
      date: 'Дополнительные характеристики',
   }
   const allPairs = [
      ...Object.entries(attributes || {}),
      ...Object.entries(productResponse || {}),
   ].filter(
      ([key, value]) =>
         value !== undefined && value !== null && value !== '' && value !== '-'
   )
   const sectionOrder = [
      'Основные характеристики',
      'Память и процессор',
      'Дополнительные характеристики',
   ]
   const sectionMap = {
      'Основные характеристики': [],
      'Память и процессор': [],
      'Дополнительные характеристики': [],
   }
   allPairs.forEach(([key, value]) => {
      const section = keyToSection[key] || 'Дополнительные характеристики'
      const label = keyToLabel[key] || key
      if (
         [
            'id',
            'name',
            'colors',
            'imageUrl',
            'pdfUrl',
            'videoUrl',
            'productTypeId',
            'totalPrice',
            'brand',
            'count',
            'article',
            'basketed',
            'liked',
            'price',
            'discount',
            'oldPrice',
            'available',
            'productResponse',
            'attributes',
            'images',
         ].includes(key)
      )
         return
      sectionMap[section].push([label, value])
   })
   const sections = sectionOrder
      .map((title) => ({ title, rows: sectionMap[title] }))
      .filter((section) => section.rows.length > 0)
   const [open, setOpen] = useAccordionState(0)
   return (
      <>
         {sections.map((section, idx) => (
            <AccordionBlock key={section.title}>
               <AccordionHeader
                  onClick={() => setOpen(open === idx ? -1 : idx)}
               >
                  <AccordionTitle active={open === idx}>
                     {section.title}
                  </AccordionTitle>
                  <AccordionArrow active={open === idx}>↑</AccordionArrow>
               </AccordionHeader>
               {open === idx && (
                  <AccordionTable>
                     <tbody>
                        {section.rows.map(([label, value]) => (
                           <tr key={label}>
                              <td
                                 style={{
                                    color: '#5A5A5A',
                                    fontWeight: 500,
                                    padding: '8px 12px',
                                    borderBottom: '1px solid #eee',
                                 }}
                              >
                                 {label}
                              </td>
                              <td
                                 style={{
                                    color: '#222',
                                    padding: '8px 12px',
                                    borderBottom: '1px solid #eee',
                                 }}
                              >
                                 {value}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </AccordionTable>
               )}
            </AccordionBlock>
         ))}
      </>
   )
}

export default ProductDetails

const Wrapper = styled(Box)`
   max-width: 1240px;
   margin: 40px auto;
   padding: 32px;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
   display: flex;
   flex-direction: column;
   align-items: stretch;
`

const Breadcrumbs = styled(Typography)`
   font-size: 14px;
   color: #666;
   margin-bottom: 20px;
`

const BrandTopContainer = styled(Box)`
   margin-bottom: 16px;
   display: flex;
   align-items: center;
`

const BrandLogo = styled('img')`
   height: 40px;
   object-fit: contain;
`

const MainContainer = styled(Box)`
   display: flex;
   gap: 40px;
   flex-wrap: wrap;
   align-items: flex-start;
`

const LeftSide = styled(Box)`
   flex: 1;
   min-width: 360px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`

const RightSide = styled(Box)`
   flex: 1;
   min-width: 400px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
`

const Title = styled(Typography)`
   font-size: 32px;
   font-weight: bold;
   margin-bottom: 20px;
`

const InfoRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 24px;
   margin-bottom: 20px;
`

const InStock = styled('span')`
   background: #e8f5e8;
   color: #4caf50;
   padding: 4px 8px;
   border-radius: 12px;
   font-size: 12px;
   border: 1px solid #4caf50;
`

const Article = styled('span')`
   font-size: 14px;
   color: #666;
`

const Rating = styled(Box)`
   display: flex;
   align-items: center;
   gap: 6px;
   margin-bottom: 24px;
   font-size: 14px;
`

const PriceBlock = styled(Box)`
   display: flex;
   align-items: center;
   gap: 16px;
   margin-bottom: 30px;
`

const Discount = styled('span')`
   background: #ff5252;
   color: white;
   padding: 4px 8px;
   border-radius: 12px;
   font-size: 12px;
   font-weight: bold;
`

const Price = styled('span')`
   font-size: 32px;
   font-weight: bold;
   &::after {
      content: ' c';
      font-size: 18px;
      font-weight: 400;
      margin-left: 2px;
   }
`

const OldPrice = styled('span')`
   font-size: 18px;
   color: #999;
   text-decoration: line-through;
   &::after {
      content: ' c';
      font-size: 15px;
      font-weight: 400;
      margin-left: 2px;
   }
`

const ColorLabel = styled('h3')`
   font-size: 16px;
   margin-bottom: 10px;
`

const ColorRow = styled(Box)`
   display: flex;
   gap: 8px;
   margin-bottom: 30px;
`

const ColorDot = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   width: 24,
   height: 24,
   borderRadius: '50%',
   border: active ? '3px solid #1976d2' : '2px solid #ddd',
   cursor: 'pointer',
}))

const SpecTitle = styled('h3')`
   font-size: 18px;
   font-weight: 500;
   margin-bottom: 20px;
`

const SpecBlock = styled(Box)`
   border-top: 1px solid #f0f0f0;
   width: 400px;
   margin-bottom: 24px;
`
const SpecRow = styled(Box)`
   display: flex;
   justify-content: space-between;
   padding: 12px 0;
   border-bottom: 1px solid #f0f0f0;
   font-size: 14px;
   gap: 24px;
   align-items: center;
   & > span:first-of-type {
      min-width: 180px;
      max-width: 220px;
      text-align: left;
      color: #5a5a5a;
      font-weight: 500;
   }
   & > span:last-of-type {
      text-align: left;
      color: #222;
      font-weight: 500;
   }
`

const ActionRow = styled(Box)`
   display: flex;
   gap: 16px;
   margin-bottom: 24px;
`

const IconBtn = styled(MUIButton)`
   width: 48px;
   height: 48px;
   border-radius: 8px;
   border: 1px solid #e2e8f0;
   background: #fff;
`

const DownloadLink = styled('a')`
   display: inline-flex;
   align-items: center;
   gap: 8px;
   font-size: 14px;
   color: #1976d2;
   text-decoration: none;
   &:hover {
      color: #8b5cf6;
   }
`

const ReviewsWrapper = styled(Box)`
   max-width: 1240px;
   margin: 40px auto;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
   padding: 32px;
   margin-top: 32px;
`
const TabsRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 32px;
   margin-bottom: 32px;
`
const Tab = styled('div')(
   ({ active }) => `
   font-size: 16px;
   font-weight: 500;
   color: ${active ? '#CB11AB' : '#222'};
   border-bottom: 2px solid ${active ? '#CB11AB' : 'transparent'};
   padding-bottom: 4px;
   cursor: pointer;
   transition: color .2s;
`
)
const PdfLink = styled('a')`
   display: flex;
   align-items: center;
   gap: 8px;
   color: #222;
   font-size: 14px;
   text-decoration: none;
   margin-left: auto;
   &:hover {
      color: #cb11ab;
   }
`
const PdfIcon = () => (
   <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="4" fill="#F3F3F3" />
      <path d="M6.5 6.5h7v7h-7v-7z" stroke="#CB11AB" strokeWidth="1.2" />
      <path d="M8 9h4v2H8V9z" fill="#CB11AB" />
   </svg>
)
const ReviewsContent = styled(Box)`
   display: flex;
   gap: 40px;
`
const ReviewsTitle = styled('h2')`
   font-size: 28px;
   font-weight: 700;
   margin-bottom: 24px;
`
const ReviewCard = styled(Box)`
   background: #fff;
   border-radius: 10px;
   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
   padding: 24px;
   margin-bottom: 24px;
   border: 1px solid #eee;
`
const ReviewHeader = styled(Box)`
   display: flex;
   align-items: center;
   gap: 16px;
   margin-bottom: 8px;
`
const Avatar = styled('img')`
   width: 40px;
   height: 40px;
   border-radius: 50%;
   object-fit: cover;
   border: 1px solid #eee;
`
const ReviewName = styled('div')`
   font-weight: 600;
   font-size: 16px;
`
const ReviewDate = styled('div')`
   font-size: 13px;
   color: #888;
`
const ReviewRating = styled(Box)`
   display: flex;
   align-items: center;
   gap: 8px;
   font-size: 15px;
   margin-bottom: 8px;
`
const Stars = styled('span')`
   color: #ffd600;
   font-size: 16px;
   margin-left: 8px;
`
const Star = styled('span')(
   ({ active }) => `
   color: ${active ? '#FFD600' : '#E0E0E0'};
   font-size: 18px;
`
)
const ReviewText = styled('div')`
   font-size: 15px;
   margin-bottom: 12px;
   color: #222;
`
const ReviewAnswer = styled('div')`
   background: #f3f3f3;
   border-radius: 8px;
   padding: 12px 16px;
   margin-bottom: 8px;
   color: #444;
   font-size: 15px;
`
const ReviewActions = styled('div')`
   display: flex;
   gap: 16px;
   font-size: 14px;
   margin-top: 4px;
`
const EditLink = styled('span')`
   color: #cb11ab;
   cursor: pointer;
   &:hover {
      text-decoration: underline;
   }
`
const ReplyLink = styled(EditLink)``
const PaginationRow = styled('div')`
   display: flex;
   gap: 8px;
   align-items: center;
   justify-content: center;
   margin: 32px 0 0 0;
`
const PageBtn = styled('button')(
   ({ active }) => `
   background: ${active ? '#CB11AB' : '#fff'};
   color: ${active ? '#fff' : '#CB11AB'};
   border: 1px solid #CB11AB;
   border-radius: 50%;
   width: 32px;
   height: 32px;
   font-size: 15px;
   cursor: pointer;
   transition: all .2s;
`
)
const PageDots = styled('span')`
   color: #888;
   font-size: 18px;
   margin: 0 4px;
`
const StatsCard = styled(Box)`
   background: #f3f3f3;
   border-radius: 12px;
   padding: 24px 20px;
   min-width: 220px;
   max-width: 300px;
   margin-left: auto;
`
const StatsAvgRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 12px;
   margin-bottom: 8px;
`
const StatsAvg = styled('span')`
   font-size: 32px;
   font-weight: 700;
   color: #222;
`
const StatsTotal = styled('div')`
   font-size: 15px;
   color: #888;
   margin-bottom: 16px;
`
const StatsStarsList = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 6px;
`
const StatsStarsRow = styled('div')`
   display: flex;
   align-items: center;
   gap: 8px;
`
const StatsCount = styled('span')`
   font-size: 14px;
   color: #888;
`

const AccordionBlock = styled('div')`
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
   margin-bottom: 18px;
   overflow: hidden;
`
const AccordionHeader = styled('div')`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 18px 24px;
   cursor: pointer;
   background: #f7f7f7;
   border-bottom: 1px solid #eee;
`
const AccordionTitle = styled('div')`
   font-size: 18px;
   font-weight: 700;
   color: #2d2d2d;
   ${({ active }) => active && 'color: #CB11AB;'}
`
const AccordionArrow = styled('span')`
   font-size: 22px;
   color: #cb11ab;
   transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0)')};
   transition: transform 0.2s;
`
const AccordionTable = styled('table')`
   width: 100%;
   border-collapse: collapse;
   background: #fff;
   td:first-child {
      width: 220px;
      min-width: 180px;
      max-width: 260px;
      text-align: left;
      font-weight: 500;
      color: #5a5a5a;
      padding: 8px 12px;
      border-bottom: 1px solid #eee;
   }
   td:last-child {
      text-align: left;
      color: #222;
      padding: 8px 12px;
      border-bottom: 1px solid #eee;
   }
`

// Вернуть стили StepperRow, StepCircle, StepLabel, StepDivider для вертикального степпера
const StepperRow = styled(Box)`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 18px;
   margin-bottom: 32px;
`
const StepCircle = styled('div')(
   ({ active }) => `
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${active ? '#CB11AB' : '#E0E0E0'};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 4px;
  `
)
const StepLabel = styled('div')(
   ({ active }) => `
    font-size: 16px;
    font-weight: 500;
    color: ${active ? '#CB11AB' : '#888'};
    margin-bottom: 12px;
  `
)
const StepDivider = styled('div')`
   width: 2px;
   height: 24px;
   background: #e0e0e0;
   margin-left: 17px;
`
