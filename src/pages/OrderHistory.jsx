import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersThunk } from '../store/orders/orderHistoryThink'
import { Box, Container, Typography, styled } from '@mui/material'
import Footer from '../layout/Footer'
import { useNavigate } from 'react-router'

const statusColors = {
   READY_FOR_PICKUP: '#00A500',
   CANCELLED: '#FF6C6C',
   WAITING: '#FFA500',
   DELIVERED: '#00BFFF',
}

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
      navigate(`/user/orders/${orderId}`)
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
         <StyledKingBox sx={{ maxWidth: 950, mx: 'auto', mt: 4, px: 2 }}>
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
                     ></Typography>
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
   background: active ? '#CB11AB' : '#F7F7F8',
   color: active ? '#fff' : '#292929',
   border: 'none',
   borderRadius: '8px',
   padding: '10px 28px',
   fontWeight: 600,
   fontSize: '16px',
   cursor: 'pointer',
   marginRight: '12px',
   transition: 'background 0.2s, color 0.2s',
   boxShadow: active ? '0 2px 8px rgba(203,17,171,0.10)' : 'none',
   '&:hover': {
      background: active ? '#B10E97' : '#ececec',
      color: active ? '#fff' : '#CB11AB',
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

const StyledBreadCrumbs = styled(Box)(() => ({
   marginLeft: '12.2%',
   marginTop: '2%',
   position: 'relative',
   top: '10px',
}))
