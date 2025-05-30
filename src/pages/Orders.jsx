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

export default function Orders() {
   const [searchValue, setSearchValue] = useState('')
   const [fromDate, setFromDate] = useState(null)
   const [toDate, setToDate] = useState(null)
   const [selectedStatus, setSelectedStatus] = useState('')
   const [openPicker, setOpenPicker] = useState(null)

   const dispatch = useDispatch()
   const { data: orders, loading, error } = useSelector((state) => state.orders)

   const loadOrders = () => {
      const params = {}

      if (searchValue.trim()) params.search = searchValue.trim()
      if (fromDate) params.from = fromDate.format('YYYY-MM-DD')
      if (toDate) params.to = toDate.format('YYYY-MM-DD')
      if (selectedStatus) params.status = selectedStatus

      dispatch(fetchOrders(params))
   }

   useEffect(() => {
      loadOrders()
   }, [])

   useEffect(() => {
      loadOrders()
   }, [searchValue, fromDate, toDate, selectedStatus])

   const handleDateChange = (date) => {
      if (openPicker === 'from') setFromDate(date)
      if (openPicker === 'to') setToDate(date)
      setOpenPicker(null)
   }

   const handleSearchChange = (event) => {
      setSearchValue(event.target.value)
   }

   const handleStatusClick = (status) => {
      setSelectedStatus(selectedStatus === status ? '' : status)
   }

   const statusOptions = [
      { label: 'В ожидании', value: 'WAITING' },
      { label: 'В обработке', value: 'READY_FOR_PICKUP' },
      { label: 'Курьер в пути', value: 'COURIER_ON_THE_WAY' },
      { label: 'Доставлено', value: 'DELIVERED' },
      { label: 'Отменены', value: 'CANCELLED' },
   ]

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
         <br />
         <StyledDiv2>
            {statusOptions.map((status) => (
               <Chip
                  key={status.value}
                  label={status.label}
                  onClick={() => handleStatusClick(status.value)}
                  variant={
                     selectedStatus === status.value ? 'filled' : 'outlined'
                  }
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
            {error && <div>Ошибка: {error}</div>}

            <UniversalTable variant="orders" data={orders} />

            {openPicker && (
               <Box>
                  <DatePicker
                     date={openPicker === 'from' ? fromDate : toDate}
                     onChange={handleDateChange}
                  />
               </Box>
            )}
         </Container>
      </Box>
   )
}

const StyledDiv1 = styled(Container)({ paddingTop: '40px' })
const StyledDiv2 = styled(Container)({ display: 'flex', gap: '14px' })
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
