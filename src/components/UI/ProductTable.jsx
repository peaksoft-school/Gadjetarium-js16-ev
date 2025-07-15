import { useState } from 'react'
import {
   Box,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   styled,
   Typography,
   Pagination,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Icons } from '../../assets/icons'
import Checkbox from './Checkbox'
import { deleteProduct } from '../../store/products/productThunk'
import Modal from '../UI/Modal'
import Button from '../UI/Button'

const ProductTable = ({ data, selectedIds, setSelectedIds }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [hoveredRow, setHoveredRow] = useState(null)
   const [page, setPage] = useState(1)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [deleteId, setDeleteId] = useState(null)
   const rowsPerPage = 7

   const toggleCheckbox = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id)
            ? prev.filter((itemId) => itemId !== id)
            : [...prev, id]
      )
   }

   const openDeleteModal = (id) => {
      if (!selectedIds.includes(id)) return
      setDeleteId(id)
      setIsModalOpen(true)
   }

   const confirmDelete = () => {
      dispatch(deleteProduct(deleteId))
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== deleteId))
      setIsModalOpen(false)
      setDeleteId(null)
   }

   const handleRowClick = (id) => {
      navigate(`/admin/products/${id}`)
      console.log('ss')
   }

   const paginatedData = Array.isArray(data)
      ? data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
      : []

   return (
      <Box>
         <StyledInfoText>Найдено {data.length} товаров</StyledInfoText>

         <TableWrapper component={Paper}>
            <StyledTable>
               <TableHead>
                  <StyledHeadRow>
                     <StyledHeadCell>ID</StyledHeadCell>
                     <StyledHeadCell>Фото</StyledHeadCell>
                     <StyledHeadCell>Артикул</StyledHeadCell>
                     <StyledHeadCell>Наименование товара</StyledHeadCell>
                     <StyledHeadCell>Дата создания</StyledHeadCell>
                     <StyledHeadCell>Кол-во</StyledHeadCell>
                     <StyledHeadCell>Цена товара</StyledHeadCell>
                     <StyledHeadCell>Текущая цена</StyledHeadCell>
                     <StyledHeadCell>Действия</StyledHeadCell>
                  </StyledHeadRow>
               </TableHead>
               <TableBody>
                  {paginatedData.map((item, index) => {
                     const isSelected = selectedIds.includes(item.id)
                     return (
                        <StyledBodyRow
                           key={item.id}
                           onMouseEnter={() => setHoveredRow(item.id)}
                           onMouseLeave={() => setHoveredRow(null)}
                           className="clickable-row"
                        >
                           <StyledBodyCell>
                              <FixedWidthBox>
                                 {hoveredRow === item.id ? (
                                    <Checkbox
                                       checked={isSelected}
                                       onChange={() => toggleCheckbox(item.id)}
                                    />
                                 ) : (
                                    <span>
                                       {(page - 1) * rowsPerPage + index + 1}
                                    </span>
                                 )}
                              </FixedWidthBox>
                           </StyledBodyCell>

                           <StyledBodyCell>
                              {item.imageUrl ? (
                                 <ProductImage src={item.imageUrl} alt="Фото" />
                              ) : (
                                 <ImagePlaceholder />
                              )}
                           </StyledBodyCell>

                           <StyledBodyCell>{item.article}</StyledBodyCell>

                           <StyledBodyCell>
                              <Box>
                                 Кол-во товара {item.quantity}шт.
                                 <ProductNameText
                                    onClick={() => handleRowClick(item.id)}
                                 >
                                    {item.name}
                                 </ProductNameText>
                              </Box>
                           </StyledBodyCell>

                           <StyledBodyCell>
                              {item.date}
                              <SubText>{item.time || ''}</SubText>
                           </StyledBodyCell>

                           <StyledBodyCell>{item.quantity}</StyledBodyCell>

                           <StyledBodyCell>
                              <PriceText>{item.price}c</PriceText>
                              <DiscountText>{item.discountPrice}%</DiscountText>
                           </StyledBodyCell>

                           <StyledBodyCell>
                              <PriceText>
                                 {item.totalPrice || item.currentPrice}c
                              </PriceText>
                           </StyledBodyCell>

                           <StyledBodyCell>
                              <ActionWrapper>
                                 <ActionIcon
                                    src={Icons.edit}
                                    alt="edit"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                    }}
                                 />
                                 <StyledDeleteIcon
                                    src={Icons.deleteb}
                                    alt="delete"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       openDeleteModal(item.id)
                                    }}
                                    selected={isSelected}
                                 />
                              </ActionWrapper>
                           </StyledBodyCell>
                        </StyledBodyRow>
                     )
                  })}
               </TableBody>
            </StyledTable>
         </TableWrapper>

         {data.length > rowsPerPage && (
            <PaginationWrapper>
               <Pagination
                  count={Math.ceil(data.length / rowsPerPage)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
               />
            </PaginationWrapper>
         )}

         <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalContent>
               <ModalText>Вы уверены, что хотите удалить этот товар?</ModalText>
               <ModalActions>
                  <Button
                     variant="outlined"
                     onClick={() => setIsModalOpen(false)}
                  >
                     Отмена
                  </Button>
                  <Button variant="contained" onClick={confirmDelete}>
                     Удалить
                  </Button>
               </ModalActions>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default ProductTable

// Styled components
const StyledInfoText = styled(Typography)(() => ({
   color: '#384255',
   marginBottom: 16,
   marginTop: 56,
   textAlign: 'left',
}))

const PaginationWrapper = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   marginTop: 16,
}))

const ModalContent = styled(Box)(() => ({
   padding: 20,
   backgroundColor: '#fff',
   textAlign: 'center',
}))

const ModalText = styled(Typography)(() => ({
   marginBottom: 16,
   fontSize: 18,
}))

const ModalActions = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: 16,
}))

const StyledDeleteIcon = styled('img')(({ selected }) => ({
   width: 20,
   height: 20,
   cursor: 'pointer',
   opacity: selected ? 1 : 0.3,
   pointerEvents: selected ? 'auto' : 'none',
}))

const TableWrapper = styled(TableContainer)(() => ({
   borderRadius: 12,
   overflow: 'hidden',
   border: 'none',
}))

const StyledTable = styled(Table)(() => ({
   minWidth: 1000,
   borderCollapse: 'separate',
   borderSpacing: '0 12px',
}))

const StyledHeadRow = styled(TableRow)(() => ({
   background: '#384255',
}))

const StyledHeadCell = styled(TableCell)(() => ({
   color: '#FFFFFF',
   fontWeight: 500,
   fontSize: 14,
   padding: '12px 16px',
   whiteSpace: 'nowrap',
   borderBottom: 'none',
}))

const StyledBodyRow = styled(TableRow)(() => ({
   backgroundColor: '#FDFDFD',
   borderRadius: 12,
   boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
   transition: 'background-color 0.3s ease',
   cursor: 'pointer',
   '&:hover': {
      backgroundColor: '#F4F6F9',
   },
   '& td:first-of-type': {
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
   },
   '& td:last-of-type': {
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
   },
}))

const StyledBodyCell = styled(TableCell)(() => ({
   fontSize: 16,
   color: '#1A1A1A',
   padding: '12px 16px',
   border: 'none',
   whiteSpace: 'nowrap',
}))

const FixedWidthBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   width: 24,
}))

const ProductImage = styled('img')(() => ({
   width: 40,
   height: 40,
   borderRadius: 6,
}))

const ImagePlaceholder = styled('div')(() => ({
   width: 40,
   height: 40,
   borderRadius: 6,
   backgroundColor: '#E0E0E0',
}))

const ProductNameText = styled(Typography)(() => ({
   fontSize: 12,
   color: '#91969E',
   lineHeight: 1.3,
}))

const SubText = styled('div')(() => ({
   fontSize: 12,
   color: '#91969E',
}))

const PriceText = styled('div')(() => ({
   color: '#2C68F5',
   fontWeight: 500,
}))

const DiscountText = styled('div')(() => ({
   fontSize: 12,
   color: '#F10000',
}))

const ActionWrapper = styled(Box)(() => ({
   display: 'flex',
   gap: 10,
}))

const ActionIcon = styled('img')(() => ({
   width: 20,
   height: 20,
   cursor: 'pointer',
}))
