import React from 'react'
import {
   Card,
   CardContent,
   CardActions,
   IconButton,
   Button,
   Typography,
   Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const CatalogCardWithDelete = ({
   image,
   title,
   price,
   onDelete,
   onAddToCart,
}) => {
   return (
      <Card
         sx={{
            width: 219,
            height: 367,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 1,
            borderRadius: 2,
         }}
      >
         <IconButton
            onClick={onDelete}
            sx={{
               position: 'absolute',
               top: 8,
               right: 8,
               backgroundColor: 'white',
               boxShadow: 1,
               zIndex: 1,
               width: '18px',
               height: '18px',
               '&:hover': {
                  backgroundColor: '#f5f5f5',
               },
            }}
            size="small"
         >
            <CloseIcon fontSize="small" />
         </IconButton>

         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img
               src={image}
               alt={title}
               width={155}
               height={170}
               style={{ objectFit: 'contain' }}
            />
         </Box>

         <CardContent sx={{ px: 1, pt: 2 }}>
            <Typography
               fontSize={14}
               fontWeight={500}
               sx={{ maxWidth: 178, minHeight: 40 }}
            >
               {title}
            </Typography>
            <Typography
               fontSize={18}
               fontWeight={700}
               mt={1}
               sx={{ maxWidth: 185, minHeight: 25 }}
            >
               {price.toLocaleString()} с
            </Typography>
         </CardContent>

         <CardActions sx={{ justifyContent: 'center', px: 1, pb: 2 }}>
            <Button
               variant="contained"
               startIcon={<ShoppingCartIcon />}
               fullWidth
               onClick={onAddToCart}
               sx={{
                  height: 46,
                  backgroundColor: '#d122b4',
                  borderRadius: 2,
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                     backgroundColor: '#bb1ca3',
                  },
               }}
            >
               В КОРЗИНУ
            </Button>
         </CardActions>
      </Card>
   )
}

export default CatalogCardWithDelete
