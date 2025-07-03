import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icons } from '../../assets/icons'
import PhonesSlider from '../../components/PhonesSlider'

const ProductDetails = ({ product }) => {
   if (!product) return null

   const {
      name,
      available,
      article,
      colors = [],
      specs = [],
      price,
      oldPrice,
      discount,
      images = [],
   } = product

   const phoneImages = images

   return (
      <Container>
         <PhonesSlider images={phoneImages} />

         <InfoSection>
            <Title>{name}</Title>

            <StatusRow>
               <Status>В наличии ({available})</Status>
               <Article>Артикул: {article}</Article>
            </StatusRow>

            <Label>Цвет товара:</Label>
            <ColorRow>
               {colors.map((color, i) => (
                  <ColorDot key={i} sx={{ backgroundColor: color }} />
               ))}
            </ColorRow>

            <SpecTable>
               {specs.map(({ label, value }, i) => (
                  <SpecRow key={i}>
                     <SpecLabel>{label}</SpecLabel>
                     <SpecValue>{value}</SpecValue>
                  </SpecRow>
               ))}
            </SpecTable>

            <PriceSection>
               <CurrentPrice>{price} с</CurrentPrice>
               {oldPrice && <OldPrice>{oldPrice} с</OldPrice>}
               {discount && <DiscountTag>{discount}</DiscountTag>}
            </PriceSection>

            <ActionButtons>
               <CartButton>
                  <img src={Icons.deleteb} alt="delete" />
               </CartButton>
               <EditButton variant="contained">Редактировать</EditButton>
            </ActionButtons>
         </InfoSection>
      </Container>
   )
}

export default ProductDetails

// ========== STYLED COMPONENTS ==========

const Container = styled(Box)({
   display: 'flex',
   gap: '48px',
   alignItems: 'flex-start',
   padding: '32px',
   flexWrap: 'wrap',
})

const InfoSection = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   maxWidth: '420px',
})

const Title = styled(Typography)({
   fontSize: '24px',
   fontWeight: 600,
})

const StatusRow = styled(Box)({
   display: 'flex',
   gap: '16px',
   fontSize: '14px',
})

const Status = styled(Typography)({
   color: '#27AE60',
   fontWeight: 500,
})

const Article = styled(Typography)({
   color: '#888',
})

const Label = styled(Typography)({
   fontSize: '14px',
   fontWeight: 500,
   color: '#333',
})

const ColorRow = styled(Box)({
   display: 'flex',
   gap: '8px',
})

const ColorDot = styled(Box)({
   width: 18,
   height: 18,
   borderRadius: '50%',
   border: '1px solid #ccc',
   cursor: 'pointer',
})

const SpecTable = styled(Box)({
   borderTop: '1px dotted #ccc',
   marginTop: '8px',
})

const SpecRow = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   fontSize: '14px',
   padding: '6px 0',
   borderBottom: '1px dotted #ccc',
})

const SpecLabel = styled('span')({
   color: '#888',
})

const SpecValue = styled('span')({
   fontWeight: 500,
   color: '#000',
})

const PriceSection = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '12px',
})

const CurrentPrice = styled(Typography)({
   fontSize: '20px',
   fontWeight: 'bold',
   color: '#000',
})

const OldPrice = styled(Typography)({
   fontSize: '16px',
   textDecoration: 'line-through',
   color: '#888',
})

const DiscountTag = styled(Typography)({
   color: '#CB11AB',
   fontWeight: 600,
})

const ActionButtons = styled(Box)({
   display: 'flex',
   gap: '12px',
})

const CartButton = styled(Button)({
   minWidth: '40px',
   border: '1px solid #ccc',
   fontSize: '20px',
   padding: '4px 10px',
   lineHeight: 1,
})

const EditButton = styled(Button)({
   backgroundColor: '#CB11AB',
   color: '#fff',
   '&:hover': {
      backgroundColor: '#A4088E',
   },
})
