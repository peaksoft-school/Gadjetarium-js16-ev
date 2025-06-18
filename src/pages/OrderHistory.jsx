// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchOrderHistory } from './features/orders/orderHistoryThink'
// import { Box, Chip, Typography, Divider } from '@mui/material'
// import { styled } from '@mui/material/styles'

// const OrderHistory = () => {
//    const dispatch = useDispatch()
//    const { orders, loading } = useSelector((state) => state.orderHistory)
//    const [selectedStatus, setSelectedStatus] = useState(null)

//    useEffect(() => {
//       dispatch(fetchOrderHistory())
//    }, [dispatch])

//    const statuses = [...new Set(orders.map((order) => order.status))]

//    const filteredOrders = selectedStatus
//       ? orders.filter((order) => order.status === selectedStatus)
//       : orders

//    const handleChipClick = (status) => {
//       setSelectedStatus((prev) => (prev === status ? null : status))
//    }

//    return (
//       <Container>
//          <Title>История заказов</Title>

//          <FilterWrapper>
//             {statuses.map((status) => (
//                <Chip
//                   key={status}
//                   label={status}
//                   onClick={() => handleChipClick(status)}
//                   sx={{
//                      backgroundColor:
//                         selectedStatus === status ? '#9c27b0' : '#e0e0e0',
//                      color: selectedStatus === status ? '#fff' : '#000',
//                      '&:hover': {
//                         backgroundColor:
//                            selectedStatus === status ? '#8e24aa' : '#d5d5d5',
//                      },
//                      fontWeight: 500,
//                   }}
//                />
//             ))}
//          </FilterWrapper>

//          <Divider />

//          {loading ? (
//             <Typography>Загрузка...</Typography>
//          ) : (
//             filteredOrders.map((order) => (
//                <React.Fragment key={order.id}>
//                   <OrderItem>
//                      <Box>
//                         <Typography variant="body2">{order.date}</Typography>
//                         <Typography variant="subtitle2">
//                            № {order.orderNumber}
//                         </Typography>
//                      </Box>

//                      <StatusText status={order.status}>
//                         {order.status}
//                      </StatusText>

//                      <Typography fontWeight="bold">
//                         {Number(order.price).toLocaleString()} с
//                      </Typography>
//                   </OrderItem>
//                   <Divider />
//                </React.Fragment>
//             ))
//          )}
//       </Container>
//    )
// }

// export default OrderHistory

// const statusColors = {
//    Доставлен: '#4caf50',
//    Отменен: '#f44336',
//    'В обработке': '#ff9800',
//    'В пути': '#2196f3',
// }

// const Container = styled(Box)(() => ({
//    padding: '24px',
//    maxWidth: '900px',
//    margin: '0 auto',
// }))

// const Title = styled(Typography)(() => ({
//    fontSize: '24px',
//    fontWeight: 'bold',
//    marginBottom: '16px',
// }))

// const FilterWrapper = styled(Box)(() => ({
//    marginBottom: '20px',
//    display: 'flex',
//    gap: '10px',
//    flexWrap: 'wrap',
// }))

// const OrderItem = styled(Box)(() => ({
//    display: 'flex',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//    padding: '12px 0',
// }))

// const StatusText = styled('span')(({ status }) => ({
//    color: statusColors[status] || 'gray',
// }))

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderHistory } from '../pages/features/orders/orderHistoryThink'
import { Box, Typography, Chip } from '@mui/material'

const OrderHistory = () => {
   const dispatch = useDispatch()
   const {
      data: orders,
      status,
      error,
   } = useSelector((state) => state.orderHistory)

   const [selectedStatus, setSelectedStatus] = useState(null)

   useEffect(() => {
      dispatch(fetchOrderHistory())
   }, [dispatch])

   const handleStatusFilter = (status) => {
      setSelectedStatus((prev) => (prev === status ? null : status))
   }

   const filteredOrders = selectedStatus
      ? orders.filter((order) => order.status === selectedStatus)
      : orders

   if (status === 'loading') return <Typography>Загрузка...</Typography>
   if (status === 'failed')
      return <Typography>Ошибка: {error?.message || error}</Typography>

   const uniqueStatuses = [...new Set(orders.map((order) => order.status))]

   return (
      <Box>
         <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {uniqueStatuses.map((status) => (
               <Chip
                  key={status}
                  label={status}
                  onClick={() => handleStatusFilter(status)}
                  sx={{
                     backgroundColor:
                        selectedStatus === status ? 'purple' : '#eee',
                     color: selectedStatus === status ? 'white' : 'black',
                     cursor: 'pointer',
                  }}
               />
            ))}
         </Box>

         {filteredOrders.map((order) => (
            <Box key={order.id} sx={{ border: '1px solid #ccc', p: 2, mb: 1 }}>
               <Typography>Номер: {order.orderNumber}</Typography>
               <Typography>Дата: {order.date}</Typography>
               <Typography>Статус: {order.status}</Typography>
               <Typography>Цена: {order.price}₸</Typography>
            </Box>
         ))}
      </Box>
   )
}

export default OrderHistory
