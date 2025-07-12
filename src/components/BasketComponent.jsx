import {
   Box,
   Typography,
   Button,
   Checkbox,
   FormControlLabel,
   styled,
   Card,
   CardContent,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   fetchBasket,
   removeFromBasket,
   toggleFavorite,
} from '../store/basket/basketThunk'
import { increase, decrease } from '../store/basket/basketSlice'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'
import CartCard from '../components/UI/cards/CartCard'
import { Images } from '../assets/images'
import { Icons } from '../assets/icons'
import Breadcrumbs from './UI/BreadCrums'


const BasketComponent = () => {
   const dispatch = useDispatch()
   const { basketItems, loading, error } = useSelector((state) => state.basket)
   const [allSelected, setAllSelected] = useState(false)

   useEffect(() => {
      dispatch(fetchBasket())
   }, [dispatch])

   useEffect(() => {
      if (basketItems.length > 0) {
         const allItemsSelected = basketItems.every((item) => item.selected)
         setAllSelected(allItemsSelected)
      }
   }, [basketItems])

   const selectedItems = basketItems.filter((item) => item.selected)
   const totalQuantity = selectedItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
   )
   const totalSum = selectedItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
   )
   const discountPercentage = 0.2
   const totalDiscount = selectedItems.reduce(
      (sum, item) =>
         sum + (item.price || 0) * (item.quantity || 0) * discountPercentage,
      0
   )
   const finalPrice = totalSum - totalDiscount

   const handleSelectAll = (e) => {
      const selected = e.target.checked
      setAllSelected(selected)
      dispatch({ type: 'basket/toggleSelectAll', payload: selected })
   }

   const handleIncrease = (productTypeId) =>
      dispatch(increase({ productTypeId }))
   const handleDecrease = (productTypeId) =>
      dispatch(decrease({ productTypeId }))
   const handleRemove = async (productTypeId) => {
      try {
         await dispatch(removeFromBasket(productTypeId)).unwrap()
      } catch (error) {
         console.error('Remove failed:', error.message)
      }
   }

   const handleFavorite = async (productTypeId) => {
      try {
         await dispatch(toggleFavorite(productTypeId)).unwrap()
      } catch (error) {
         console.error('Favorite failed:', error.message)
      }
   }

   const handleSelect = (productTypeId) => (e) => {
      const selected = e.target.checked
      dispatch({
         type: 'basket/toggleSelect',
         payload: { productTypeId, selected },
      })
   }

   const handleRemoveSelected = () =>
      selectedItems.forEach((item) =>
         dispatch(removeFromBasket(item.productTypeId))
      )
   const handleMoveToFavorites = () =>
      selectedItems.forEach((item) =>
         dispatch(toggleFavorite(item.productTypeId))
      )

   let mainContent
   if (!loading && !error && basketItems.length === 0) {
      mainContent = (
         <EmptyCartContainer>
            <EmptyCartImage src={Images.basketPhoto} alt="Empty cart" />
            <Message>Ваша корзина пуста</Message>
            <SubMessage>Но вы всегда можете ее наполнить</SubMessage>
            <ShopButton variant="contained">К покупкам</ShopButton>
         </EmptyCartContainer>
      )
   } else if (loading) {
      mainContent = (
         <LoadingContainer>
            <LoadingText>Загрузка...</LoadingText>
         </LoadingContainer>
      )
   } else if (error) {
      mainContent = (
         <ErrorContainer>
            <ErrorText>Ошибка: {error}</ErrorText>
         </ErrorContainer>
      )
   } else {
      mainContent = (
         <ContentContainer>
            <MainContent>
               <ControlsContainer>
                  <ControlsContent>
                     <StyledFormControlLabel
                        control={
                           <CustomCheckbox
                              checked={allSelected}
                              onChange={handleSelectAll}
                           />
                        }
                        label="Отметить все"
                     />
                     <ControlButton
                        onClick={handleRemoveSelected}
                        disabled={selectedItems.length === 0}
                     >
                        <IconImage src={Icons.deleteb} alt="delete" />
                        Удалить
                     </ControlButton>
                     <ControlButton
                        onClick={handleMoveToFavorites}
                        disabled={selectedItems.length === 0}
                     >
                        <IconImage src={Icons.likeW} alt="favorite" />
                        Переместить в избранное
                     </ControlButton>
                  </ControlsContent>
               </ControlsContainer>
               <CartItemsContainer>
                  {basketItems.map((item) => (
                     <CartCard
                        key={item.productTypeId}
                        productTypeId={item.productTypeId}
                        image={item.imageUrl}
                        name={item.name}
                        rating={item.rating}
                        reviews={item.reviews}
                        inStock={item.inStock}
                        code={item.code}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => handleIncrease(item.productTypeId)}
                        onDecrease={() => handleDecrease(item.productTypeId)}
                        onRemove={() => handleRemove(item.productTypeId)}
                        onFavorite={() => handleFavorite(item.productTypeId)}
                        isLiked={item.isLiked}
                        selected={item.selected}
                        onSelect={handleSelect(item.productTypeId)}
                     />
                  ))}
               </CartItemsContainer>
            </MainContent>
            <SummaryContainer>
               <SummaryContent>
                  <SummaryTitle>Сумма заказа</SummaryTitle>
                  <SummaryDivider />
                  <SummaryRow>
                     <SummaryLabel>Количество товаров:</SummaryLabel>
                     <SummaryValue>{totalQuantity} шт.</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                     <SummaryLabel>Ваша скидка (20%):</SummaryLabel>
                     <SummaryDiscountValue>
                        – {totalDiscount.toLocaleString()} с
                     </SummaryDiscountValue>
                  </SummaryRow>
                  <SummaryRow>
                     <SummaryLabel>Сумма:</SummaryLabel>
                     <SummaryValue>{totalSum.toLocaleString()} с</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                     <SummaryTotalLabel>Итого</SummaryTotalLabel>
                     <SummaryTotalValue>
                        {finalPrice.toLocaleString()} с
                     </SummaryTotalValue>
                  </SummaryRow>
                  <CheckoutButton
                     variant="contained"
                     startIcon={<ShoppingCartIcon />}
                     disabled={selectedItems.length === 0}
                  >
                     ПЕРЕЙТИ К ОФОРМЛЕНИЮ
                  </CheckoutButton>
               </SummaryContent>
            </SummaryContainer>
         </ContentContainer>
      )
   }

   return (
      <>
         <UserHeader />
         <MainContainer>
            <BreadcrumbContainer>
               <Breadcrumbs />
            </BreadcrumbContainer>
            <PageTitle>
               Товары в корзине
               <PageTitleIcon />
            </PageTitle>
            <PageDivider />
            {mainContent}
         </MainContainer>
         <Footer />
      </>
   )
}

export default BasketComponent

const CheckoutButton = styled(Button)(({ theme }) => ({
   width: '100%',
   height: '48px',
   backgroundColor: '#CB11AB',
   color: '#fff',
   fontWeight: 600,
   marginTop: '10px',
   borderRadius: '8px',
   textTransform: 'none',
   fontSize: '16px',
   boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
   '&:hover': {
      backgroundColor: '#CB11AB',
      boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
   },
}))

const ShopButton = styled(Button)(({ theme }) => ({
   width: '200px',
   height: '48px',
   backgroundColor: '#CB11AB',
   color: '#fff',
   fontWeight: 600,
   marginTop: '20px',
   borderRadius: '8px',
   textTransform: 'none',
   fontSize: '16px',
   boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
   '&:hover': {
      backgroundColor: '#CB11AB',
      boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
   },
}))

const MainContainer = styled(Box)(({ theme }) => ({
   maxWidth: '1400px',
   margin: '0 auto',
   padding: theme.spacing(3),
   minHeight: '100vh',
}))

const BreadcrumbContainer = styled(Box)(({ theme }) => ({
   marginBottom: theme.spacing(2),
   fontSize: '14px',
   color: '#6c757d',
   '& .current': { color: '#495057', fontWeight: 500 },
   '& .separator': { margin: '0 8px', color: '#adb5bd' },
}))

const ContentContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(3),
   marginTop: '2%',
   [theme.breakpoints.down('lg')]: { 
      flexDirection: 'column' 
   },
}))

const MainContent = styled(Box)(({ theme }) => ({
   flex: 1,
   minWidth: 0,
}))

const PageTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   marginBottom: theme.spacing(3),
   color: '#212529',
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(1),
   fontSize: '1.75rem',
}))

const PageTitleIcon = styled(ShoppingCartIcon)(({ theme }) => ({
   fontSize: '1.5rem',
   color: '#6c757d',
}))

const ControlsContainer = styled(Card)(({ theme }) => ({
   marginBottom: theme.spacing(3),
   borderRadius: '12px',
   overflow: 'visible',
}))

const ControlsContent = styled(CardContent)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(3),
   padding: theme.spacing(2, 3),
   '&:last-child': { paddingBottom: theme.spacing(2) },
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
   },
}))

const ControlButton = styled(Button)(({ theme }) => ({
   fontSize: '14px',
   color: '#6c757d',
   textTransform: 'none',
   padding: theme.spacing(0.5, 1),
   filter: 'grayscale(100%) brightness(0.5)',
   minWidth: 'auto',
   fontWeight: 500,
   '&:hover': { 
      backgroundColor: 'rgba(108, 117, 125, 0.1)', 
      color: '#495057' 
   },
   '& .MuiButton-startIcon': { 
      marginRight: theme.spacing(0.5) 
   },
}))

const IconImage = styled('img')(({ theme }) => ({
   width: '20px',
   height: '20px',
   marginRight: '8px',
}))

const CartItemsContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(2),
}))

const SummaryContainer = styled(Card)(({ theme }) => ({
   width: '350px',
   maxHeight: 'fit-content',
   position: 'sticky',
   top: theme.spacing(3),
   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
   borderRadius: '16px',
   overflow: 'hidden',
}))

const SummaryContent = styled(CardContent)(({ theme }) => ({
   padding: theme.spacing(3),
}))

const SummaryTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   marginBottom: theme.spacing(3),
   fontSize: '1.25rem',
   color: '#212529',
}))

const SummaryDivider = styled('hr')(({ theme }) => ({
   width: '100%',
   border: '1px solid #CDCDCD',
   margin: '0px 0px 25px',
}))

const PageDivider = styled('hr')(({ theme }) => ({
   width: '100%',
   border: '1px solid #CDCDCD',
   margin: '10px 0',
}))

const SummaryRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: theme.spacing(2),
   '&.total': {
      paddingTop: theme.spacing(2),
      borderTop: `2px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(2),
      marginBottom: 0,
   },
}))

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
   color: '#D100D1',
   '&.Mui-checked': { color: '#D100D1' },
   '& .MuiSvgIcon-root': { fontSize: '1.25rem' },
}))

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
   '& .MuiFormControlLabel-label': {
      fontSize: '14px',
      fontWeight: 500,
      color: '#495057',
   },
}))

const SummaryLabel = styled(Typography)(({ theme }) => ({
   fontSize: '14px',
   color: '#6c757d',
   fontWeight: 400,
}))

const SummaryValue = styled(Typography)(({ theme }) => ({
   fontSize: '14px',
   fontWeight: 600,
   color: '#212529',
}))

const SummaryDiscountValue = styled(Typography)(({ theme }) => ({
   fontSize: '14px',
   fontWeight: 600,
   color: '#dc3545',
}))

const SummaryTotalLabel = styled(Typography)(({ theme }) => ({
   fontSize: '18px',
   fontWeight: 700,
   color: '#212529',
}))

const SummaryTotalValue = styled(Typography)(({ theme }) => ({
   fontSize: '18px',
   fontWeight: 700,
   color: '#212529',
}))

const EmptyCartContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   textAlign: 'center',
   padding: theme.spacing(10),
}))

const EmptyCartImage = styled('img')(({ theme }) => ({
   width: '250px',
   height: 'auto',
   marginBottom: theme.spacing(3),
}))

const Message = styled(Typography)(({ theme }) => ({
   fontSize: '24px',
   color: '#292929',
   marginBottom: theme.spacing(1),
   fontWeight: 500,
}))

const SubMessage = styled(Typography)(({ theme }) => ({
   fontSize: '18px',
   color: '#1A1A25',
   fontWeight: 400,
   marginBottom: theme.spacing(3),
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '400px',
}))

const LoadingText = styled(Typography)(({ theme }) => ({
   color: 'text.secondary',
}))

const ErrorContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '400px',
}))

const ErrorText = styled(Typography)(({ theme }) => ({
   color: 'error.main',
}))
