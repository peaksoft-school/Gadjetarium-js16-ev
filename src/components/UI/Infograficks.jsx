import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInfographic, setPeriod } from '../../pages/features/infographicSlice'
import { Box, Typography, Tabs, Tab } from '@mui/material'
import { styled } from '@mui/system'

const Infographic = () => {
   const dispatch = useDispatch()
   const { data, period, status } = useSelector((state) => state.infographic)

   useEffect(() => {
      dispatch(fetchInfographic(period))
   }, [dispatch, period])

   const format = (value) => value?.toLocaleString('ru-RU') ?? '—'

   const periods = {
      daily: 'За день',
      monthly: 'За месяц',
      yearly: 'За год',
   }

   return (
      <Container>
         <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            ИНФОГРАФИКА
         </Typography>
         <br />
         <InfoBlock>
            <InfoColumn color="#1976d2">
               <Typography variant="h6">
                  {format(data?.totalSalesToday)} с
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  Выкупили на сумму
               </Typography>
               <Typography variant="subtitle1">
                  {format(data?.dailySalesUnits)} шт
               </Typography>
            </InfoColumn>
            <hr />
            <InfoColumn color="#f57c00">
               <Typography variant="h6">
                  {format(data?.monthlyOrders)} с
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  Заказали на сумму
               </Typography>
               <Typography variant="subtitle1">
                  {format(data?.totalOrdersThisMonth)} шт
               </Typography>
            </InfoColumn>
         </InfoBlock>

         <Tabs
            value={period}
            onChange={(e, newValue) => dispatch(setPeriod(newValue))}
            textColor="primary"
            indicatorColor="primary"
         >
            {Object.entries(periods).map(([key, label]) => (
               <Tab key={key} label={label} value={key} />
            ))}
         </Tabs>

         <DeliveryBox mt={3}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
               Доставлено товаров на сумму
            </Typography>
            <StyledBox2>
               <Typography variant="h6" color="green">
                  {format(data?.currentDeliveryCost)} с <br />
                  <Typography
                     component="span"
                     color="text.secondary"
                     variant="body2"
                  >
                     Текущий период
                  </Typography>
               </Typography>

               <Typography variant="subtitle1" color="green">
                  {format(data?.previousDeliveryCost)} с <br />
                  <Typography
                     component="span"
                     color="text.secondary"
                     variant="body2"
                  >
                     Предыдущий период
                  </Typography>
               </Typography>
            </StyledBox2>
         </DeliveryBox>

         {status === 'loading' && (
            <Typography mt={2} variant="body2" color="text.secondary">
               Загрузка...
            </Typography>
         )}
      </Container>
   )
}

export default Infographic

const Container = styled(Box)(({ theme }) => ({
   width: 380,
   padding: theme.spacing(3),
}))

const InfoBlock = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: theme.spacing(4),
}))

const InfoColumn = styled(Box)(({ color }) => ({
   textAlign: 'center',
   color: color || '#000',
}))

const DeliveryBox = styled(Box)(({ theme }) => ({
   backgroundColor: '#eefaff',
   padding: theme.spacing(2),
   borderRadius: 12,
   textAlign: 'start',
}))

const StyledBox2 = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '30px',
}))
