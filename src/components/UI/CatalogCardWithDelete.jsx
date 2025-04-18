import {
   Card as MuiCard,
   CardContent,
   CardActions,
   IconButton,
   Button,
   Typography,
   Box,
} from '@mui/material'
import styled from '@emotion/styled'
import { Icons } from '../../assets/icons'

const CatalogCardWithDelete = ({
   image,
   title,
   price,
   onDelete,
   onAddToCart,
}) => {
   return (
      <Card>
         <DeleteButton onClick={onDelete} size="small">
            <img src={Icons.cancel} alt="" />
         </DeleteButton>

         <ImageContainer>
            <StyledImage src={image} alt={title} />
         </ImageContainer>

         <Content>
            <TitleText>{title}</TitleText>
            <PriceText>{price.toLocaleString()} с</PriceText>
         </Content>

         <Actions>
            <AddButton
               variant="contained"
               startIcon={<img src={Icons.basket} alt="" />}
               onClick={onAddToCart}
            >
               В КОРЗИНУ
            </AddButton>
         </Actions>
      </Card>
   )
}

export default CatalogCardWithDelete

const Card = styled(MuiCard)`
   width: 219px;
   height: 367px;
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding: 8px;
`

const DeleteButton = styled(IconButton)`
   position: absolute;
   top: 8px;
   right: 8px;
   background-color: white;
   border: solid 1.13px #909cb54d;
   z-index: 1;
   width: 18px;
   height: 18px;

   &:hover {
      background-color: #f5f5f5;
   }
`

const ImageContainer = styled(Box)`
   display: flex;
   justify-content: center;
   margin-top: 16px;
`

const StyledImage = styled('img')`
   width: 155px;
   height: 170px;
   object-fit: contain;
`

const Content = styled(CardContent)`
   padding-left: 8px;
   padding-right: 8px;
   padding-top: 16px;
`

const TitleText = styled(Typography)`
   font-size: 14px;
   font-weight: 500;
   width: 178px;
   height: 40px;
`

const PriceText = styled(Typography)`
   font-size: 18px;
   font-weight: 700;
   margin-top: 8px;
   max-width: 185px;
   min-height: 25px;
`

const Actions = styled(CardActions)`
   justify-content: center;
   padding-left: 8px;
   padding-right: 8px;
   padding-bottom: 16px;
`

const AddButton = styled(Button)`
   height: 46px;
   background-color: #d122b4;

   font-weight: 500;
   text-transform: none;
   width: 100%;

   &:hover {
      background-color: #bb1ca3;
   }
`
