import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOrderDetailsThunk } from './features/orders/orderHistoryThink'
import {
   Box,
   Typography,
   Grid,
   styled,
   Button,
   Chip,
   Divider,
   Paper,
} from '@mui/material'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'

const OrderDetails = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { selectedOrder, loading, error } = useSelector(
      (state) => state.orders
   )

   useEffect(() => {
      if (id) dispatch(fetchOrderDetailsThunk(id))
   }, [dispatch, id])

   if (loading) return <Typography>Загрузка...</Typography>
   if (error) return <Typography>Ошибка: {error}</Typography>
   if (!selectedOrder) return <Typography>Нет данных</Typography>

   return (
      <>
         <UserHeader />
         <Wrapper>
            <Typography variant="h5" mb={2}>
               История заказов
            </Typography>
            <hr />
            <br />
            <br />
            <Typography variant="h6" mb={2}>
               № {selectedOrder.article}
            </Typography>

            <Grid container spacing={3} mt={4}>
               <Grid item xs={12} md={6}>
                  <Field label="Статус">{selectedOrder.status}</Field>

                  <Field label="Клиент">{selectedOrder.fullName}</Field>
                  <Field label="Имя">—</Field>
                  {/* <Field label="Область/регион">—</Field> */}
                  <Field label="Адрес">{selectedOrder.address}</Field>
                  <Field label="Телефон">{selectedOrder.phoneNumber}</Field>
                  <Field label="Email">example@gmail.com</Field>
               </Grid>

               <Grid item xs={12} md={6}>
                  <Field label="Дата">23.10.22</Field>
                  <Field label="Способ оплаты">Наличные</Field>
                  <Field label="Фамилия">—</Field>
                  {/* <Field label="Город">—</Field> */}
               </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Grid container spacing={2}>
               <Grid item>
                  <Typography>
                     Скидка:{' '}
                     <strong>
                        {selectedOrder.orders
                           .reduce(
                              (acc, item) =>
                                 acc + (item.price - item.discountPrice),
                              0
                           )
                           .toFixed(2)}{' '}
                        с
                     </strong>
                  </Typography>
               </Grid>
               <Grid item>
                  <Typography>
                     Итог:{' '}
                     <strong>
                        {selectedOrder.endTotalPrice?.toLocaleString('ru-RU')} с
                     </strong>
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

const ProductCard = styled(Box)(({ theme }) => ({
   width: 160,
   padding: theme.spacing(1),
   textAlign: 'center',
   border: '1px solid #ccc',
   borderRadius: 6,
   backgroundColor: '#fff',
}))

const Field = ({ label, children }) => (
   <Box mb={1}>
      <Typography fontSize="14px" color="gray">
         {label}
      </Typography>
      <Typography fontWeight={500}>{children}</Typography>
   </Box>
)
