import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../pages/orderSlice'
import { Icons } from '../assets/icons'
import Chip from '../components/UI/Chip'
import Input from '../components/UI/Input'
import DatePicker from '../components/UI/DatePicker'
import InputAdornment from '@mui/material/InputAdornment'
import { Container, styled, Box } from '@mui/material'
import UniversalTable from '../components/UI/UniversalTable'
import { useNavigate } from 'react-router'
import Infographic from '../components/Infographics'

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
      { value: 'WAITING', label: 'В ожидании' },
      { value: 'READY_FOR_PICKUP', label: 'В обработке ' },
      { value: 'COURIER_ON_THE_WAY', label: 'Курьер в пути ' },
      { value: 'DELIVERED', label: 'Доставлено' },
      { value: 'CANCELLED', label: 'Отменены' },
   ]

   const handleOrderClick = (orderId) => {
      navigate(`/admin/orders/${orderId}`)
   }

   return (
      <Wrapper>
         <MainContent>
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
                              style={{
                                 width: 20,
                                 height: 20,
                                 cursor: 'pointer',
                              }}
                           />
                        </InputAdornment>
                     ),
                  }}
               />
            </StyledDiv1>

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

            {/* <br /> */}

            <StyledDiv2>
               {statusCounts.map(({ status, count }) => (
                  <Chip
                     key={status}
                     label={`${status} × ${count}`}
                     onDelete={() => handleStatusDelete(status)}
                  />
               ))}
            </StyledDiv2>

            <div style={{ marginLeft: '22px' }}>
               <hr style={{ width: '100%', marginBottom: '30px' }} />

               <StyledTabs marginBottom={5}>
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
            </div>

            {openPicker && (
               <Box sx={{ position: 'absolute', top: '45%', right: '48%' }}>
                  <DatePicker
                     date={openPicker === 'from' ? fromDate : toDate}
                     onChange={handleDateChange}
                  />
               </Box>
            )}
         </MainContent>

         <Sidebar>
            <Infographic />
         </Sidebar>
      </Wrapper>
   )
}

const Wrapper = styled('div')({
   display: 'flex',
   flexDirection: 'row',
   marginTop: '15px',
   alignItems: 'flex-start',
   padding: '40px 0px 40px 40px ',
   gap: '40px',
})

const MainContent = styled('div')({
   flex: 1,
   maxWidth: 'calc(95% - 360px)',
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
})

const Sidebar = styled('div')({
   width: '320px',
   minHeight: '100%',
   marginTop: '-70px',
})

const StyledDiv1 = styled(Container)({ paddingTop: '0px' })
const StyledDiv2 = styled(Container)({
   display: 'flex',
   gap: '14px',
   flexWrap: 'wrap',
   paddingLeft: 0,
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
