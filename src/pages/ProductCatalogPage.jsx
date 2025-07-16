import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import Card from '../components/UI/cards/Card'
import FilterPanel from '../components/FilterPanel'
import { fetchFilteredProducts } from '../store/product/productThunk2'
import { toggleFavoriteOnServer } from '../store/favorites/favoritesSlice'
import { addToBasket } from '../store/basket/basketThunk'
import { showToast } from '../utils/helpers/showToast'
import { Icons } from '../assets/icons'
import { catalogProductData } from '../utils/constants'
import Chip from '../components/UI/Chip'
import { styled } from '@mui/material'

const ProductCatalogPage = () => {
   const dispatch = useDispatch()
   const {
      sale = [],
      new: newItems = [],
      recommend = [],
      loading,
      error,
   } = useSelector((state) => state.products)
   const favoriteIds = useSelector((state) => state.favorites.ids)
   const userId = useSelector((state) => state.auth?.user?.id || 1)

   const [activeFilters, setActiveFilters] = useState({
      filters: {},
      price: [500, 250000],
   })

   const getApiParams = () => {
      const params = { page: 1, size: 12, userId }
      const { filters: f, price } = activeFilters
      if (f['1-brands'] && f['1-brands'].length > 0) {
         const brandIds = catalogProductData[0].category.subCategory
            .filter((item) => f['1-brands'].includes(item.categoryName))
            .map((item) => item.id)
         if (brandIds.length > 0) params.brandsId = brandIds
      }
      if (f['1-storage'] && f['1-storage'].length > 0) {
         params.storages = f['1-storage'].map(String)
      }
      if (f['1-ram'] && f['1-ram'].length > 0) {
         params.ram = f['1-ram'].map(String)
      }
      if (price && price.length === 2) {
         params.startPrice = price[0]
         params.endPrice = price[1]
      }
      if (f['colors'] && f['colors'].length > 0) {
         params.colors = f['colors']
      }
      return params
   }

   useEffect(() => {
      const params = getApiParams()
      dispatch(fetchFilteredProducts({ ...params, status: 'акции' }))
      dispatch(fetchFilteredProducts({ ...params, status: 'новинки' }))
      dispatch(fetchFilteredProducts({ ...params, status: 'мы рекомендуем' }))
   }, [dispatch, userId, activeFilters])

   const handleAddToBasket = async (product) => {
      try {
         await dispatch(
            addToBasket({ productId: product.productTypeId, quantity: 1 })
         ).unwrap()
         showToast({ message: 'Товар успешно добавлен в корзину!' })
      } catch (e) {
         showToast({ message: 'Ошибка добавления в корзину', type: 'error' })
      }
   }

   const renderSaleCard = (product, index) => (
      <Card
         key={index}
         image={product.imageUrl}
         title={product.name}
         oldPrice={product.price}
         discountValue={product.discount}
         rating={product.rating}
         reviews={product.ratingCount}
         inStock={product.count}
         isLiked={favoriteIds
            .map(String)
            .includes(String(product.productTypeId))}
         productId={product.productTypeId}
         onToggleFavorite={(id) =>
            dispatch(toggleFavoriteOnServer({ productTypeId: id, userId }))
         }
         onAddToCart={() => handleAddToBasket(product)}
         onClick={() => {}}
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
      <Card
         key={index}
         image={product.imageUrl}
         title={product.name}
         oldPrice={product.price}
         image2={Icons.newCircle}
         rating={product.rating}
         reviews={product.ratingCount}
         inStock={product.count}
         isLiked={favoriteIds
            .map(String)
            .includes(String(product.productTypeId))}
         productId={product.productTypeId}
         onToggleFavorite={(id) =>
            dispatch(toggleFavoriteOnServer({ productTypeId: id, userId }))
         }
         onAddToCart={() => handleAddToBasket(product)}
         onClick={() => {}}
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
      <Card
         key={index}
         image={product.imageUrl}
         title={product.name}
         oldPrice={product.price}
         image2={Icons.blueLike}
         rating={product.rating}
         reviews={product.ratingCount}
         inStock={product.count}
         isLiked={favoriteIds
            .map(String)
            .includes(String(product.productTypeId))}
         productId={product.productTypeId}
         onToggleFavorite={(id) =>
            dispatch(toggleFavoriteOnServer({ productTypeId: id, userId }))
         }
         onAddToCart={() => handleAddToBasket(product)}
         onClick={() => {}}
         sx={{ cursor: 'pointer' }}
      />
   )

   const renderSection = (title, items, renderCardFunc) => {
      if (!Array.isArray(items) || items.length === 0) {
         return (
            <Box width="100%">
               {/* <Typography variant="h5" fontWeight={700} mb={2}>{title}</Typography> */}
               <Typography sx={{ textAlign: 'center', color: '#888', mb: 4 }}>
                  Пусто
               </Typography>
            </Box>
         )
      }
      return (
         <Box width="100%">
            {/* <Typography variant="h5" fontWeight={700} mb={2}>{title}</Typography> */}
            <Box display="flex" flexWrap="wrap" gap={3}>
               {items.map((product, index) => renderCardFunc(product, index))}
            </Box>
         </Box>
      )
   }

   const getSelectedChips = () => {
      const chips = []
      const { filters, price } = activeFilters
      if (filters['1-brands']) chips.push(...filters['1-brands'])
      if (filters['colors']) chips.push(...filters['colors'])
      if (filters['1-storage']) chips.push(...filters['1-storage'].map(String))
      if (filters['1-ram']) chips.push(...filters['1-ram'].map(String))
      // Цена
      if (price && (price[0] !== 500 || price[1] !== 250000))
         chips.push(`${price[0]} - ${price[1]} c`)
      return chips
   }

   const handleDeleteChip = (chip) => {
      setActiveFilters((prev) => {
         const { filters, price } = prev
         const newFilters = { ...filters }
         Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key])) {
               newFilters[key] = newFilters[key].filter(
                  (v) => v !== chip && String(v) !== chip
               )
               if (newFilters[key].length === 0) delete newFilters[key]
            }
         })
         let newPrice = price
         if (chip === `${price[0]} - ${price[1]} c`) newPrice = [500, 250000]
         return { filters: newFilters, price: newPrice }
      })
   }

   const totalCount =
      (sale?.length || 0) + (newItems?.length || 0) + (recommend?.length || 0)

   if (loading) return <Typography>Загрузка...</Typography>
   if (error) return <Typography color="error">Ошибка: {error}</Typography>

   return (
      <Box display="flex" gap={4}>
         <Box minWidth={280}>
            <Typography variant="h4" fontWeight={700} mb={2}>
               Смартфоны
            </Typography>
            <hr />

            <Typography
               sx={{ color: '#888', fontSize: 16, mb: 2, fontWeight: 400 }}
            >
               Найдено {totalCount} товаров
            </Typography>
            <FilterPanel onApply={setActiveFilters} value={activeFilters} />
         </Box>

         <Box flex={1}>
            {getSelectedChips().length > 0 && (
               <ChipsRow>
                  {getSelectedChips().map((chip) => (
                     <Chip
                        key={chip}
                        label={chip}
                        onDelete={() => handleDeleteChip(chip)}
                     />
                  ))}
               </ChipsRow>
            )}
            <br />
            <br />
            <br />

            <Box display="flex" flexWrap="wrap" gap={3}>
               {sale.map(renderSaleCard)}
               {/* {newItems.map(renderNewCard)}
               {recommend.map(renderRecommendCard)} */}
            </Box>
         </Box>
      </Box>
   )
}

export default ProductCatalogPage

const ChipsRow = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '8px',
   marginBottom: '18px',
   marginTop: '-8px',
}))
