import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { fetchOrderDetailsThunk } from '../store/orders/orderHistoryThink'
import { Box, Typography, Grid, styled, Divider, Chip } from '@mui/material'
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
      orderNumber = '',
      date = '',
      status = '',
      products = [],
      orders: altProducts = [],
      firstName = '',
      lastName = '',
      address = '',
      phone = '',
      phoneNumber = '',
      email = '',
      paymentMethod = '',
      discountAmount = 0,
      totalPrice = 0,
      endTotalPrice = 0,
      fullName = '',
      article = '',
   } = selectedOrder

   const productList = products.length ? products : altProducts

   return (
      <>
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
               № {orderNumber || article}
            </Typography>

            <StyledBoxCards>
               {productList.map((product, index) => (
                  <CompactCard
                     key={index}
                     title={product.productName || product.name}
                     price={product.discountPrice || product.price}
                     rating={product.rating || 0}
                     reviews={product.count || product.quantity || 1}
                  />
               ))}
            </StyledBoxCards>
            <br />
            <Field label="Статус">
               <Chip
                  label={getStatusLabel(status) || status}
                  color={getStatusColor(status)}
                  sx={{ mr: 1 }}
               />
            </Field>

            <Grid container spacing={3} mt={4}>
               <Grid item xs={12} md={6}>
                  <Field label="Клиент">
                     {fullName || `${firstName} ${lastName}`}
                  </Field>
                  <Field label="Адрес">{address}</Field>
                  <Field label="Телефон">{phone || phoneNumber}</Field>
                  <Field label="Email">{email}</Field>
               </Grid>

               <Grid item xs={12} md={6}>
                  <Field label="Дата">{formatDate(date)}</Field>
                  <Field label="Способ оплаты">
                     {formatPayment(paymentMethod)}
                  </Field>
                  <Field label="Артикул">{article}</Field>
                  <Field label="Город">Чүй</Field>
               </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={2}>
               <Grid item>
                  <Typography>
                     Итог:{' '}
                     <strong>
                        {(endTotalPrice || totalPrice || 0).toFixed(2)} с
                     </strong>
                  </Typography>
               </Grid>
            </Grid>
         </Wrapper>
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

const StyledBreadCrumbs = styled(Box)(() => ({
   marginLeft: '12.2%',
   marginTop: '2%',
   position: 'relative',
   top: '10px',
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
   if (!dateString) return ''
   const date = new Date(dateString)
   return date.toLocaleDateString('ru-RU')
}
