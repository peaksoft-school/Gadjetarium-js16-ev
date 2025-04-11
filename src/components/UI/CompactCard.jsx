import {
   Box,
   Card as MuiCard,
   CardContent,
   CardMedia,
   Typography,
   Rating,
   Stack,
} from '@mui/material'

const CompactCard = ({ image, title, price, rating, reviews }) => {
   return (
      <MuiCard
         sx={{
            width: 210,
            height: 354,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
         }}
      >
         <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
               width: '100%',
               height: 210,
               objectFit: 'contain',
               mb: 1.5,
               marginBottom: 3,
            }}
         />

         <CardContent sx={{ p: 0, textAlign: 'center' }}>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
               {title}
            </Typography>

            <Stack
               direction="row"
               justifyContent="center"
               alignItems="center"
               spacing={0.5}
               marginBottom={2}
            >
               <Typography variant="caption" color="text.secondary">
                  Рейтинг
               </Typography>
               <Rating value={rating} precision={0.5} readOnly size="small" />
               <Typography variant="caption" color="text.secondary">
                  ({reviews})
               </Typography>
            </Stack>

            <Typography
               variant="h6"
               fontWeight={700}
               sx={{ mt: 1, paddingRight: 12.8 }}
            >
               {price} с
            </Typography>
         </CardContent>
      </MuiCard>
   )
}

export default CompactCard
