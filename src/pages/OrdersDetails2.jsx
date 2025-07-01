import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOrderDetailsThunk } from './features/orders/orderHistoryThink'
import { Box, Typography, Grid, styled, Divider, Chip } from '@mui/material'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'
import CompactCard from '../components/UI/cards/CompactCard'
import Breadcrumbs from '../components/UI/BreadCrums'

const OrderDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const { selectedOrder, loading, error } = useSelector(
      (state) => state.orders
   )

   useEffect(() => {
      if (id) dispatch(fetchOrderDetailsThunk(id))
   }, [dispatch, id])

   useEffect(() => {
      if (!loading && selectedOrder && selectedOrder.products?.length === 0) {
         navigate('/orders/empty')
      }
   }, [loading, selectedOrder, navigate])

   if (loading) return <Typography>Загрузка...</Typography>
   if (error) return <Typography color="error">Ошибка: {error}</Typography>
   if (!selectedOrder) return <Typography>Нет данных</Typography>

   const {
      orderNumber,
      date,
      status,
      products = [],
      firstName,
      lastName,
      address,
      phone,
      email,
      paymentMethod,
      discountAmount,
      totalPrice,
   } = selectedOrder

   return (
      <>
         <UserHeader />
         <StyledBreadCrumbs>
            <Breadcrumbs
               baseLabel="Личный кабинет"
               pathLabels={{
                  orders: 'История заказов',
               }}
            />
         </StyledBreadCrumbs>
         <Wrapper>
            <Typography variant="h5" mb={2}>
               История заказов
            </Typography>
            <Divider />
            <br />
            <Typography variant="h6" mb={2}>
               № {orderNumber}
            </Typography>

            <StyledBoxCards>
               {products.map((product, index) => (
                  <CompactCard
                     key={index}
                     image={product.image}
                     title={product.name}
                     price={product.discountPrice}
                     rating={product.rating}
                     reviews={product.quantity}
                  />
               ))}
            </StyledBoxCards>
            <br />
            <Field>Статус</Field>
            <Box mb={2}>
               <Chip
                  label={getStatusLabel(status)}
                  color={getStatusColor(status)}
                  sx={{ mr: 1 }}
               />
            </Box>

            <Grid container spacing={3} mt={4}>
               <Grid item xs={12} md={6}>
                  <Field label="Клиент">{`${firstName} ${lastName}`}</Field>
                  <Field label="Имя">{`${firstName}`}</Field>
                  <Field label="Адрес">{address}</Field>
                  <Field label="Телефон">{phone}</Field>
                  <Field label="Email">{email}</Field>
               </Grid>

               <Grid item xs={12} md={6}>
                  <Field label="Дата">{formatDate(date)}</Field>
                  <Field label="Способ оплаты">
                     {formatPayment(paymentMethod)}
                  </Field>
                  <Field label="Фамилия">{lastName}</Field>
                  <Field label="Город">Чүй</Field>
               </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={2}>
               <Grid item>
                  <Typography>
                     Скидка: <strong>{discountAmount.toFixed(2)} с</strong>
                  </Typography>
               </Grid>

               <Grid item>
                  <Typography>
                     Итог: <strong>{totalPrice.toFixed(2)} с</strong>
                  </Typography>
               </Grid>
            </Grid>
         </Wrapper>
         <Footer />
      </>
   )
}

export default OrderDetails

const Wrapper = styled(Box)(({ theme }) => ({
   width: '80%',
   margin: 'auto',
   padding: theme.spacing(4),
}))

const StyledBoxCards = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '15px',
   flexWrap: 'wrap',
}))

const Field = ({ label, children }) => (
   <Box mb={1}>
      <Typography fontSize="14px" color="gray">
         {label}
      </Typography>
      <Typography fontWeight={500}>{children}</Typography>
   </Box>
)

const getStatusLabel = (status) => {
   switch (status) {
      case 'DELIVERED':
         return 'Доставлено'
      case 'PENDING':
         return 'В ожидании'
      case 'IN_PROGRESS':
         return 'В обработке'
      default:
         return status
   }
}

const getStatusColor = (status) => {
   switch (status) {
      case 'DELIVERED':
         return 'success'
      case 'PENDING':
         return 'default'
      case 'IN_PROGRESS':
         return 'warning'
      default:
         return 'default'
   }
}

const formatPayment = (method) => {
   switch (method) {
      case 'CREDIT_CARD':
         return 'Карта'
      case 'CASH':
         return 'Наличные'
      default:
         return method
   }
}

const formatDate = (dateString) => {
   const date = new Date(dateString)
   return date.toLocaleDateString('ru-RU')
}

const StyledBreadCrumbs = styled(Box)(() => ({
   marginLeft: '12.2%',
   marginTop: '2%',
   position: 'relative',
   top: '10px',
}))
