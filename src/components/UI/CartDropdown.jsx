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
               <img src={item.image} alt={item.name} width="60" height="67" />
               <StyledTitle>
                  <Typography>{item.name}</Typography>
               </StyledTitle>
               <StyledPrice>{item.price.toLocaleString()} с</StyledPrice>
               <Remove onClick={() => onRemove(index)}>
                  <img src={Icons.cancel} width={12} height={12} alt="remove" />
               </Remove>
            </ItemRow>
         ))}
         <hr />
         <Bottom>
            <StyledButton onClick={onCheckout}>Оформить заказ</StyledButton>
            <StyledItogPrice>
               Итого <b>{total.toLocaleString()} с</b>
            </StyledItogPrice>
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

export default AppCart

const DropdownBox = styled(Box)`
   background: white;
   border-radius: 12px;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
   padding: 16px;
   width: auto;
   max-width: 500px;
   display: flex;
   flex-direction: column;
   gap: 12px;
   height: auto;
   max-height: 277px;
   align-items: start;
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
   width: 456.4140625px;
   height: 88.78302001953125px;
`

const Bottom = styled(Box)`
   display: flex;
   align-items: center;
   justify-content: space-between;
   justify-content: center;
   gap: 80px;
   width: 100%;
`

const StyledButton = styled(Button)`
   background-color: #cb11ab;
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
   align-items: start;
   justify-content: start;
   width: 16px;
   height: 16px;
`
const StyledTitle = styled(Box)`
   width: 255px;
   height: 48px;
   font-weight: 400;
   font-size: 16px;
   line-height: 150%;
`
const StyledPrice = styled(Typography)`
   width: 72.03389739990234px;
   height: 17px;
   font-weight: 700;
   font-size: 14px;
   line-height: 100%;
   color: #384255;
`

const StyledItogPrice = styled(Typography)`
   width: 110px;
   height: 17px;
   font-weight: 700;
   font-size: 14px;
   line-height: 100%;
`
