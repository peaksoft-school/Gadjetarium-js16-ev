// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchInfographic, setPeriod } from '../pages/features/infographicSlice'

// const periods = {
//    daily: 'За день',
//    monthly: 'За месяц',
//    yearly: 'За год',
// }

// const Infographic = () => {
//    const dispatch = useDispatch()
//    const { data, status, error, period } = useSelector(
//       (state) => state.infographic
//    )

//    useEffect(() => {
//       dispatch(fetchInfographic(period))
//    }, [dispatch, period])

//    const formatNumber = (n) => n?.toLocaleString('ru-RU') ?? '—'

//    return (
//       <div className="p-6 font-sans max-w-md mx-auto">
//          <h2 className="text-sm mb-4 font-medium uppercase text-gray-600">
//             Инфографика
//          </h2>

//          <div className="flex justify-between mb-6">
//             <div className="text-center">
//                <span className="text-blue-600 text-2xl font-bold">
//                   {formatNumber(data?.totalSalesToday)} с
//                </span>
//                <div className="text-sm text-gray-500">Выкупили на сумму</div>
//                <div className="text-blue-600 text-base font-medium mt-1">
//                   {formatNumber(data?.dailySaleUnits)} шт
//                </div>
//             </div>

//             <div className="text-center">
//                <span className="text-orange-500 text-2xl font-bold">
//                   {formatNumber(data?.monthlyOrders)} с
//                </span>
//                <div className="text-sm text-gray-500">Заказали на сумму</div>
//                <div className="text-orange-500 text-base font-medium mt-1">
//                   {formatNumber(data?.totalOrdersThisMonth)} шт
//                </div>
//             </div>
//          </div>

//          <div className="flex space-x-4 mb-4">
//             {Object.entries(periods).map(([key, label]) => (
//                <div
//                   key={key}
//                   className={`cursor-pointer pb-1 border-b-2 ${
//                      period === key
//                         ? 'border-black'
//                         : 'border-transparent text-gray-500'
//                   }`}
//                   onClick={() => dispatch(setPeriod(key))}
//                >
//                   {label}
//                </div>
//             ))}
//          </div>

//          <div className="bg-blue-50 rounded-xl p-4 text-center">
//             <div className="text-sm text-gray-600 mb-2">
//                Доставлено товаров на сумму
//             </div>
//             <div className="text-green-600 text-xl font-bold">
//                {formatNumber(data?.currentDeliveryCost)} с
//             </div>
//             <div className="text-green-500 text-base">
//                {formatNumber(data?.previousDeliveryCost)} с{' '}
//                <span className="text-gray-500 text-sm">
//                   (предыдущий период)
//                </span>
//             </div>
//          </div>

//          {status === 'loading' && (
//             <div className="text-sm mt-4 text-gray-500">Загрузка...</div>
//          )}
//          {status === 'failed' && (
//             <div className="text-sm mt-4 text-red-500">{error}</div>
//          )}
//       </div>
//    )
// }

// export default Infographic

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInfographic, setPeriod } from '../pages/features/infographicSlice'
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
            Инфографика
         </Typography>

         <InfoBlock>
            <InfoColumn color="#1976d2">
               <Typography variant="h6">
                  {format(data?.totalSalesToday)} с
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  Выкупили на сумму
               </Typography>
               <Typography variant="subtitle1">
                  {format(data?.dailySaleUnits)} шт
               </Typography>
            </InfoColumn>

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
            <Typography variant="h6" color="green">
               {format(data?.currentDeliveryCost)} с
            </Typography>
            <Typography variant="subtitle1" color="green">
               {format(data?.previousDeliveryCost)} с{' '}
               <Typography
                  component="span"
                  color="text.secondary"
                  variant="body2"
               >
                  (предыдущий период)
               </Typography>
            </Typography>
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
   width: 400,
   padding: theme.spacing(4),
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
   textAlign: 'center',
}))
