import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../store/favoritesThunk'
import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CompactCard from '../components/UI/cards/CompactCard'
import UserHeader from '../layout/user/UserHeader'
import Footer from '../layout/Footer'
import { Images } from '../assets/images'

const LKfavorites = () => {
   const dispatch = useDispatch()
   const { favorites, loading, error } = useSelector((state) => state.favorite)
   const [activeTab, setActiveTab] = React.useState('favorites')

   useEffect(() => {
      dispatch(fetchFavorites())
   }, [dispatch])

   useEffect(() => {}, [favorites])

   const handleTabClick = (tabName) => {
      setActiveTab(tabName)
      console.log('Switching to tab:', tabName)
   }

   if (loading) {
      return (
         <MainContainer>
            <LoadingContainer>
               <Typography>Загрузка...</Typography>
            </LoadingContainer>
         </MainContainer>
      )
   }

   if (error) {
      return (
         <MainContainer>
            <ErrorContainer>
               <Typography>Ошибка: {error}</Typography>
            </ErrorContainer>
         </MainContainer>
      )
   }

   return (
      <>
         <UserHeader />
         <MainContainer>
            <BreadcrumbContainer>
               <Typography variant="body2">
                  Личный кабинет » Избранное
               </Typography>
            </BreadcrumbContainer>

            <PageTitle variant="h4">Избранное</PageTitle>

            <NavigationContainer>
               <NavigationButton
                  className={activeTab === 'orders' ? 'active' : ''}
                  onClick={() => handleTabClick('orders')}
               >
                  История заказов
               </NavigationButton>
               <NavigationButton
                  className={activeTab === 'favorites' ? 'active' : ''}
                  onClick={() => handleTabClick('favorites')}
               >
                  Избранное
               </NavigationButton>
               <NavigationButton
                  className={activeTab === 'profile' ? 'active' : ''}
                  onClick={() => handleTabClick('profile')}
               >
                  Профиль
               </NavigationButton>
            </NavigationContainer>

            {favorites.length === 0 ? (
               <EmptyStateContainer>
                  <img
                     src={Images.izbrannyiImage}
                     alt="No favorites"
                     style={{ maxWidth: '200px', marginBottom: '20px' }}
                  />
                  <EmptyStateText>В избранном пока нет товаров</EmptyStateText>
                  <ContinueShoppingButton variant="outlined">
                     Продолжить покупки
                  </ContinueShoppingButton>
               </EmptyStateContainer>
            ) : (
               <>
                  <ProductsGrid>
                     {favorites.map((item) => (
                        <CompactCard
                           key={item.productId}
                           image={item.image || ''}
                           title={item.productName || 'Без названия'}
                           price={item.productPrice || 0}
                           rating={item.productRating || 0}
                           reviews={item.discountPrice || 0} // Note: Verify if discountPrice is correct for reviews
                        />
                     ))}
                  </ProductsGrid>
                  <ContinueShoppingContainer>
                     <ContinueShoppingButton variant="outlined">
                        Продолжить покупки
                     </ContinueShoppingButton>
                  </ContinueShoppingContainer>
               </>
            )}
         </MainContainer>
         <Footer />
      </>
   )
}

// Styled components
const MainContainer = styled(Box)({
   padding: '20px 40px',
   minHeight: '100vh',
   maxWidth: '1200px',
   margin: '0 auto',
})

const BreadcrumbContainer = styled(Box)({
   marginBottom: '20px',
   color: '#666666',
   fontSize: '14px',
})

const PageTitle = styled(Typography)({
   marginBottom: '30px',
   color: '#333333',
   fontWeight: 'bold',
   fontSize: '28px',
})

const NavigationContainer = styled(Box)({
   display: 'flex',
   marginBottom: '30px',
   gap: '0px',
})

const NavigationButton = styled(Button)({
   textTransform: 'none',
   color: '#666666',
   backgroundColor: '#e8e8e8',
   border: 'none',
   borderRadius: '8px',
   padding: '8px 20px',
   fontSize: '14px',
   fontWeight: 'normal',
   marginRight: '8px',
   minHeight: '36px',
   cursor: 'pointer',
   '&:hover': {
      backgroundColor: '#d8d8d8',
   },
   '&:active': {
      backgroundColor: '#c8c8c8',
      transform: 'translateY(1px)',
   },
   '&.active': {
      backgroundColor: '#4a5568',
      color: '#ffffff',
      fontWeight: 'normal',
      '&:hover': {
         backgroundColor: '#3a4558',
      },
      '&:active': {
         backgroundColor: '#2a3548',
         transform: 'translateY(1px)',
      },
   },
   '&:last-of-type': {
      marginRight: '0',
   },
})

const ProductsGrid = styled(Box)({
   display: 'flex',
   gap: '20px',
   marginBottom: '40px',
   flexWrap: 'wrap',
   justifyContent: 'flex-start',
})

const ContinueShoppingContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   marginTop: '30px',
})

const ContinueShoppingButton = styled(Button)({
   backgroundColor: 'transparent',
   color: '#e91e63',
   padding: '10px 24px',
   fontSize: '14px',
   fontWeight: 'normal',
   textTransform: 'none',
   borderRadius: '6px',
   border: '2px solid #e91e63',
   cursor: 'pointer',
   transition: 'all 0.2s ease',
   '&:hover': {
      backgroundColor: '#fce4ec',
      borderColor: '#e91e63',
   },
   '&:active': {
      backgroundColor: '#f8bbd9',
      transform: 'translateY(1px)',
   },
})

const LoadingContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   fontSize: '16px',
   color: '#666666',
})

const ErrorContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minHeight: '200px',
   fontSize: '16px',
   color: '#f44336',
})

const EmptyStateContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   minHeight: '300px',
   textAlign: 'center',
   color: '#666666',
})

const EmptyStateText = styled(Typography)({
   fontSize: '16px',
   marginBottom: '20px',
   color: '#666666',
})

export default LKfavorites
