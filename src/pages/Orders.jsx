import { useState } from 'react'
import { Icons } from '../assets/icons'
import Chip from '../components/UI/Chip'
import Input from '../components/UI/Input'
import AdminHeader from '../layout/admin/AdminHeader'
import DatePicker from '../components/UI/DatePicker'
import InputAdornment from '@mui/material/InputAdornment'

import { Container, styled, Box } from '@mui/material'

export default function Orders() {
   const [fromDate, setFromDate] = useState(null)
   const [toDate, setToDate] = useState(null)
   const [openPicker, setOpenPicker] = useState(null)

   const handleDateChange = (date) => {
      if (openPicker === 'from') setFromDate(date)
      if (openPicker === 'to') setToDate(date)
      setOpenPicker(null)
   }

   return (
      <Box>
         <AdminHeader />
         <StyledDiv1>
            <StyledInput
               placeholder="Поиск по артикулу или ..."
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
            <Chip label="В ожидании" />
            <Chip label="В обработке" />
            <Chip label="Курьер в пути" />
            <Chip label="Доставлено" />
            <Chip label="Отменены" />
         </StyledDiv2>
         <br />
         <hr
            style={{
               width: '60%',
               marginLeft: '12.5%',
            }}
         />
         <br />
         <Container>
            <StyledTabs>
               <StyledBoxTab onClick={() => setOpenPicker('from')}>
                  <span
                     style={{
                        color: '#384255',
                        fontWeight: '400',
                        fontSize: '13px',
                        width: '10px',
                        height: '10px',
                     }}
                  >
                     {fromDate ? fromDate.format('DD.MM.YYYY') : 'С'}
                  </span>
                  <img src={Icons.calendar} alt="calendar" />
               </StyledBoxTab>
               <StyledBoxTab onClick={() => setOpenPicker('to')}>
                  <span
                     style={{
                        color: '#384255',
                        fontWeight: '400',
                        fontSize: '13px',
                        width: '10px',
                        height: '10px',
                     }}
                  >
                     {toDate ? toDate.format('DD.MM.YYYY') : 'До'}
                  </span>
                  <img src={Icons.calendar} alt="calendar" />
               </StyledBoxTab>
            </StyledTabs>

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
const StyledDiv1 = styled(Container)({
   paddingTop: '40px',
})

const StyledDiv2 = styled(Container)({
   display: 'flex',
   justifyContent: 'start',
   gap: '14px',
})

const StyledInput = styled(Input)({
   width: '559px',
   height: '39px',
})

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

const StyledTabs = styled(Box)({
   display: 'flex',
   gap: '20px',
})
