import {
   Box,
   CardContent,
   Typography,
   Rating,
   Stack,
   CardMedia,
   Card as MuiCard,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const CompactCard = ({ image, title, price, rating, reviews }) => {
   return (
      <StyledCard>
         <StyledCardMedia component="img" image={image} alt={title} />
         <StyledCardContent>
            <TitleTypography variant="body2">{title}</TitleTypography>
            <RatingStack
               direction="row"
               justifyContent="center"
               alignItems="center"
               spacing={0.5}
            >
               <Typography variant="caption" color="text.secondary">
                  Рейтинг
               </Typography>
               <Rating value={rating} precision={0.5} readOnly size="small" />
               <Typography variant="caption" color="text.secondary">
                  ({reviews})
               </Typography>
            </RatingStack>
            <PriceTypography variant="h6">{price} с</PriceTypography>
         </StyledCardContent>
      </StyledCard>
   )
}

export default CompactCard

const StyledCard = styled(MuiCard)({
   width: 210,
   height: 354,
   borderRadius: 16,
   padding: 12,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const StyledCardMedia = styled(CardMedia)({
   width: '100%',
   height: 210,
   objectFit: 'contain',
   marginBottom: 24,
})

const StyledCardContent = styled(CardContent)({
   padding: 0,
   textAlign: 'center',
})

const TitleTypography = styled(Typography)({
   fontWeight: 500,
   marginBottom: 4,
   textAlign: 'start',
   width: '150px',
})

const RatingStack = styled(Stack)({
   marginBottom: 16,
})

const PriceTypography = styled(Typography)({
   fontWeight: 700,
   marginTop: 8,
   paddingRight: 12.8,
   textAlign: 'start',
})
