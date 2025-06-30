// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams, useNavigate } from 'react-router-dom'
// import { fetchOrderDetailsThunk } from './features/orders/orderHistoryThink'
// import {
//    Box,
//    Typography,
//    Grid,
//    styled,
//    Button,
//    Chip,
//    Divider,
//    Paper,
// } from '@mui/material'
// import Footer from '../layout/Footer'
// import UserHeader from '../layout/user/UserHeader'
// import CompactCard from '../components/UI/cards/CompactCard'

// const OrderDetails = () => {
//    const { id } = useParams()
//    const navigate = useNavigate()
//    const dispatch = useDispatch()
//    const { selectedOrder, loading, error } = useSelector(
//       (state) => state.orders
//    )

//    useEffect(() => {
//       if (id) dispatch(fetchOrderDetailsThunk(id))
//    }, [dispatch, id])

//    if (loading) return <Typography>Загрузка...</Typography>
//    if (error) return <Typography>Ошибка: {error}</Typography>
//    if (!selectedOrder) return <Typography>Нет данных</Typography>

//    return (
//       <>
//          <UserHeader />
//          <Wrapper>
//             <Typography variant="h5" mb={2}>
//                История заказов
//             </Typography>
//             <hr />
//             <br />
//             <br />
//             <Typography variant="h6" mb={2}>
//                № {selectedOrder.article}
//             </Typography>
//             <StyledBoxCards>
//                <CompactCard
//                   image="https://s-mobile.shop/wa-data/public/shop/products/70/02/270/images/604/604.970.jpg"
//                   title="Bluetooth Наушники Yison Е6"
//                   price={2000}
//                   rating={5}
//                   reviews={78}
//                />
//                <CompactCard
//                   image="https://s-mobile.shop/wa-data/public/shop/products/70/02/270/images/604/604.970.jpg"
//                   title="Bluetooth Наушники Yison Е6"
//                   price={2000}
//                   rating={5}
//                   reviews={78}
//                />
//                <CompactCard
//                   image="https://s-mobile.shop/wa-data/public/shop/products/70/02/270/images/604/604.970.jpg"
//                   title="Bluetooth Наушники Yison Е6"
//                   price={2000}
//                   rating={5}
//                   reviews={78}
//                />
//                <CompactCard
//                   image="https://s-mobile.shop/wa-data/public/shop/products/70/02/270/images/604/604.970.jpg"
//                   title="Bluetooth Наушники Yison Е6"
//                   price={2000}
//                   rating={5}
//                   reviews={78}
//                />
//             </StyledBoxCards>
//             <Grid container spacing={3} mt={4}>
//                <Grid item xs={12} md={6}>
//                   <Field label="Статус">{selectedOrder.status}</Field>

//                   <Field label="Клиент">{selectedOrder.fullName}</Field>
//                   <Field label="Имя">—</Field>
//                   {/* <Field label="Область/регион">—</Field> */}
//                   <Field label="Адрес">{selectedOrder.address}</Field>
//                   <Field label="Телефон">{selectedOrder.phoneNumber}</Field>
//                   <Field label="Email">example@gmail.com</Field>
//                </Grid>

//                <Grid item xs={12} md={6}>
//                   <Field label="Дата">23.10.22</Field>
//                   <Field label="Способ оплаты">Наличные</Field>
//                   <Field label="Фамилия">—</Field>
//                   {/* <Field label="Город">—</Field> */}
//                </Grid>
//             </Grid>
//             <Divider sx={{ my: 4 }} />
//             <Grid container spacing={2}>
//                <Grid item>
//                   <Typography>
//                      Скидка:{' '}
//                      <strong>
//                         {selectedOrder.orders
//                            .reduce(
//                               (acc, item) =>
//                                  acc + (item.price - item.discountPrice),
//                               0
//                            )
//                            .toFixed(2)}{' '}
//                         с
//                      </strong>
//                   </Typography>
//                </Grid>
//                <Grid item>
//                   <Typography>
//                      Итог:{' '}
//                      <strong>
//                         {selectedOrder.endTotalPrice?.toLocaleString('ru-RU')} с
//                      </strong>
//                   </Typography>
//                </Grid>
//             </Grid>
//          </Wrapper>
//          <Footer />
//       </>
//    )
// }

// export default OrderDetails

// const Wrapper = styled(Box)(({ theme }) => ({
//    maxWidth: 1100,
//    margin: 'auto',
//    padding: theme.spacing(4),
// }))

// const ProductCard = styled(Box)(({ theme }) => ({
//    width: 160,
//    padding: theme.spacing(1),
//    textAlign: 'center',
//    border: '1px solid #ccc',
//    borderRadius: 6,
//    backgroundColor: '#fff',
// }))

// const Field = ({ label, children }) => (
//    <Box mb={1}>
//       <Typography fontSize="14px" color="gray">
//          {label}
//       </Typography>
//       <Typography fontWeight={500}>{children}</Typography>
//    </Box>
// )

// const StyledBoxCards = styled(Box)(({ theme }) => ({
//    display: 'flex',
//    gap: '15px',
// }))
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOrderDetailsThunk } from './features/orders/orderHistoryThink'
import { Box, Typography, Grid, styled, Divider, Chip } from '@mui/material'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'
import CompactCard from '../components/UI/cards/CompactCard'

const OrderDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { selectedOrder, loading, error } = useSelector(
      (state) => state.orders
   )

   useEffect(() => {
      if (id) dispatch(fetchOrderDetailsThunk(id))
   }, [dispatch, id])

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
   maxWidth: 1100,
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

// ================= Utils =================

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
