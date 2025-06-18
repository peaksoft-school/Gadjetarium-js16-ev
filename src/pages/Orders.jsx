import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../pages/orderSlice'
import { Icons } from '../assets/icons'
import Chip from '../components/UI/Chip'
import Input from '../components/UI/Input'
import AdminHeader from '../layout/admin/AdminHeader'
import DatePicker from '../components/UI/DatePicker'
import InputAdornment from '@mui/material/InputAdornment'
import { Container, styled, Box } from '@mui/material'
import UniversalTable from '../components/UI/UniversalTable'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Infographic from './Infograficks'

export default function Orders() {
   const [searchValue, setSearchValue] = useState('')
   const [fromDate, setFromDate] = useState(null)
   const [toDate, setToDate] = useState(null)
   const [selectedStatuses, setSelectedStatuses] = useState([])
   const [openPicker, setOpenPicker] = useState(null)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {
      data: orders = [],
      loading,
      error,
   } = useSelector((state) => state.orders)

   const loadOrders = () => {
      const params = {}
      if (searchValue.trim()) params.search = searchValue.trim()
      if (fromDate) params.from = fromDate.format('YYYY-MM-DD')
      if (toDate) params.to = toDate.format('YYYY-MM-DD')
      if (selectedStatuses.length > 0)
         params.status = selectedStatuses.join(',')

      dispatch(fetchOrders(params))
   }

   useEffect(() => {
      loadOrders()
   }, [])

   useEffect(() => {
      loadOrders()
   }, [searchValue, fromDate, toDate, selectedStatuses])

   const handleDateChange = (date) => {
      if (openPicker === 'from') setFromDate(date)
      if (openPicker === 'to') setToDate(date)
      setOpenPicker(null)
   }

   const handleSearchChange = (event) => {
      setSearchValue(event.target.value)
   }

   const handleStatusClick = (status) => {
      setSelectedStatuses((prev) =>
         prev.includes(status)
            ? prev.filter((s) => s !== status)
            : [...prev, status]
      )
   }

   const handleStatusDelete = (status) => {
      setSelectedStatuses((prev) => prev.filter((s) => s !== status))
   }

   const filteredOrders =
      selectedStatuses.length > 0
         ? orders.filter((order) => selectedStatuses.includes(order.status))
         : orders

   const statusCounts = selectedStatuses.map((status) => ({
      status,
      count: orders.filter((order) => order.status === status).length,
   }))

   const statusOptions = [
      { label: 'WAITING', value: 'WAITING' },
      { label: 'READY_FOR_PICKUP', value: 'READY_FOR_PICKUP' },
      { label: 'COURIER_ON_THE_WAY', value: 'COURIER_ON_THE_WAY' },
      { label: 'DELIVERED', value: 'DELIVERED' },
      { label: 'CANCELLED', value: 'CANCELLED' },
      { label: 'GET', value: 'GET' },
   ]

   const handleOrderClick = (orderId) => {
      navigate(`/orders/${orderId}`)
   }

   return (
      <Box>
         <AdminHeader />
         <StyledDiv1>
            <StyledInput
               placeholder="Поиск по артикулу или ..."
               value={searchValue}
               onChange={handleSearchChange}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        <img
                           src={Icons.searchGrey}
                           alt="search"
                           style={{ width: 20, height: 20, cursor: 'pointer' }}
                        />
                     </InputAdornment>
                  ),
               }}
            />
         </StyledDiv1>

         <br />
         <StyledDiv2>
            {statusOptions.map((status) => (
               <Chip
                  key={status.value}
                  label={status.label}
                  onClick={() => handleStatusClick(status.value)}
                  variant={
                     selectedStatuses.includes(status.value)
                        ? 'filled'
                        : 'outlined'
                  }
               />
            ))}
         </StyledDiv2>

         <br />

         <StyledDiv2>
            {statusCounts.map(({ status, count }) => (
               <Chip
                  key={status}
                  label={`${status} × ${count}`}
                  onDelete={() => handleStatusDelete(status)}
               />
            ))}
         </StyledDiv2>

         <br />
         <hr style={{ width: '60%', marginLeft: '12.5%' }} />
         <br />

         <Container>
            <StyledTabs>
               <StyledBoxTab onClick={() => setOpenPicker('from')}>
                  <span style={{ color: '#384255', fontSize: '13px' }}>
                     {fromDate ? fromDate.format('DD.MM.YYYY') : 'С'}
                  </span>
                  <img src={Icons.calendar} alt="calendar" />
               </StyledBoxTab>
               <StyledBoxTab onClick={() => setOpenPicker('to')}>
                  <span style={{ color: '#384255', fontSize: '13px' }}>
                     {toDate ? toDate.format('DD.MM.YYYY') : 'До'}
                  </span>
                  <img src={Icons.calendar} alt="calendar" />
               </StyledBoxTab>
            </StyledTabs>

            <br />
            {loading && <div>Загрузка...</div>}
            {error && (
               <Box
                  sx={{
                     color: 'red',
                     whiteSpace: 'pre-wrap',
                     fontWeight: 'bold',
                  }}
               >
                  Ошибка:{' '}
                  {typeof error === 'object'
                     ? JSON.stringify(error, null, 2)
                     : error}
               </Box>
            )}

            <UniversalTable
               variant="orders"
               data={filteredOrders.map((order) => ({
                  id: order.id,
                  fio: order.fullName,
                  number: order.number,
                  createdAt: order.createdAt,
                  count: order.count,
                  total: order.totalPrice,
                  delivery: order.pickup ? 'Самовывоз' : 'Доставка',
                  status: order.status,
                  onClick: () => handleOrderClick(order.id),
               }))}
            />

            {openPicker && (
               <Box sx={{ position: 'absolute', top: '45%', right: '48%' }}>
                  <DatePicker
                     date={openPicker === 'from' ? fromDate : toDate}
                     onChange={handleDateChange}
                  />
               </Box>
            )}
         </Container>
         <br />
      </Box>
   )
}

const StyledDiv1 = styled(Container)({ paddingTop: '40px' })
const StyledDiv2 = styled(Container)({
   display: 'flex',
   gap: '14px',
   flexWrap: 'wrap',
})
const StyledInput = styled(Input)({ width: '559px', height: '39px' })
const StyledBoxTab = styled(Box)({
   border: '1px solid #CDCDCD',
   borderRadius: '6px',
   width: '130px',
   height: '35px',
   display: 'flex',
   justifyContent: 'space-between',
   padding: '10px 20px',
   cursor: 'pointer',
})
const StyledTabs = styled(Box)({ display: 'flex', gap: '20px' })
