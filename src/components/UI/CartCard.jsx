import React from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import { Add, Remove, FavoriteBorder, Close } from '@mui/icons-material'
import StarIcon from '@mui/icons-material/Star'

const CartCard = ({
   image,
   name,
   rating,
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
      const stars = []
      for (let i = 1; i <= 5; i++) {
         stars.push(
            <StarIcon
               key={i}
               fontSize="small"
               sx={{ color: i <= rating ? '#FFA000' : '#ddd' }}
            />
         )
      }
      return stars
   }

   return (
      <Box
         display="flex"
         alignItems="flex-start"
         justifyContent="space-between"
         maxWidth={980}
         borderRadius={1}
         maxHeight={170}
         p={2}
         sx={{
            border: '1px solid #FFFFFF',
            gap: 2,
         }}
      >
         <Box component="img" src={image} alt={name} width={106} height={121} />

         <Box flex="1">
            <Typography
               fontSize={18}
               fontWeight={400}
               mb={0.5}
               width={390}
               height={54}
            >
               {name}
            </Typography>

            <Box
               display="flex"
               alignItems="center"
               gap={0.5}
               width={155}
               height={15}
            >
               <Typography color="textSecondary" fontSize={12}>
                  Рейтинг
               </Typography>
               {renderStars()}
               <Typography fontSize={13} color="textSecondary">
                  ({reviews})
               </Typography>
            </Box>

            <Typography color="green" fontSize={12} width={88} height={15}>
               В наличии ({inStock})
            </Typography>

            <Typography
               color="textSecondary"
               fontSize={14}
               width={136}
               height={20}
            >
               Код товара: {code}
            </Typography>
         </Box>

         <Box display="flex" paddingTop={4}>
            <Box display="flex" gap={3}>
               <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={89}
                  height={28}
               >
                  <IconButton
                     onClick={onDecrease}
                     width="28"
                     height="28"
                     sx={{
                        border: '1px solid #000',
                        borderRadius: '50px',
                     }}
                  >
                     <Remove />
                  </IconButton>

                  <Typography mx={1}>{quantity}</Typography>

                  <IconButton
                     onClick={onDecrease}
                     width="28"
                     height="28"
                     sx={{
                        border: '1px solid #000',
                        borderRadius: '50px',
                     }}
                  >
                     <Add />
                  </IconButton>
               </Box>

               <Typography
                  fontWeight={700}
                  fontSize={18}
                  width={94}
                  height={20}
               >
                  {price.toLocaleString()} с
               </Typography>
            </Box>
         </Box>

         <Box
            display="flex"
            paddingTop={12}
            width={281}
            height={20}
            paddingRight={5}
            gap={1}
         >
            <Button
               onClick={onFavorite}
               startIcon={<FavoriteBorder />}
               color="grey"
               sx={{
                  width: '130px',
                  height: '20px',
                  fontSize: 12,
                  fontWeight: 400,
               }}
            >
               В избранное
            </Button>
            <Button
               onClick={onRemove}
               startIcon={<Close />}
               color="grey"
               sx={{
                  width: '57px',
                  height: '20px',
                  fontSize: 12,
                  fontWeight: 400,
               }}
            >
               Удалить
            </Button>
         </Box>
      </Box>
   )
}

export default CartCard
