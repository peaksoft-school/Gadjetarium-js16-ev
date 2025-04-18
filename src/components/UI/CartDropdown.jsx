import CartHoverTrigger from './CartHoverTrigger'
import { Icons } from '../../assets/icons'
import styled from '@emotion/styled'
import { Box, Typography, Button } from '@mui/material'

const CartDropdown = ({ items, total, onRemove, onCheckout }) => {
   return (
      <DropdownBox>
         <Arrow />
         {items.map((item, index) => (
            <ItemRow key={index}>
               <img src={item.image} alt={item.name} width="50" height="50" />
               <Box>
                  <Typography>{item.name}</Typography>
                  <Typography fontSize={12}>{item.subtitle}</Typography>
               </Box>
               <Typography fontWeight={600}>
                  {item.price.toLocaleString()} с
               </Typography>
               <Remove onClick={() => onRemove(index)}>
                  <img src={Icons.cancel} width={12} height={12} alt="remove" />
               </Remove>
            </ItemRow>
         ))}
         <hr />
         <Bottom>
            <StyledButton onClick={onCheckout}>Оформить заказ</StyledButton>
            <Typography>
               Итого <b>{total.toLocaleString()} с</b>
            </Typography>
         </Bottom>
      </DropdownBox>
   )
}

const AppCart = ({ array }) => {
   const total = array.reduce((sum, item) => sum + item.price, 0)

   const handleRemove = (index) => console.log('Remove item', index)
   const handleCheckout = () => console.log('Checkout!')

   return (
      <CartHoverTrigger icon={Icons.basket}>
         <CartDropdown
            items={array}
            total={total}
            onRemove={handleRemove}
            onCheckout={handleCheckout}
         />
      </CartHoverTrigger>
   )
}
// const product = {
//     name: 'Samsung Galaxy S21 128gb',
//     subtitle: 'синий 9(MLP3RU)',
//     image: 'https://m.media-amazon.com/images/I/81CSF0P-ULL._AC_UF350,350_QL80_.jpg',
//     price: 34000,
//  }

export default AppCart

const DropdownBox = styled(Box)`
   background: white;
   border-radius: 12px;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
   padding: 16px;
   width: 360px;
   display: flex;
   flex-direction: column;
   gap: 12px;
`

const Arrow = styled('div')`
   position: absolute;
   top: -8px;
   right: 32px;
   width: 16px;
   height: 16px;
   background: white;
   transform: rotate(45deg);
   box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.05);
`

const ItemRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 8px;
   justify-content: space-between;
`

const Bottom = styled(Box)`
   display: flex;
   align-items: center;
   justify-content: space-between;
`

const StyledButton = styled(Button)`
   background-color: #cb1cff;
   color: white;
   text-transform: none;
   font-size: 14px;

   &:hover {
      background-color: #b315e0;
   }
`

const Remove = styled('div')`
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
`
