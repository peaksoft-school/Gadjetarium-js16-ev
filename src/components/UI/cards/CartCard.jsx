import { Box, Typography, Button, Checkbox } from '@mui/material'
import styled from '@emotion/styled'
import { Icons } from '../../../assets/icons'

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
   isLiked = false,
   selected,
   onSelect,
}) => {
   const renderStars = () =>
      Array.from({ length: 5 }, (_, i) => (
         <StarIcon
            key={i}
            src={i + 1 <= rating ? Icons.starFul : Icons.starEmpty}
            alt="star"
         />
      ))

   return (
      <CardContainer>
         <Checkbox checked={selected} onChange={onSelect} />
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
                  <CircleButton onClick={onDecrease}>-</CircleButton>
                  <Typography mx={1}>{quantity}</Typography>
                  <CircleButton onClick={onIncrease}>+</CircleButton>
               </QuantityBox>
               <PriceText>{price.toLocaleString()} с</PriceText>
            </Box>
         </ActionSection>
         <BottomButtons>
            <SmallButton size="small" onClick={onFavorite}>
               <LikeIcon src={Icons.likeW} alt="" />В избранное
            </SmallButton>
            <SmallButton onClick={onRemove}>
               <DeleteIcon src={Icons.deleteb} alt="" />
               Удалить
            </SmallButton>
         </BottomButtons>
      </CardContainer>
   )
}

export default CartCard
