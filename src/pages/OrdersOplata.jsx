import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderById, clearSelectedOrder } from './orderSlice'
import {
   Typography,
   Paper,
   CircularProgress,
   Box,
   styled,
   Divider,
} from '@mui/material'
import AdminHeader from '../layout/admin/AdminHeader'

const OrderDetails = () => {
   const { Id } = useParams()
   const dispatch = useDispatch()
   const { selectedOrder, orderLoading, orderError } = useSelector(
      (state) => state.orders
   )

   useEffect(() => {
      if (Id) dispatch(fetchOrderById(Id))
      return () => dispatch(clearSelectedOrder())
   }, [Id, dispatch])

   if (orderLoading) {
      return (
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
         >
            <CircularProgress />
         </Box>
      )
   }

   if (orderError) {
      return (
         <Typography>
            {typeof orderError === 'object'
               ? JSON.stringify(orderError)
               : orderError}
         </Typography>
      )
   }

   if (!selectedOrder) {
      return <Typography>Данных по заказу нет</Typography>
   }

   return (
      <>
         <AdminHeader />
         {/* <Breadcrumbs /> */}
         <ContainerBox>
            <Typography variant="h2" gutterBottom sx={{ marginLeft: '5%' }}>
               Оплата заказа {selectedOrder.id}
            </Typography>
            <hr style={{ width: '90%', marginLeft: '5%' }} />
            <ContentBox sx={{ marginLeft: '3.5%' }}>
               <LeftSection>
                  {selectedOrder.orders?.map((item, idx) => (
                     <Box key={idx} sx={{ mb: 3 }}>
                        <InfoRow>
                           <b>Наименование:</b> {item.productName}
                        </InfoRow>
                        <InfoRow>
                           <b>Кол-во товара:</b> {item.count}
                        </InfoRow>
                        <InfoRow>
                           <b>Общая сумма заказа:</b> {item.price} с
                        </InfoRow>
                        <InfoRow>
                           <b style={{ color: 'red' }}>Скидка:</b>{' '}
                           {item.discount}%
                        </InfoRow>
                        <InfoRow>
                           <b>Сумма скидки:</b> {item.discountPrice} с
                        </InfoRow>

                        <hr style={{ width: '30%' }} />
                     </Box>
                  ))}
                  <TotalRow>
                     <b>Итого:</b> {selectedOrder.endTotalPrice} с
                  </TotalRow>
               </LeftSection>

               <RightSection elevation={1}>
                  <BlockTitle>Информация о заказе</BlockTitle>
                  <InfoRow>
                     <b>Заказ №:</b> {selectedOrder.id}
                  </InfoRow>
                  <InfoRow>
                     <b>Состояние:</b> {selectedOrder.status}
                  </InfoRow>
                  <InfoRow>
                     <b>Контактный телефон:</b> {selectedOrder.phoneNumber}
                  </InfoRow>
                  <InfoRow>
                     <b>Адрес доставки:</b> {selectedOrder.address}
                  </InfoRow>
               </RightSection>
            </ContentBox>
         </ContainerBox>
      </>
   )
}

export default OrderDetails

const ContainerBox = styled(Box)(() => ({
   padding: '32px',
}))

const ContentBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'flex-start',
   gap: '32px',
   marginTop: '20px',
   flexWrap: 'wrap',
}))

const LeftSection = styled(Box)(() => ({
   flex: '1',
   minWidth: '300px',
   backgroundColor: '#fff',
   padding: '24px',
   borderRadius: '10px',
}))

const RightSection = styled(Paper)(() => ({
   minWidth: '280px',
   maxWidth: '320px',
   height: '240px',
   padding: '24px',
   borderRadius: '5px',
   backgroundColor: '#fff',
   border: '1px solid',
   marginTop: '3%',
}))

const BlockTitle = styled(Typography)(() => ({
   fontWeight: 'bold',
   fontSize: '16px',
   marginBottom: '16px',
}))

const InfoRow = styled(Typography)(() => ({
   fontSize: '14px',
   marginBottom: '10px',
}))

const TotalRow = styled(Typography)(() => ({
   fontWeight: 'bold',
   fontSize: '16px',
   marginTop: '12px',
   marginLeft: '18%',
}))
