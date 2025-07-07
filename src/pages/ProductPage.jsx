import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { fetchProducts } from '../store/product/productThunk'
import Card from '../components/UI/cards/Card'

const ProductPage = () => {
   const dispatch = useDispatch()
   const { products, isLoading, error } = useSelector((state) => state.product)

   const userId = 1

   useEffect(() => {
      dispatch(
         fetchProducts({
            status: 'favorites',
            page: 0,
            size: 20,
            userId,
         })
      )
   }, [dispatch, userId])

   if (isLoading) return <Typography>Загрузка...</Typography>
   if (error) return <Typography color="error">Ошибка: {error}</Typography>

   return (
      <Box display="flex" flexWrap="wrap" gap={3}>
         {products?.map((product) => (
            <Card
               key={product.id}
               image={product.image}
               title={product.name}
               oldPrice={product.oldPrice || product.price}
               discountValue={product.discount || 0}
               rating={product.rating}
               reviews={product.reviewsCount}
               inStock={product.inStock}
               isLiked={product.isLiked}
               onAddToCart={() =>
                  console.log('Добавлено в корзину:', product.id)
               }
            />
         ))}
      </Box>
   )
}

export default ProductPage
