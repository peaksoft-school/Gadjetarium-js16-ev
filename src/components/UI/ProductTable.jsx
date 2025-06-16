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
} from '@mui/material'
import { Icons } from '../../assets/icons'
import Checkbox from './Checkbox'

const ProductTable = ({ data }) => {
   const [hoveredRow, setHoveredRow] = useState(null)
   const [selectedIds, setSelectedIds] = useState([])

   const toggleCheckbox = (id) => {
      setSelectedIds((prev) =>
         prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
   }

   return (
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
               {data.map((item) => (
                  <StyledBodyRow
                     key={item.id}
                     onMouseEnter={() => setHoveredRow(item.id)}
                     onMouseLeave={() => setHoveredRow(null)}
                  >
                     <StyledBodyCell>
                        {hoveredRow === item.id ? (
                           <Checkbox
                              style={{ width: '5px' }}
                              checked={selectedIds.includes(item.id)}
                              onChange={() => toggleCheckbox(item.id)}
                           />
                        ) : (
                           item.id
                        )}
                     </StyledBodyCell>
                     <StyledBodyCell>
                        <img
                           src={item.imageUrl}
                           alt="Фото"
                           style={{ width: 40, height: 40, borderRadius: 6 }}
                        />
                     </StyledBodyCell>
                     <StyledBodyCell>{item.article}</StyledBodyCell>
                     <StyledBodyCell>
                        <Box>
                           {item.name}
                           <div
                              style={{
                                 fontSize: 12,
                                 color: '#91969E',
                                 lineHeight: 1.3,
                              }}
                           >
                              {item.model}
                           </div>
                        </Box>
                     </StyledBodyCell>
                     <StyledBodyCell>
                        {item.date}
                        <div style={{ fontSize: 12, color: '#91969E' }}>
                           {item.time}
                        </div>
                     </StyledBodyCell>
                     <StyledBodyCell>{item.quantity}</StyledBodyCell>
                     <StyledBodyCell>
                        <div style={{ color: '#F10000', fontWeight: 500 }}>
                           {item.price}c
                        </div>
                        <div style={{ fontSize: 12, color: '#F10000' }}>
                           {item.discount}%
                        </div>
                     </StyledBodyCell>
                     <StyledBodyCell>
                        <span style={{ color: '#2C68F5', fontWeight: 500 }}>
                           {item.currentPrice}c
                        </span>
                     </StyledBodyCell>
                     <StyledBodyCell style={{ display: 'flex', gap: 10 }}>
                        <img
                           src={Icons.edit}
                           alt="edit"
                           style={{ width: 20, height: 20, cursor: 'pointer' }}
                        />
                        <img
                           src={Icons.deleteb}
                           alt="delete"
                           style={{ width: 20, height: 20, cursor: 'pointer' }}
                        />
                     </StyledBodyCell>
                  </StyledBodyRow>
               ))}
            </TableBody>
         </StyledTable>
      </TableWrapper>
   )
}

export default ProductTable

// ---------- Стили ----------

const TableWrapper = styled(TableContainer)(() => ({
   borderRadius: 8,
   overflow: 'hidden',
   border: '1px solid #E0E0E0',
}))

const StyledTable = styled(Table)(() => ({
   minWidth: 1000,
   borderCollapse: 'separate',
   borderSpacing: '0 8px',
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
   borderRadius: 8,
   boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
   transition: 'background-color 0.3s ease',
   '&:hover': {
      backgroundColor: '#F4F6F9',
   },
   '& td:first-of-type': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
   },
   '& td:last-of-type': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
   },
}))

const StyledBodyCell = styled(TableCell)(() => ({
   fontSize: 16,
   color: '#1A1A1A',
   padding: '12px 16px',
   border: 'none',
   whiteSpace: 'nowrap',
}))
