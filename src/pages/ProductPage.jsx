import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, styled } from '@mui/material'
import { fetchProducts2 } from '../store/product/productThunk2'
import { fetchBanner2 } from '../store/banner/bannerThunk2'
import { fetchProductDetail } from '../store/product/productThunk2'
import { useNavigate } from 'react-router-dom'
import Card from '../components/UI/cards/Card'
import { Icons } from '../assets/icons'
import UserHeader from '../layout/user/UserHeader'
import Footer from '../layout/Footer'
import BannerSlider from '../components/BannerSlider'
import {
   toggleFavoriteOnServer,
   getFavoritesFromServer,
} from '../store/favorites/favoritesSlice'
import { addToBasket } from '../store/basket/basketThunk'
import { useState } from 'react'
import { showToast } from '../utils/helpers/showToast'

const ProductPage = () => {
   const [visibleSale, setVisibleSale] = useState(4)
   const [visibleNew, setVisibleNew] = useState(4)
   const [visibleRecommend, setVisibleRecommend] = useState(4)

   const dispatch = useDispatch()
   const {
      sale = [],
      new: newItems = [],
      recommend = [],
      loading,
      error,
      selectedProduct,
   } = useSelector((state) => state.products)
   const { banner, bannerLoading, bannerError } = useSelector(
      (state) => state.banner2
   )
   const favoriteIds = useSelector((state) => state.favorites.ids)
   const navigate = useNavigate()

   const userId = useSelector((state) => state.auth?.user?.id || 1)

   useEffect(() => {
      dispatch(fetchBanner2())
      dispatch(fetchProducts2({ status: 'акции', page: 1, size: 10, userId }))
      dispatch(fetchProducts2({ status: 'новинки', page: 1, size: 10, userId }))
      dispatch(
         fetchProducts2({ status: 'мы рекомендуем', page: 1, size: 10, userId })
      )
      dispatch(getFavoritesFromServer(userId))
      console.log(
         'Available product IDs:',
         sale.map((p) => p.productTypeId)
      )
   }, [dispatch, userId])

   if (loading || bannerLoading) return <Typography>Загрузка...</Typography>
   if (error || bannerError)
      return (
         <Typography color="error">Ошибка: {error || bannerError}</Typography>
      )

   const handleCardClick = (productTypeId) => {
      console.log(
         'handleCardClick triggered with productTypeId:',
         productTypeId
      )
      dispatch(fetchProductDetail(productTypeId))
      navigate(`/product/${productTypeId}`)
      console.log('Navigating to:', `/product/${productTypeId}`)
   }

   const handleAddToBasket = async (product) => {
      try {
         await dispatch(
            addToBasket({ productId: product.productTypeId, quantity: 1 })
         ).unwrap()
         showToast({ message: 'Товар успешно добавлен в корзину!' })
      } catch (e) {
         showToast({ message: 'Ошибка добавления в корзину', type: 'error' })
         console.error('Ошибка добавления в корзину:', e)
      }
   }

   const renderSaleCard = (product, index) => (
      <StyledCard
         key={index}
         image={product.imageUrl}
         title={product.name}
         oldPrice={product.price}
         discountValue={product.discount}
         rating={product.rating}
         reviews={100}
         inStock={product.count}
         isLiked={favoriteIds
            .map(String)
            .includes(String(product.productTypeId))}
         productId={product.productTypeId}
         onToggleFavorite={(id) =>
            dispatch(toggleFavoriteOnServer({ productTypeId: id, userId }))
         }
         onAddToCart={() => handleAddToBasket(product)}
         onClick={() => {
            console.log('Card clicked, product:', product)
            handleCardClick(product.productTypeId)
         }}
         sx={{
            '&:before': {
               content: `"-${product.discount || 0}%"`,
               position: 'absolute',
               top: 8,
               left: 8,
               backgroundColor: '#FF3B30',
               color: 'white',
               fontSize: '12px',
               padding: '4px 8px',
               borderRadius: 8,
               zIndex: 1,
            },
            cursor: 'pointer',
         }}
      />
   )

   const renderNewCard = (product, index) => (
      <StyledCard
         key={index}
         image={product.imageUrl}
         title={product.name}
         oldPrice={product.price}
         image2={Icons.newCircle}
         rating={product.rating}
         reviews={100}
         inStock={product.count}
         isLiked={favoriteIds
            .map(String)
            .includes(String(product.productTypeId))}
         productId={product.productTypeId}
         onToggleFavorite={(id) =>
            dispatch(toggleFavoriteOnServer({ productTypeId: id, userId }))
         }
         onAddToCart={() => handleAddToBasket(product)}
         onClick={() => {
            console.log('Card clicked, product:', product)
            handleCardClick(product.productTypeId)
         }}
         sx={{
            '&:before': {
               content: '"New"',
               position: 'absolute',
               top: 8,
               left: 8,
               backgroundColor: '#34C759',
               color: 'white',
               fontSize: '12px',
               padding: '4px 8px',
               borderRadius: 8,
               zIndex: 1,
            },
            cursor: 'pointer',
         }}
      />
   )

   const renderRecommendCard = (product, index) => (
      <StyledCard
         key={index}
         image={product.imageUrl}
         title={product.name}
         oldPrice={product.price}
         image2={Icons.blueLike}
         rating={product.rating}
         reviews={100}
         inStock={product.count}
         isLiked={favoriteIds
            .map(String)
            .includes(String(product.productTypeId))}
         productId={product.productTypeId}
         onToggleFavorite={(id) =>
            dispatch(toggleFavoriteOnServer({ productTypeId: id, userId }))
         }
         onAddToCart={() => handleAddToBasket(product)}
         onClick={() => {
            console.log('Card clicked, product:', product)
            handleCardClick(product.productTypeId)
         }}
         sx={{ cursor: 'pointer' }}
      />
   )

   const renderSection = (
      title,
      items,
      renderCardFunc,
      visibleCount,
      setVisibleCount
   ) => {
      if (!Array.isArray(items) || items.length === 0) {
         return (
            <Box width="100%">
               <SectionTitle>{title}</SectionTitle>
               <Typography sx={{ textAlign: 'center', color: '#888', mb: 4 }}>
                  Пусто
               </Typography>
            </Box>
         )
      }
      return (
         <Box width="100%">
            <SectionTitle>{title}</SectionTitle>
            <CardsContainer $isFullRow={items.length >= 5}>
               {items
                  .slice(0, visibleCount)
                  .map((product, index) => renderCardFunc(product, index))}
            </CardsContainer>
            {visibleCount < items.length && (
               <ButtonWrapper>
                  <MoreButton
                     variant="outlined"
                     onClick={() => setVisibleCount(visibleCount + 4)}
                  >
                     Показать ещё
                  </MoreButton>
               </ButtonWrapper>
            )}
         </Box>
      )
   }

   return (
      <>
         <UserHeader />
         <br />
         {banner?.images?.length > 0 && <BannerSlider images={banner.images} />}
         <br />
         <PageWrapper>
            {renderSection(
               'Акции',
               sale,
               renderSaleCard,
               visibleSale,
               setVisibleSale
            )}
            {renderSection(
               'Новинки',
               newItems,
               renderNewCard,
               visibleNew,
               setVisibleNew
            )}
            {renderSection(
               'Мы рекомендуем',
               recommend,
               renderRecommendCard,
               visibleRecommend,
               setVisibleRecommend
            )}
         </PageWrapper>
         <Footer />
      </>
   )
}

export default ProductPage

const PageWrapper = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   padding: '40px 20px',
   gap: '60px',
   backgroundColor: '#f3f3f3',
}))

const SectionTitle = styled(Typography)(() => ({
   fontSize: '24px',
   fontWeight: '700',
   textAlign: 'center',
   textTransform: 'uppercase',
   marginBottom: '24px',
}))

const CardsContainer = styled(Box, {
   shouldForwardProp: (prop) => prop !== '$isFullRow',
})(({ $isFullRow }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: $isFullRow ? 'center' : 'flex-start',
   gap: '24px',
   width: '100%',
   maxWidth: '1300px',
   margin: '0 auto',
}))

const ButtonWrapper = styled(Box)(() => ({
   textAlign: 'center',
   marginTop: '32px',
}))

const MoreButton = styled(Button)(() => ({
   color: '#C70ADE',
   borderColor: '#C70ADE',
   padding: '10px 24px',
   fontWeight: 600,
   textTransform: 'none',
   borderRadius: '8px',
   '&:hover': {
      borderColor: '#A00DBD',
      backgroundColor: '#F0E0F7',
   },
}))

const StyledCard = styled(Card)(() => ({
   position: 'relative',
   width: '220px',
   minHeight: '360px',
   padding: '16px',
   borderRadius: '16px',
   boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
   backgroundColor: '#fff',
   transition: 'transform 0.2s',
   '&:hover': {
      transform: 'translateY(-4px)',
   },
}))
