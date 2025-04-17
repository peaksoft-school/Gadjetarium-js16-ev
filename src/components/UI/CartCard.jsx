import { Box, Typography, IconButton, Button } from '@mui/material'
import { Add, Remove, FavoriteBorder, Close } from '@mui/icons-material'
import StarIcon from '@mui/icons-material/Star'
import styled from '@emotion/styled'

const CartCard = ({
   image,
   name,
   rating = 4,
   reviews,
   inStock,
   code,
   quantity,
   price,
   onIncrease,
   onDecrease,
   onRemove,
   onFavorite,
}) => {
   const renderStars = () => {
      return Array.from({ length: 5 }, (_, i) => (
         <StarIcon
            key={i}
            fontSize="small"
            sx={{ color: i + 1 <= rating ? '#FFA000' : '#ddd' }}
         />
      ))
   }

   return (
      <CardContainer>
         <ProductImage src={image} alt={name} />

         <InfoSection>
            <Title>{name}</Title>

            <RatingBox>
               <Typography color="textSecondary" fontSize={12}>
                  Рейтинг
               </Typography>
               {renderStars()}
               <Typography fontSize={13} color="textSecondary">
                  ({reviews})
               </Typography>
            </RatingBox>

            <Availability>В наличии ({inStock})</Availability>
            <ProductCode>Код товара: {code}</ProductCode>
         </InfoSection>

         <ActionSection>
            <Box display="flex" gap={18}>
               <QuantityBox>
                  <CircleButton onClick={onDecrease}>
                     <Remove />
                  </CircleButton>
                  <Typography mx={1}>{quantity}</Typography>
                  <CircleButton onClick={onIncrease}>
                     <Add />
                  </CircleButton>
               </QuantityBox>

               <PriceText>{price.toLocaleString()} с</PriceText>
            </Box>
         </ActionSection>

         <BottomButtons>
            <SmallButton onClick={onFavorite} startIcon={<FavoriteBorder />}>
               В избранное
            </SmallButton>
            <SmallButton onClick={onRemove} startIcon={<Close />}>
               Удалить
            </SmallButton>
         </BottomButtons>
      </CardContainer>
   )
}

export default CartCard

const CardContainer = styled(Box)`
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
   max-width: 980px;
   max-height: 170px;
   border-radius: 8px;
   padding: 16px;
   border: 1px solid #ffffff;
   gap: 16px;
   width: 929px;
`

const ProductImage = styled('img')`
   width: 106px;
   height: 121px;
   object-fit: contain;
`

const InfoSection = styled(Box)`
   display: flex;
   flex-direction: column;
   gap: 4px;
`

const Title = styled(Typography)`
   font-size: 18px;
   font-weight: 400;

   width: 300px;
   height: 54px;
`

const RatingBox = styled(Box)`
   display: flex;
   align-items: center;
   gap: 4px;
   width: 155px;
   height: 15px;
 
`

const Availability = styled(Typography)`
   color: #3cde14;
   font-size: 12px;
   width: 88px;
   height: 15px;
`

const ProductCode = styled(Typography)`
   color: #888;
   font-size: 14px;
   width: 136px;
   height: 20px;
`

const ActionSection = styled(Box)`
   display: flex;
   padding-top: 32px;
`

const QuantityBox = styled(Box)`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 89px;
   height: 28px;
   position: relative;
   left: 100px;
`

const CircleButton = styled(IconButton)`
   width: 28px;
   height: 28px;
   border: 1px solid #000;
   border-radius: 50px;
`

const PriceText = styled(Typography)`
   font-weight: 700;
   font-size: 18px;
   width: 94px;
   height: 20px;
`

const BottomButtons = styled(Box)`
   display: flex;
   padding-top: 96px;
   padding-right: 40px;
   width: 300px;
   height: 20px;
   gap: 5px;
   position: relative;
   right: 120px;
`

const SmallButton = styled(Button)`
   height: 20px;
   font-size: 12px;
   font-weight: 400;
   text-transform: none;
   width: 120px;
   color: #909cb5;
`
