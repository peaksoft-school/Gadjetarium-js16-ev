// import {
//    Box,
//    Card as MuiCard,
//    CardContent,
//    CardMedia,
//    Typography,
//    IconButton,
//    Button,
//    Chip,
//    Stack,
//    Rating,
// } from '@mui/material'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import GavelIcon from '@mui/icons-material/Gavel'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

// const Card = ({
//    image,
//    title,
//    oldPrice,
//    discountValue,
//    rating = 4,
//    reviews,
//    inStock,
//    onAddToCart,
// }) => {
//    const hasDiscount = discountValue && oldPrice
//    const price = hasDiscount
//       ? Math.round(oldPrice * (1 - discountValue / 100))
//       : oldPrice

//    return (
//       <MuiCard
//          sx={{
//             width: 300,
//             height: 496,
//             borderRadius: 3,
//             position: 'relative',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             p: 1.5,
//          }}
//       >
//          {hasDiscount && (
//             <Chip
//                label={`-${discountValue}%`}
//                color="error"
//                size="small"
//                sx={{
//                   position: 'absolute',
//                   top: 8,
//                   left: 8,
//                   borderRadius: '100%',
//                   fontWeight: '900',
//                   height: 48,
//                   width: 48,
//                   fontSize: 12,
//                }}
//             />
//          )}

//          <Stack
//             direction="row"
//             spacing={1}
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//          >
//             <IconButton size="small">
//                <GavelIcon fontSize="small" />
//             </IconButton>
//             <IconButton size="small">
//                <FavoriteBorderIcon fontSize="small" />
//             </IconButton>
//          </Stack>

//          <CardMedia
//             component="img"
//             image={image}
//             alt={title}
//             sx={{
//                width: 180,
//                height: 236,
//                objectFit: 'contain',
//                mx: 'auto',
//                mt: 4,
//                marginTop: 7,
//                marginBottom: 4,
//             }}
//          />

//          <CardContent
//             sx={{
//                p: 0,
//                mt: 1,
//                display: 'flex',
//                flexDirection: 'column',
//                justifyContent: 'space-between',
//                flexGrow: 1,
//             }}
//          >
//             {inStock !== undefined && (
//                <Typography
//                   variant="body2"
//                   color="success.main"
//                   fontWeight={500}
//                >
//                   В наличии ({inStock})
//                </Typography>
//             )}

//             <Typography
//                variant="body2"
//                fontWeight={600}
//                sx={{ lineHeight: 1.3 }}
//                noWrap
//             >
//                {title}
//             </Typography>

//             <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                <Typography variant="caption" color="text.secondary">
//                   Рейтинг
//                </Typography>
//                <Rating
//                   value={rating}
//                   precision={0.5}
//                   size="small"
//                   readOnly
//                   sx={{ ml: 0.5 }}
//                />
//                {reviews !== undefined && (
//                   <Typography
//                      variant="caption"
//                      color="text.secondary"
//                      sx={{ ml: 0.5 }}
//                   >
//                      ({reviews})
//                   </Typography>
//                )}
//             </Box>

//             <Box
//                sx={{
//                   width: 260,
//                   height: 46,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   mt: 'auto',
//                }}
//             >
//                <Box>
//                   <Typography variant="h6" fontWeight={700}>
//                      {price} с
//                   </Typography>
//                   {hasDiscount && (
//                      <Typography
//                         variant="body2"
//                         color="text.disabled"
//                         sx={{
//                            textDecoration: 'line-through',
//                            fontSize: '0.85rem',
//                         }}
//                      >
//                         {oldPrice} с
//                      </Typography>
//                   )}
//                </Box>

//                <Button
//                   variant="contained"
//                   size="small"
//                   startIcon={<ShoppingCartIcon />}
//                   sx={{
//                      bgcolor: '#D02090',
//                      px: 2,
//                      py: 0.5,
//                      minWidth: 'auto',
//                      fontSize: '0.75rem',
//                      ':hover': { bgcolor: '#b01875' },
//                      borderRadius: 2,
//                      height: 36,
//                   }}
//                   onClick={onAddToCart}
//                >
//                   В корзину
//                </Button>
//             </Box>
//          </CardContent>
//       </MuiCard>
//    )
// }

// export default Card

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
import styled from '@emotion/styled'
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
      <StyledCard>
         {hasDiscount && (
            <DiscountChip
               label={`-${discountValue}%`}
               color="error"
               size="small"
            />
         )}
         <ActionIcons direction="row" spacing={1}>
            <IconButton size="small">
               <GavelIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
               <FavoriteBorderIcon fontSize="small" />
            </IconButton>
         </ActionIcons>

         <StyledImage component="img" image={image} alt={title} />

         <StyledContent>
            {inStock !== undefined && (
               <StockText variant="body2">В наличии ({inStock})</StockText>
            )}
            <TitleText variant="body2">{title}</TitleText>

            <RatingBox>
               <Typography variant="caption" color="text.secondary">
                  Рейтинг
               </Typography>
               <Rating
                  value={rating}
                  precision={0.5}
                  size="small"
                  readOnly
                  style={{ marginLeft: 4 }}
               />
               {reviews !== undefined && (
                  <Typography
                     variant="caption"
                     color="text.secondary"
                     style={{ marginLeft: 4 }}
                  >
                     ({reviews})
                  </Typography>
               )}
            </RatingBox>

            <PriceBox>
               <Box>
                  <PriceText variant="h6">{price} с</PriceText>
                  {hasDiscount && <OldPriceText>{oldPrice} с</OldPriceText>}
               </Box>
               <AddToCartButton
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  onClick={onAddToCart}
               >
                  В корзину
               </AddToCartButton>
            </PriceBox>
         </StyledContent>
      </StyledCard>
   )
}

export default Card

const StyledCard = styled(MuiCard)`
   width: 300px;
   height: 520px;
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 12px;
`

const DiscountChip = styled(Chip)`
   position: absolute;
   top: 8px;
   left: 8px;
   border-radius: 100%;
   font-weight: 900;
   height: 48px;
   width: 48px;
   font-size: 12px;
`

const ActionIcons = styled(Stack)`
   position: absolute;
   top: 8px;
   right: 8px;
`

const StyledImage = styled(CardMedia)`
   width: 180px;
   height: 236px;
   object-fit: contain;
   margin: 56px auto 32px auto;
`

const StyledContent = styled(CardContent)`
   padding: 0;
   margin-top: 8px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   gap: 5px;
`

const StockText = styled(Typography)`
   color: #2fc509;
   font-weight: 500;
`

const TitleText = styled(Typography)`
   font-weight: 500;
   font-size: 16px;
   line-height: 140%;
   overflow: hidden;
   width: 239;
   text-overflow: ellipsis;
`

const RatingBox = styled(Box)`
   display: flex;
   align-items: center;
   margin-top: 4px;
`

const PriceBox = styled(Box)`
   width: 260px;
   height: 46px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: auto;
`

const PriceText = styled(Typography)`
   font-weight: 700;
`

const OldPriceText = styled(Typography)`
   text-decoration: line-through;
   color: #9e9e9e;
   font-size: 0.85rem;
`

const AddToCartButton = styled(Button)`
   background-color: #d02090;
   padding: 4px 16px;
   font-size: 0.75rem;
  
   height: 36px;
   min-width: auto;

   &:hover {
      background-color: #b01875;
   }
`
