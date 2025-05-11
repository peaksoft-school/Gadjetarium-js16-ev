import React, { useState } from 'react'
import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Typography,
   Box,
   IconButton,
   styled,
} from '@mui/material'
import Checkbox from './Checkbox'
import { Icons } from '../../assets/icons'

const UniversalTable = ({ variant, data = [] }) => {
   const [selected, setSelected] = useState([])

   const toggleCheckbox = (id) => {
      setSelected((prev) =>
         prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
      )
   }

   const isSelected = (id) => selected.includes(id)

   const renderHeader = () => {
      if (variant === 'orders') {
         return (
            <>
               <StyledHeaderCell width="60px">ID</StyledHeaderCell>
               <StyledHeaderCell>ФИО</StyledHeaderCell>
               <StyledHeaderCell>Номер/дата</StyledHeaderCell>
               <StyledHeaderCell>Кол-во</StyledHeaderCell>
               <StyledHeaderCell>Общая сумма</StyledHeaderCell>
               <StyledHeaderCell>Оформление заказа</StyledHeaderCell>
               <StyledHeaderCell>Статус</StyledHeaderCell>
               <StyledHeaderCell>Действия</StyledHeaderCell>
            </>
         )
      } else if (variant === 'products') {
         return (
            <>
               <StyledHeaderCell width="60px">ID</StyledHeaderCell>
               <StyledHeaderCell>Фото</StyledHeaderCell>
               <StyledHeaderCell>Наименование товара</StyledHeaderCell>
               <StyledHeaderCell>Цвет</StyledHeaderCell>
               <StyledHeaderCell>Кол-во SIM-карт</StyledHeaderCell>
               <StyledHeaderCell>ОЗУ</StyledHeaderCell>
               <StyledHeaderCell>ПЗУ</StyledHeaderCell>
               <StyledHeaderCell>Количество</StyledHeaderCell>
               <StyledHeaderCell>Цена</StyledHeaderCell>
            </>
         )
      } else if (variant === 'goods') {
         return (
            <>
               <StyledHeaderCell width="60px">ID</StyledHeaderCell>
               <StyledHeaderCell>Фото</StyledHeaderCell>
               <StyledHeaderCell>Артикул</StyledHeaderCell>
               <StyledHeaderCell>Наименование товара</StyledHeaderCell>
               <StyledHeaderCell>Дата создания</StyledHeaderCell>
               <StyledHeaderCell>Кол-во</StyledHeaderCell>
               <StyledHeaderCell>Цена товара</StyledHeaderCell>
               <StyledHeaderCell>Текущая цена</StyledHeaderCell>
               <StyledHeaderCell>Действия</StyledHeaderCell>
            </>
         )
      }
   }

   const renderRow = (item) => {
      const selectedRow = isSelected(item.id)

      if (variant === 'orders') {
         return (
            <>
               <StyledCell width="60px">
                  <CheckboxWrapper className="checkbox">
                     <Checkbox
                        checked={selectedRow}
                        onChange={() => toggleCheckbox(item.id)}
                        size="small"
                     />
                  </CheckboxWrapper>
                  <Box className="idText">{item.id}</Box>
               </StyledCell>
               <StyledCell>{item.fio}</StyledCell>
               <StyledCell>
                  <Typography fontWeight={500} color="#2C68F5">
                     {item.number}
                  </Typography>
                  <Typography fontSize={12} color="#A1A1A1">
                     {item.date}
                  </Typography>
               </StyledCell>
               <StyledCell>{item.count} шт.</StyledCell>
               <StyledCell>{item.total}c</StyledCell>
               <StyledCell>{item.delivery}</StyledCell>
               <StyledCell>
                  <Box display="flex" alignItems="center" gap="6px">
                     <Typography color="#FFA500" fontWeight={500}>
                        В обработке
                     </Typography>
                     <img src={Icons.arrowDown} width={16} />
                  </Box>
               </StyledCell>
               <StyledCell>
                  <IconButton>
                     <img src={Icons.deleteb} alt="delete" />
                  </IconButton>
               </StyledCell>
            </>
         )
      } else if (variant === 'products') {
         return (
            <>
               <StyledCell width="60px" sx={{ position: 'relative' }}>
                  <CheckboxWrapper className="checkbox">
                     <Checkbox
                        checked={selectedRow}
                        onChange={() => toggleCheckbox(item.id)}
                        size="small"
                     />
                  </CheckboxWrapper>
                  <Box className="idText">{item.id}</Box>
               </StyledCell>
               <StyledCell>
                  <img src={item.photo} alt="product" width={40} />
               </StyledCell>
               <StyledCell>
                  <Typography noWrap>{item.name}</Typography>
               </StyledCell>
               <StyledCell>{item.color}</StyledCell>
               <StyledCell>{item.sim}</StyledCell>
               <StyledCell>{item.ram} ГБ</StyledCell>
               <StyledCell>{item.rom} ГБ</StyledCell>
               <StyledCell>{item.quantity}</StyledCell>
               <StyledCell>
                  <Typography color="primary">{item.price}</Typography>
               </StyledCell>
            </>
         )
      } else if (variant === 'goods') {
         return (
            <>
               <StyledCell width="60px">
                  <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                  >
                     {selectedRow ? (
                        <Checkbox
                           checked
                           onChange={() => toggleCheckbox(item.id)}
                           size="small"
                        />
                     ) : (
                        <Typography onClick={() => toggleCheckbox(item.id)}>
                           {item.id}
                        </Typography>
                     )}
                  </Box>
               </StyledCell>
               <StyledCell>
                  <img src={item.photo} alt="product" width="40" />
               </StyledCell>
               <StyledCell>{item.article}</StyledCell>
               <StyledCell>
                  <Typography fontWeight="bold">
                     Кол-во товара {item.quantity}шт.
                  </Typography>
                  <Typography fontSize={12} color="gray">
                     {item.name}
                  </Typography>
               </StyledCell>
               <StyledCell>
                  {item.createdAt}
                  <br />
                  <Typography fontSize={12} color="gray">
                     {item.createdTime}
                  </Typography>
               </StyledCell>
               <StyledCell>{item.quantity}</StyledCell>
               <StyledCell>
                  <Typography color="primary">{item.price}</Typography>
                  <Typography fontSize={12} color="error">
                     {item.discount}
                  </Typography>
               </StyledCell>
               <StyledCell>
                  <Typography color="primary">{item.currentPrice}</Typography>
               </StyledCell>
               <StyledCell>
                  <IconButton color="primary" size="small">
                     <img src={Icons.edit} alt="edit" />
                  </IconButton>
                  <IconButton color="error" size="small">
                     <img src={Icons.deleteb} alt="delete" />
                  </IconButton>
               </StyledCell>
            </>
         )
      }
   }

   return (
      <StyledTableContainer component={Paper}>
         <StyledTable>
            <TableHead>
               <TableRow>{renderHeader()}</TableRow>
            </TableHead>
            <TableBody>
               {data.map((item) => (
                  <HoverableRow key={item.id}>{renderRow(item)}</HoverableRow>
               ))}
            </TableBody>
         </StyledTable>
      </StyledTableContainer>
   )
}

export default UniversalTable

const StyledTableContainer = styled(TableContainer)(() => ({
   borderRadius: 12,
   border: '1px solid #e0e0e0',
   backgroundColor: '#fff',
   padding: '16px',
   boxShadow: 'none',
}))

const StyledTable = styled(Table)(() => ({
   minWidth: 1200,
   borderCollapse: 'separate',
   borderSpacing: '0 12px',
}))

const StyledHeaderCell = styled(TableCell)(() => ({
   backgroundColor: '#384255E5',
   color: '#fff',
   fontWeight: 600,
   fontSize: 14,
   border: 'none',
   whiteSpace: 'nowrap',
   padding: '12px 16px',
   borderTopLeftRadius: 0,
   borderTopRightRadius: 0,
}))

const HoverableRow = styled(TableRow)(() => ({
   backgroundColor: '#fff',
   borderRadius: 12,
   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
   '&:hover': {
      backgroundColor: '#F5F5F5',
   },
   '& td': {
      border: 'none',
   },
   '&:hover .checkbox': {
      visibility: 'visible',
   },
   '&:hover .idText': {
      visibility: 'hidden',
   },
}))

const StyledCell = styled(TableCell)(() => ({
   fontSize: 14,
   color: '#333',
   whiteSpace: 'nowrap',
   position: 'relative',
   padding: '12px 16px',
}))

const CheckboxWrapper = styled(Box)(() => ({
   position: 'absolute',
   top: '50%',
   left: 10,
   transform: 'translateY(-50%)',
   visibility: 'hidden',
}))

const OrderLink = styled('a')(() => ({
   display: 'block',
   fontWeight: 500,
   color: '#2C68F5',
   textDecoration: 'none',
}))

const OrderTime = styled(Typography)(() => ({
   color: '#A1A1A1',
   fontSize: 12,
}))

const StatusBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
}))

const StatusText = styled(Typography)(() => ({
   color: '#FFA500',
   fontWeight: 500,
}))

const StatusIcon = styled('img')(() => ({
   width: 16,
   height: 16,
}))
