import { Box, styled, Divider } from '@mui/material'
import AdminHeader from '../layout/admin/AdminHeader'
import Toolbar from './Toolbar'
import Infographics from './Infographics'
import ProductTable from './UI/ProductTable'
import DatePicker from './UI/DatePicker'
import { useState, useEffect } from 'react'
import { Icons } from '../assets/icons'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/products/productThunk'

const Wrapper = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   marginBottom: '24px',
   padding: '0 24px',
})

const FiltersBlock = styled(Box)({
   display: 'flex',
   gap: '12px',
   flexWrap: 'wrap',
   alignItems: 'center',
})

const StyledBoxTab = styled(Box)({
   border: '1px solid #CDCDCD',
   borderRadius: '6px',
   width: '130px',
   height: '35px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '0 12px',
   cursor: 'pointer',
})

const StyledTabs = styled(Box)({
   display: 'flex',
   gap: '20px',
})

const StyledBoxDate = styled(Box)({
   position: 'absolute',
   bottom: '4%',
   left: '18%',
})

const salesData = {
   purchasedAmount: '7 556',
   orderedAmount: '34 562',
   purchasedCount: '12',
   orderedCount: '56',
   deliveredAmount: '120 000',
   previousDeliveredAmount: '100 500',
}

const Products = () => {
   const dispatch = useDispatch()
   const { items, loading, error } = useSelector((state) => state.product)

   const [openPicker, setOpenPicker] = useState(null)
   const [fromDate, setFromDate] = useState(null)
   const [toDate, setToDate] = useState(null)

   useEffect(() => {
      dispatch(fetchProducts())
   }, [dispatch])

   const handleDateChange = (date) => {
      if (openPicker === 'from') setFromDate(date)
      if (openPicker === 'to') setToDate(date)
      setOpenPicker(null)
   }

   const productList = items?.data || []

   return (
      <>
         <AdminHeader />
         <Wrapper>
            <Toolbar />
            <Divider sx={{ width: '100%', mt: 2 }} />

            <FiltersBlock>
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
            </FiltersBlock>

            {loading && <p>Загрузка...</p>}

            {error && (
               <p style={{ color: 'red' }}>
                  Ошибка: {typeof error === 'string'
                     ? error
                     : error.error || 'Произошла ошибка при загрузке'}
               </p>
            )}

            {!loading && !error && <ProductTable data={productList} />}

            <Infographics data={salesData} />
         </Wrapper>

         {openPicker && (
            <StyledBoxDate>
               <DatePicker
                  date={openPicker === 'from' ? fromDate : toDate}
                  onChange={handleDateChange}
               />
            </StyledBoxDate>
         )}
      </>
   )
}

export default Products
