import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../store/lk-favorite/favoritesThunk'
import { Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CompactCard from '../components/UI/cards/CompactCard'
import { Images } from '../assets/images'

const LKfavorites = () => {
   const dispatch = useDispatch()
   const favorites = useSelector(
      (state) => state.favorites.favorites || state.favorites.ids || []
   )
   const [activeTab, setActiveTab] = useState('favorites')

   useEffect(() => {
      dispatch(fetchFavorites())
   }, [dispatch])

   const handleTabClick = (tabName) => {
      setActiveTab(tabName)
   }

   return (
      <MainContainer>
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
