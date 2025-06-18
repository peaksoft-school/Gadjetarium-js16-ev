// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchOrderHistory } from '../pages/features/orders/orderHistoryThink'
// import { Box, Typography, Chip } from '@mui/material'

// const OrderHistory = () => {
//    const dispatch = useDispatch()
//    const {
//       data: orders,
//       status,
//       error,
//    } = useSelector((state) => state.orderHistory)

//    const [selectedStatus, setSelectedStatus] = useState(null)

//    useEffect(() => {
//       dispatch(fetchOrderHistory())
//    }, [dispatch])

//    const handleStatusFilter = (status) => {
//       setSelectedStatus((prev) => (prev === status ? null : status))
//    }

//    const filteredOrders = selectedStatus
//       ? orders.filter((order) => order.status === selectedStatus)
//       : orders

//    if (status === 'loading') return <Typography>Загрузка...</Typography>
//    if (status === 'failed')
//       return <Typography>Ошибка: {error?.message || error}</Typography>

//    const uniqueStatuses = [...new Set(orders.map((order) => order.status))]

//    return (
//       <Box>
//          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//             {uniqueStatuses.map((status) => (
//                <Chip
//                   key={status}
//                   label={status}
//                   onClick={() => handleStatusFilter(status)}
//                   sx={{
//                      backgroundColor:
//                         selectedStatus === status ? 'purple' : '#eee',
//                      color: selectedStatus === status ? 'white' : 'black',
//                      cursor: 'pointer',
//                   }}
//                />
//             ))}
//          </Box>

//          {filteredOrders.map((order) => (
//             <Box key={order.id} sx={{ border: '1px solid #ccc', p: 2, mb: 1 }}>
//                <Typography>Номер: {order.orderNumber}</Typography>
//                <Typography>Дата: {order.date}</Typography>
//                <Typography>Статус: {order.status}</Typography>
//                <Typography>Цена: {order.price}₸</Typography>
//             </Box>
//          ))}
//       </Box>
//    )
// }

// export default OrderHistory

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderHistory } from '../pages/features/orders/orderHistoryThink'
import { Box, Typography, Button } from '@mui/material'
import AdminHeader from '../layout/admin/AdminHeader'
import Footer from '../layout/Footer'

const statusColors = {
   Доставлен: '#00A500',
   Отменен: '#FF6C6C',
   'В обработке': '#FFA500',
   'В пути': '#00BFFF',
}

const tabs = ['История заказов', 'Избранное', 'Профиль']

const OrderHistory = () => {
   const dispatch = useDispatch()
   const {
      data: orders,
      status,
      error,
   } = useSelector((state) => state.orderHistory)
   const [activeTab, setActiveTab] = useState('История заказов')

   useEffect(() => {
      if (activeTab === 'История заказов') {
         dispatch(fetchOrderHistory())
      }
   }, [dispatch, activeTab])

   if (status === 'loading') return <Typography>Загрузка...</Typography>
   if (status === 'failed')
      return <Typography>Ошибка: {error?.message || error}</Typography>

   return (
      <div>
         <AdminHeader />
         <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
               {tabs.map((tab) => (
                  <Button
                     key={tab}
                     variant={activeTab === tab ? 'contained' : 'outlined'}
                     onClick={() => setActiveTab(tab)}
                     sx={{
                        textTransform: 'none',
                        backgroundColor:
                           activeTab === tab ? '#1f1f1f' : '#f0f0f0',
                        color: activeTab === tab ? 'white' : '#000',
                        borderRadius: '6px',
                        fontWeight: 500,
                        '&:hover': {
                           backgroundColor:
                              activeTab === tab ? '#333' : '#e0e0e0',
                        },
                     }}
                  >
                     {tab}
                  </Button>
               ))}
            </Box>

            {activeTab === 'История заказов' && (
               <Box>
                  {orders.map((order, idx) => (
                     <Box
                        key={order.id || idx}
                        sx={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           borderBottom: '1px solid #e0e0e0',
                           py: 1.5,
                           fontSize: 15,
                        }}
                     >
                        <Typography sx={{ width: 100, color: '#777' }}>
                           {new Date(order.date).toLocaleDateString('ru-RU')}
                        </Typography>
                        <Typography fontWeight={600} sx={{ width: 180 }}>
                           № {order.orderNumber}
                        </Typography>
                        <Typography
                           sx={{
                              width: 120,
                              color: statusColors[order.status] || '#000',
                              fontWeight: 500,
                           }}
                        >
                           {order.status}
                        </Typography>
                        <Typography fontWeight={500}>
                           {order.price.toLocaleString()} с
                        </Typography>
                     </Box>
                  ))}
               </Box>
            )}
         </Box>
         <Footer />
      </div>
   )
}

export default OrderHistory
