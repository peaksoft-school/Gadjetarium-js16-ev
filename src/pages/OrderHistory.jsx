import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersThunk } from './features/orders/orderHistoryThink'
import { Box, Container, Typography, styled } from '@mui/material'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router-dom'
import UserHeader from '../layout/user/UserHeader'

const statusColors = {
   READY_FOR_PICKUP: '#00A500',
   CANCELLED: '#FF6C6C',
   WAITING: '#FFA500',
   DELIVERED: '#00BFFF',
}

const tabs = ['История заказов', 'Избранное', 'Профиль']

const OrderHistory = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { orders, loading, error } = useSelector((state) => state.orders)
   const [activeTab, setActiveTab] = useState('История заказов')

   useEffect(() => {
      if (activeTab === 'История заказов') {
         dispatch(fetchOrdersThunk())
      }
   }, [dispatch, activeTab])

   const handleOrderClick = (orderId) => {
      navigate(`/orders/${orderId}`)
   }

   if (loading) return <Typography>Загрузка...</Typography>
   if (error)
      return (
         <Typography>
            Ошибка: {typeof error === 'string' ? error : 'Неизвестная ошибка'}
         </Typography>
      )

   return (
      <StyledDiv1>
         <UserHeader />
         <h2 style={{ position: 'relative', left: '12.2%', marginTop: '2%' }}>
            История заказов
         </h2>
         <br />
         <hr style={{ width: '75.5%', margin: 'auto' }} />
         <StyledKingBox sx={{ maxWidth: 950, mx: 'auto', mt: 4, px: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
               {tabs.map((tab) => (
                  <TabButton
                     key={tab}
                     active={activeTab === tab ? 1 : 0}
                     onClick={() => setActiveTab(tab)}
                  >
                     {tab}
                  </TabButton>
               ))}
            </Box>

            {activeTab === 'История заказов' && (
               <>
                  <Box
                     sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}
                  >
                     <Typography
                        sx={{
                           cursor: 'pointer',
                           color: '#5A5A5A',
                           fontSize: '14px',
                           textDecoration: 'underline',
                        }}
                     >
                        {/* Очистить список заказов */}
                     </Typography>
                  </Box>

                  <StyledBox2>
                     {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, idx) => (
                           <OrderRow
                              key={order.id || idx}
                              onClick={() => handleOrderClick(order.id)}
                              sx={{ cursor: 'pointer' }}
                           >
                              <Typography sx={{ width: 120, color: '#777' }}>
                                 {order?.date
                                    ? new Date(order.date).toLocaleDateString(
                                         'ru-RU'
                                      )
                                    : '—'}
                              </Typography>
                              <Typography sx={{ width: 200, fontWeight: 600 }}>
                                 № {order?.orderNumber || '—'}
                              </Typography>
                              <Typography
                                 sx={{
                                    width: 140,
                                    color:
                                       statusColors[order?.status] || '#000',
                                    fontWeight: 500,
                                 }}
                              >
                                 {order?.status || '—'}
                              </Typography>
                              <Typography fontWeight={500}>
                                 {typeof order?.price === 'number'
                                    ? `${order.price.toLocaleString()} с`
                                    : '—'}
                              </Typography>
                           </OrderRow>
                        ))
                     ) : (
                        <Typography>Нет заказов</Typography>
                     )}
                  </StyledBox2>
               </>
            )}
         </StyledKingBox>
         <Footer />
      </StyledDiv1>
   )
}

export default OrderHistory

const TabButton = styled('button')(({ active }) => ({
   backgroundColor: active ? '#1F1F1F' : '#F0F0F0',
   color: active ? '#FFFFFF' : '#000000',
   border: 'none',
   borderRadius: '6px',
   padding: '8px 16px',
   fontWeight: 500,
   cursor: 'pointer',
   fontSize: '14px',
   transition: '0.2s ease',
   '&:hover': {
      backgroundColor: active ? '#333' : '#e0e0e0',
   },
}))

const OrderRow = styled(Box)(() => ({
   display: 'grid',
   gridTemplateColumns: '320px 350px 350px 120px',
   alignItems: 'center',
   borderBottom: '1px solid #e0e0e0',
   padding: '12px 0',
   fontSize: '15px',
   gap: '16px',
}))

const StyledKingBox = styled(Container)(() => ({
   marginBottom: '5%',
}))

const StyledDiv1 = styled('div')(() => ({
   overflow: 'hidden',
}))
const StyledBox2 = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
}))
