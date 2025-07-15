import { Box, styled, Divider } from '@mui/material'
import Toolbar from './Toolbar'
import Infographics from './Infographics'
import ProductTable from './UI/ProductTable'
import DatePicker from './UI/DatePicker'
import { useState, useEffect } from 'react'
import { Icons } from '../assets/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/products/productThunk'
import Modal from './UI/Modal'
import BannerUploadModal from './BannerUploadModal'
import DiscountModal from './DiscountModal'

const Products = () => {
   const dispatch = useDispatch()
   const { items, total, loading, error } = useSelector(
      (state) => state.product
   )

   const [openPicker, setOpenPicker] = useState(null)
   const [fromDate, setFromDate] = useState(null)
   const [toDate, setToDate] = useState(null)
   const [search, setSearch] = useState('')
   const [action, setAction] = useState('all')
   const [openBannerModal, setOpenBannerModal] = useState(false)
   const [openDiscountModal, setOpenDiscountModal] = useState(false)

   const [selectedIds, setSelectedIds] = useState([])

   const handleCleanDatePicker = () => {
      setFromDate(null)
      setToDate(null)
   }

   useEffect(() => {
      dispatch(
         fetchProducts({
            name: search,
            action,
            pageSize: 100,
            startDate: fromDate ? fromDate.format('YYYY-MM-DD') : undefined,
            endDate: toDate ? toDate.format('YYYY-MM-DD') : undefined,
         })
      )
   }, [dispatch, search, action, fromDate, toDate])

   const handleDateChange = (date) => {
      if (openPicker === 'from') setFromDate(date)
      if (openPicker === 'to') setToDate(date)
      setOpenPicker(null)
   }

   const handleUploadBanner = (files) => {
      console.log('Загружаем баннеры:', files)
      setOpenBannerModal(false)
   }

   const handleDiscountSubmit = (discountData) => {
      console.log('Скидка применена на товары:', discountData)
      setOpenDiscountModal(false)
      setSelectedIds([])
   }

   return (
      <>
         <Wrapper>
            <TableBlock>
               <Toolbar
                  onSearch={(val) => setSearch(val)}
                  onActionChange={(val) => setAction(val)}
                  currentAction={action}
                  onUploadBanner={() => setOpenBannerModal(true)}
                  onOpenDiscount={() => setOpenDiscountModal(true)}
               />
               <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
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
                  <img src={Icons.cancel} onClick={handleCleanDatePicker} />
               </FiltersBlock>
               {loading && <p>Загрузка...</p>}
               {error && (
                  <p style={{ color: 'red' }}>
                     Ошибка:{' '}
                     {typeof error === 'string'
                        ? error
                        : error.error || 'Произошла ошибка при загрузке'}
                  </p>
               )}
               {!loading && !error && (
                  <ProductTable
                     data={items || []}
                     totalCount={total}
                     selectedIds={selectedIds}
                     setSelectedIds={setSelectedIds}
                  />
               )}
            </TableBlock>
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
         <Modal
            open={openBannerModal}
            onClose={() => setOpenBannerModal(false)}
         >
            <BannerUploadModal
               onClose={() => setOpenBannerModal(false)}
               onUpload={handleUploadBanner}
            />
         </Modal>
         <Modal
            open={openDiscountModal}
            onClose={() => setOpenDiscountModal(false)}
         >
            <DiscountModal
               selectedIds={selectedIds}
               onClose={() => setOpenDiscountModal(false)}
               onSubmit={handleDiscountSubmit}
            />
         </Modal>
      </>
   )
}

export default Products

const Wrapper = styled(Box)({
   display: 'flex',
   gap: '16px',
   marginBottom: '24px',
   width: '100%',
   position: 'relative',
   padding: '0 24px',
})

const TableBlock = styled('div')({
   flex: '1 1 0',
   minWidth: 0,
   maxWidth: 1100,
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
