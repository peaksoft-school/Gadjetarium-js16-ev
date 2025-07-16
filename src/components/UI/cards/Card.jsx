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
// import styled from '@emotion/styled'
// import { Icons } from '../../../assets/icons'

// const Card = ({
//    image,
//    title,
//    oldPrice,
//    discountValue,
//    image2,
//    rating = 4,
//    reviews,
//    inStock,
//    onAddToCart,
//    isLiked,
// }) => {
//    const hasDiscount = discountValue && oldPrice
//    const price = hasDiscount
//       ? Math.round(oldPrice * (1 - discountValue / 100))
//       : oldPrice

//    return (
//       <StyledCard>
//          {hasDiscount && (
//             <DiscountChip
//                label={`-${discountValue}%`}
//                color="error"
//                size="small"
//             />
//          )}
//          <img
//             src={image2}
//             alt=""
//             image2={image2}
//             style={{ width: '50px', height: '50px' }}
//          />

//          <ActionIcons direction="row" spacing={1}>
//             <GrayIconButton size="small">
//                <img src={Icons.scales} alt="scales" />
//             </GrayIconButton>
//             <LikeIconButton size="small" isliked={isLiked ? 1 : 0}>
//                <img src={isLiked ? Icons.likeR : Icons.likeW} alt="like" />
//             </LikeIconButton>
//          </ActionIcons>

//          <StyledImage component="img" image={image} alt={title} />

//          <StyledContent>
//             {inStock !== undefined && (
//                <StockText variant="body2">В наличии ({inStock})</StockText>
//             )}

//             <TitleText variant="body2">{title}</TitleText>

//             <RatingBox>
//                <Typography variant="caption" color="text.secondary">
//                   Рейтинг
//                </Typography>
//                <StyledRating
//                   value={rating}
//                   precision={0.5}
//                   size="small"
//                   readOnly
//                />
//                {reviews !== undefined && (
//                   <Typography variant="caption" color="text.secondary">
//                      ({reviews})
//                   </Typography>
//                )}
//             </RatingBox>

//             <PriceBox>
//                <Box>
//                   <PriceText variant="h6">{price} с</PriceText>
//                   {hasDiscount && <OldPriceText>{oldPrice} с</OldPriceText>}
//                </Box>
//                <AddToCartButton
//                   variant="contained"
//                   size="small"
//                   startIcon={<img src={Icons.basket} alt="basket" />}
//                   onClick={onAddToCart}
//                >
//                   В корзину
//                </AddToCartButton>
//             </PriceBox>
//          </StyledContent>
//       </StyledCard>
//    )
// }

// export default Card

// const StyledCard = styled(MuiCard)`
//    width: 305px;
//    height: 480px;
//    position: relative;
//    display: flex;
//    flex-direction: column;
//    justify-content: space-between;
//    padding: 12px;
//    border-radius: 12px;
// `

// const DiscountChip = styled(Chip)`
//    position: absolute;
//    top: 8px;
//    left: 8px;
//    border-radius: 100%;
//    font-weight: 900;
//    height: 48px;
//    width: 48px;
//    font-size: 12px;
// `

// const ActionIcons = styled(Stack)`
//    position: absolute;
//    top: 8px;
//    right: 8px;
// `

// const GrayIconButton = styled(IconButton)`
//    color: #9e9e9e;

//    img {
//       filter: grayscale(100%) brightness(0.5);
//    }
// `

// const LikeIconButton = styled(IconButton, {
//    shouldForwardProp: (prop) => prop !== 'isliked',
// })`
//    img {
//       ${({ isliked }) =>
//          !isliked &&
//          `
//          filter: grayscale(100%) brightness(0.5);
//       `}
//    }
// `

// const StyledImage = styled(CardMedia)`
//    width: 180px;
//    height: 236px;
//    object-fit: contain;
//    margin: 56px auto 32px auto;
// `

// const StyledContent = styled(CardContent)`
//    padding: 0;
//    margin-top: 8px;
//    display: flex;
//    flex-direction: column;
//    justify-content: space-between;
//    gap: 5px;
// `

// const StockText = styled(Typography)`
//    color: #2fc509;
//    font-weight: 500;
// `

// const TitleText = styled(Typography)`
//    font-size: 16px;
//    line-height: 140%;
//    overflow: hidden;
//    text-overflow: ellipsis;

//    width: 250px;
// `

// const RatingBox = styled(Box)`
//    display: flex;
//    align-items: center;
//    margin-top: 4px;

//    & > *:not(:first-of-type) {
//       margin-left: 4px;
//    }
// `

// const StyledRating = styled(Rating)`
//    margin-left: 4px;
// `

// const PriceBox = styled(Box)`
//    width: 260px;
//    height: 46px;
//    display: flex;
//    align-items: center;
//    justify-content: space-between;
//    margin-top: auto;
// `

// const PriceText = styled(Typography)`
//    font-weight: 700;
// `

// const OldPriceText = styled(Typography)`
//    text-decoration: line-through;
//    color: #9e9e9e;
//    font-size: 0.85rem;
// `

// const AddToCartButton = styled(Button)`
//    background-color: #d02090;
//    padding: 4px 16px;
//    font-size: 0.75rem;
//    height: 36px;
//    min-width: auto;

//    &:hover {
//       background-color: #b01875;
//    }
// `

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
import { Icons } from '../../../assets/icons'

const Card = ({
   image,
   title,
   oldPrice,
   discountValue,
   image2,
   rating = 4,
   reviews,
   inStock,
   onAddToCart,
   isLiked,
   onClick,
   productId,
   onToggleFavorite,
}) => {
   const hasDiscount = discountValue && oldPrice

   const price = hasDiscount
      ? Math.round(oldPrice * (1 - discountValue / 100))
      : oldPrice

   return (
      <StyledCard onClick={onClick}>
         {hasDiscount && (
            <DiscountChip label={`-${discountValue}%`} color="error" />
         )}
         <img
            src={image2}
            alt=""
            image2={image2}
            style={{ width: '50px', height: '50px' }}
         />
         <ActionIcons direction="row" spacing={1}>
            <LikeIconButton
               size="small"
               isliked={isLiked ? 1 : 0}
               onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite && onToggleFavorite(productId)
               }}
            >
               <img src={isLiked ? Icons.likeR : Icons.likeW} alt="like" />
            </LikeIconButton>
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
               <StyledRating
                  value={rating}
                  precision={0.5}
                  size="small"
                  readOnly
               />
               {reviews !== undefined && (
                  <Typography variant="caption" color="text.secondary">
                     ({reviews})
                  </Typography>
               )}
            </RatingBox>

            <PriceBox>
               <Box>
                  <PriceText variant="h6">{price} с</PriceText>
                  {hasDiscount && (
                     <OldPriceText>{Math.round(oldPrice)} с</OldPriceText>
                  )}
               </Box>
               <AddToCartButton
                  variant="contained"
                  size="small"
                  startIcon={<img src={Icons.basket} alt="basket" />}
                  onClick={(e) => {
                     e.stopPropagation() // Prevent navigation on button click
                     onAddToCart()
                  }}
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
   width: 305px;
   height: 480px;
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 12px;
   border-radius: 12px;
   cursor: pointer; 
`

const DiscountChip = styled(Chip)`
   position: absolute;
   top: 8px;
   left: 8px;
   border-radius: 100%;
   font-weight: 700;
   height: 58px;
   width: 58px;
   font-size: 12px;
`

const ActionIcons = styled(Stack)`
   position: absolute;
   top: 8px;
   right: 8px;
`

const GrayIconButton = styled(IconButton)`
   color: #9e9e9e;

   img {
      filter: grayscale(100%) brightness(0.5);
   }
`

const LikeIconButton = styled(IconButton, {
   shouldForwardProp: (prop) => prop !== 'isliked',
})`
   img {
      ${({ isliked }) =>
         !isliked &&
         `
         filter: grayscale(100%) brightness(0.5);
      `}
   }
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
   font-size: 16px;
   line-height: 140%;
   overflow: hidden;
   text-overflow: ellipsis;
   width: 250px;
`

const RatingBox = styled(Box)`
   display: flex;
   align-items: center;
   margin-top: 4px;

   & > *:not(:first-of-type) {
      margin-left: 4px;
   }
`

const StyledRating = styled(Rating)`
   margin-left: 4px;
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
