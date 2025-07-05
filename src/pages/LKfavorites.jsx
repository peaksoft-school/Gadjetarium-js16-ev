import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../store/lk-favorite/favoritesThunk'
import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CompactCard from '../components/UI/cards/CompactCard'
import { Images } from '../assets/images'
import Breadcrumbs from '../components/UI/BreadCrums'

const LKfavorites = () => {
   const dispatch = useDispatch()
   const { favorites } = useSelector((state) => state.favorite)
   const [activeTab, setActiveTab] = useState('favorites')

   useEffect(() => {
      dispatch(fetchFavorites())
   }, [dispatch])

   const handleTabClick = (tabName) => {
      setActiveTab(tabName)
      console.log('Switching to tab:', tabName)
   }

   return (
      <MainContainer>
         <StyledBreadCrumbs>
            <Breadcrumbs
               baseLabel="Личный кабинет"
               pathLabels={{
                  orders: 'История заказов',
                  favorites: 'Избранное',
                  profile: 'Профиль',
               }}
            />
         </StyledBreadCrumbs>

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

         {activeTab === 'favorites' &&
            (favorites?.length === 0 ? (
               <EmptyStateContainer>
                  <img
                     src={Images.izbrannyiImage}
                     alt="No favorites"
                     style={{ maxWidth: '200px', marginBottom: '20px' }}
                  />
                  <EmptyStateText>
                     <h3 style={{ color: 'black' }}>В ИЗБРАННОМ ПОКА ПУСТО</h3>
                     <br />
                     Воспользуйтесь поиском или каталогом,
                     <br /> выберите нужные товары и добавьте их в избранное!
                  </EmptyStateText>
                  <ContinueShoppingButton variant="outlined">
                     К покупкам
                  </ContinueShoppingButton>
               </EmptyStateContainer>
            ) : (
               <>
                  <ProductsGrid>
                     {favorites.map((item) => (
                        <CompactCard key={item.productId} card={item} />
                     ))}
                  </ProductsGrid>

                  <ContinueShoppingContainer>
                     <ContinueShoppingButton variant="outlined">
                        Продолжить покупки
                     </ContinueShoppingButton>
                  </ContinueShoppingContainer>
               </>
            ))}
      </MainContainer>
   )
}

export default LKfavorites

const MainContainer = styled(Box)({
   padding: '20px 40px',
   minHeight: '100vh',
   maxWidth: '1200px',
   margin: '0 auto',
   cursor: 'pointer',
})

const StyledBreadCrumbs = styled(Box)(() => ({
   marginTop: '2%',
   position: 'relative',
   top: '10px',
   marginBottom: '4%',
}))

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
