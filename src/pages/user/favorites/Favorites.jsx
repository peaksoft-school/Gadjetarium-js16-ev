import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   fetchFavorites,
   toggleFavorite,
   toggleFromBasket,
} from '../../../store/lk-favorite/favoritesThunk'
import { Box, styled, Typography } from '@mui/material'
import Breadcrumbs from '../../../components/UI/BreadCrums'
import Card from '../../../components/UI/cards/Card'
import { Images } from '../../../assets/images'
import Button from '../../../components/UI/Button'
import { useNavigate } from 'react-router'

const Favorites = () => {
   const { favorites } = useSelector((state) => state.favorite)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(fetchFavorites())
   }, [])

   const handleToggleFavorite = (id) => {
      dispatch(toggleFavorite({ id }))
   }

   const handleFromBasket = ({ productId }) => {
      const product = {
         productId,
         quantity: 1,
      }
      dispatch(toggleFromBasket({ product }))
   }

   const handleNavigateToShopping = () => navigate('навигация к катологу')

   return (
      <StyledContainer>
         <Breadcrumbs />

         <Typography className="title">Избранное</Typography>

         <Box className="content">
            {favorites.length === 0 ? (
               <Box className="empty-content">
                  <img src={Images.izbrannyiImage} alt="empty" />
                  <Typography className="empty-title">
                     В избранном пока пусто
                  </Typography>
                  <Typography className="empty-description">
                     Воспользуйтесь поиском или каталогом, выберите нужные
                     товары и добавьте их в избранное!
                  </Typography>

                  <Button
                     variant="contained"
                     onClick={handleNavigateToShopping}
                  >
                     К покупкам
                  </Button>
               </Box>
            ) : (
               <Box className="container">
                  <Box className="cards-container">
                     {favorites.map((favorite) => (
                        <Card
                           key={favorite.productId}
                           image={favorite.image}
                           title={favorite.productName}
                           oldPrice={favorite.productPrice}
                           discountValue={favorite.discountPrice}
                           rating={favorite.productRating}
                           onToggleFavorite={() =>
                              handleToggleFavorite(favorite.productId)
                           }
                           reviews={favorite.ratingCount}
                           inStock={favorite.count}
                           onAddToCart={() =>
                              handleFromBasket({
                                 productId: favorite.productId,
                              })
                           }
                           isLiked={favorite.like}
                        />
                     ))}
                  </Box>

                  <Button
                     variant="outlined"
                     className="btn"
                     onClick={handleNavigateToShopping}
                  >
                     Продолжить покупки
                  </Button>
               </Box>
            )}
         </Box>
      </StyledContainer>
   )
}

export default Favorites

const StyledContainer = styled(Box)(() => ({
   padding: '60px 195px',
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',

   '& .container': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      width: '100%',

      '& .btn': {
         alignSelf: 'center',
         marginTop: '20px',
      },
   },

   '& .empty-content': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '30px',

      '& .empty-title': {
         fontSize: '24px',
         fontWeight: 500,
      },

      '& .empty-description': {
         width: '500px',
         textAlign: 'center',
      },
   },

   '& .title': {
      fontSize: '30px',
      fontWeight: 500,
      paddingBottom: '20px',
      borderBottom: '1px solid #CDCDCD',
   },

   '& .cards-container': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
   },
}))
