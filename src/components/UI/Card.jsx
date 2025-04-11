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
   oldPrice,
   discountValue,
   rating = 4,
   reviews,
   inStock,
   onAddToCart,
}) => {
   const hasDiscount = discountValue && oldPrice
   const price = hasDiscount
      ? Math.round(oldPrice * (1 - discountValue / 100))
      : oldPrice

   return (
      <MuiCard
         sx={{
            width: 300,
            height: 496,
            borderRadius: 3,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 1.5,
         }}
      >
         {hasDiscount && (
            <Chip
               label={`-${discountValue}%`}
               color="error"
               size="small"
               sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  borderRadius: '100%',
                  fontWeight: '900',
                  height: 48,
                  width: 48,
                  fontSize: 12,
               }}
            />
         )}

         <Stack
            direction="row"
            spacing={1}
            sx={{ position: 'absolute', top: 8, right: 8 }}
         >
            <IconButton size="small">
               <GavelIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
               <FavoriteBorderIcon fontSize="small" />
            </IconButton>
         </Stack>

         <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
               width: 180,
               height: 236,
               objectFit: 'contain',
               mx: 'auto',
               mt: 4,
               marginTop: 7,
               marginBottom: 4,
            }}
         />

         <CardContent
            sx={{
               p: 0,
               mt: 1,
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               flexGrow: 1,
            }}
         >
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
               variant="body2"
               fontWeight={600}
               sx={{ lineHeight: 1.3 }}
               noWrap
            >
               {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
               <Typography variant="caption" color="text.secondary">
                  Рейтинг
               </Typography>
               <Rating
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

            <Box
               sx={{
                  width: 260,
                  height: 46,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 'auto',
               }}
            >
               <Box>
                  <Typography variant="h6" fontWeight={700}>
                     {price} с
                  </Typography>
                  {hasDiscount && (
                     <Typography
                        variant="body2"
                        color="text.disabled"
                        sx={{
                           textDecoration: 'line-through',
                           fontSize: '0.85rem',
                        }}
                     >
                        {oldPrice} с
                     </Typography>
                  )}
               </Box>

               <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                     bgcolor: '#D02090',
                     px: 2,
                     py: 0.5,
                     minWidth: 'auto',
                     fontSize: '0.75rem',
                     ':hover': { bgcolor: '#b01875' },
                     borderRadius: 2,
                     height: 36,
                  }}
                  onClick={onAddToCart}
               >
                  В корзину
               </Button>
            </Box>
         </CardContent>
      </MuiCard>
   )
}

export default Card
