import {
   Box,
   CardContent,
   Typography,
   Rating,
   Stack,
   CardMedia,
   Card as MuiCard,
   IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavoriteOnServer } from '../../../store/favorites/favoritesSlice'
import { Icons } from '../../../assets/icons'

const CompactCard = (props) => {
   // Если передан card, деструктурируем из него нужные поля
   const card = props.card || {}
   const image =
      props.image ||
      card.image ||
      'https://via.placeholder.com/200x200?text=Нет+фото'
   const title = props.title || card.productName || card.title || ''
   const price = props.price || card.productPrice || card.price || 0
   const discountValue = props.discountValue || card.discountPrice
   const rating = props.rating || card.productRating || card.rating || 0
   const reviews = props.reviews || card.ratingCount || card.reviews || 0
   const inStock = props.inStock || card.count || card.inStock
   const isLiked =
      typeof props.isLiked === 'boolean' ? props.isLiked : card.like
   const productId = props.productId || card.productId

   const dispatch = useDispatch()
   const favoriteIds = useSelector((state) => state.favorites.ids)
   const liked =
      typeof isLiked === 'boolean' ? isLiked : favoriteIds.includes(productId)

   return (
      <StyledCard>
         <Box sx={{ position: 'relative', width: '100%' }}>
            <StyledCardMedia component="img" image={image} alt={title} />
            <IconButton
               onClick={() => dispatch(toggleFavoriteOnServer(productId))}
               sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px #0001',
                  p: 0.5,
               }}
            >
               <img
                  src={liked ? Icons.likeR : Icons.likeW}
                  alt="like"
                  style={{ width: 24, height: 24, transition: '0.2s' }}
               />
            </IconButton>
         </Box>
         <StyledCardContent>
            <TitleTypography variant="body2">{title}</TitleTypography>
            <RatingStack
               direction="row"
               justifyContent="center"
               alignItems="center"
               spacing={0.5}
            >
               <Typography variant="caption" color="text.secondary">
                  Рейтинг
               </Typography>
               <Rating value={rating} precision={0.5} readOnly size="small" />
               <Typography variant="caption" color="text.secondary">
                  ({reviews})
               </Typography>
            </RatingStack>
            <PriceTypography variant="h6">{price} с</PriceTypography>
         </StyledCardContent>
      </StyledCard>
   )
}

export default CompactCard

const StyledCard = styled(MuiCard)({
   width: 210,
   height: 354,
   borderRadius: 4,
   padding: 12,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const StyledCardMedia = styled(CardMedia)({
   width: '100%',
   height: 210,
   objectFit: 'contain',
   marginBottom: 24,
})

const StyledCardContent = styled(CardContent)({
   padding: 0,
   textAlign: 'center',
})

const TitleTypography = styled(Typography)({
   fontWeight: 500,
   marginBottom: 4,
   textAlign: 'start',
   width: '150px',
})

const RatingStack = styled(Stack)({
   marginBottom: 16,
})

const PriceTypography = styled(Typography)({
   fontWeight: 700,
   marginTop: 8,
   paddingRight: 12.8,
   textAlign: 'start',
   position: 'relative',
   display: 'inline-block',
   fontSize: '1.25rem',

   '&::after': {
      content: '""',
      position: 'absolute',
      right: 12,
      bottom: -2,
      width: '15%',
      height: '1.5px',
      backgroundColor: 'currentColor',
   },
})
