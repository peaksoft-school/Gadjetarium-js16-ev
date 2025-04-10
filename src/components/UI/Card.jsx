import {
   Box,
   Card as MuiCard,
   CardContent,
   CardMedia,
   Typography,
   IconButton,
   Button,
   Chip,
   Stack,
   Rating,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import GavelIcon from '@mui/icons-material/Gavel'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const Card = ({
   image,
   title,
   price,
   oldPrice,
   hasDiscount = false,
   discountValue,
   rating = 4,
   reviews,
   inStock,
   onAddToCart,
}) => {
   return (
      <MuiCard  
         sx={{
            width: 280,
            borderRadius: 3,
            position: 'relative',
            p: 2,
            boxShadow: 2,
         }}
      >
         {hasDiscount && discountValue && (
            <Chip
               label={`-${discountValue}%`}
               color="error"
               size="small"
               sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  borderRadius: '50%',
                  fontWeight: 'bold',
               }}
            />
         )}

         <Stack
            direction="row"
            spacing={1}
            sx={{ position: 'absolute', top: 10, right: 10 }}
         >
            <IconButton size="small" color="default">
               <GavelIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="default">
               <FavoriteBorderIcon fontSize="small" />
            </IconButton>
         </Stack>

         <CardMedia
            component="img"
            height="245"
            width="186"
            image={image}
            alt={title}
            sx={{ objectFit: 'contain', mt: 3 }}
         />

         <CardContent sx={{ p: 0, pt: 2 }}>
            {inStock !== undefined && (
               <Typography
                  variant="body2"
                  color="success.main"
                  fontWeight={500}
               >
                  В наличии ({inStock})
               </Typography>
            )}

            <Typography
               variant="body1"
               fontWeight={600}
               sx={{ mt: 0.5, lineHeight: 1.3 }}
               noWrap
            >
               {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
               <Typography variant="caption" color="text.secondary">
                  Рейтинг
               </Typography>
               <Rating
                  name="product-rating"
                  value={rating}
                  precision={0.5}
                  size="small"
                  readOnly
                  sx={{ ml: 0.5 }}
               />
               {reviews !== undefined && (
                  <Typography
                     variant="caption"
                     color="text.secondary"
                     sx={{ ml: 0.5 }}
                  >
                     ({reviews})
                  </Typography>
               )}
            </Box>

            <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
               {price} с
            </Typography>

            {oldPrice && (
               <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ textDecoration: 'line-through', fontWeight: 500 }}
               >
                  {oldPrice} с
               </Typography>
            )}

            <Button
               variant="contained"
               fullWidth
               startIcon={<ShoppingCartIcon />}
               sx={{
                  mt: 2,
                  bgcolor: '#D02090',
                  borderRadius: 2,
                  ':hover': { bgcolor: '#b01875' },
               }}
               onClick={onAddToCart}
            >
               В корзину
            </Button>
         </CardContent>
      </MuiCard>
   )
}

export default Card
