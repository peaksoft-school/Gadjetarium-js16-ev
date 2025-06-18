import React, { useMemo } from 'react'
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
import {
   useReactTable,
   getCoreRowModel,
   flexRender,
} from '@tanstack/react-table'
import { Icons } from '../../assets/icons'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { updateOrder, deleteOrder } from '../../pages/orderSlice'
import { useNavigate } from 'react-router-dom'
const UniversalTable = ({ variant, data = [] }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const columns = useMemo(() => {
      if (variant === 'orders') {
         return [
            {
               header: () => (
                  <StyledHeaderCell width="60px">ID</StyledHeaderCell>
               ),
               accessorKey: 'id',
               cell: ({ getValue }) => (
                  <StyledCell width="60px">
                     <IdText>{getValue()}</IdText>
                  </StyledCell>
               ),
            },
            {
               header: () => <StyledHeaderCell>ФИО</StyledHeaderCell>,
               accessorKey: 'fio',
               cell: ({ getValue }) => <StyledCell>{getValue()}</StyledCell>,
            },
            {
               header: () => <StyledHeaderCell>Номер/дата</StyledHeaderCell>,
               accessorKey: 'number',
               cell: ({ row }) => (
                  <StyledCell>
                     <NumberText>{row.original.number}</NumberText>
                     <DateText>
                        {dayjs(row.original.createdAt).format('DD.MM.YYYY')}
                     </DateText>
                  </StyledCell>
               ),
            },
            {
               header: () => <StyledHeaderCell>Кол-во</StyledHeaderCell>,
               accessorKey: 'count',
               cell: ({ getValue }) => (
                  <StyledCell>{getValue()} шт.</StyledCell>
               ),
            },
            {
               header: () => <StyledHeaderCell>Общая сумма</StyledHeaderCell>,
               accessorKey: 'total',
               cell: ({ getValue }) => <StyledCell>{getValue()}c</StyledCell>,
            },
            {
               header: () => (
                  <StyledHeaderCell>Оформление заказа</StyledHeaderCell>
               ),
               accessorKey: 'delivery',
               cell: ({ getValue }) => <StyledCell>{getValue()}</StyledCell>,
            },
            {
               header: () => <StyledHeaderCell>Статус</StyledHeaderCell>,
               accessorKey: 'status',
               cell: ({ row }) => {
                  const order = row.original

                  const handleChange = (e) => {
                     e.stopPropagation()
                     const newStatus = e.target.value
                     if (newStatus !== order.status) {
                        dispatch(
                           updateOrder({ id: order.id, status: newStatus })
                        )
                     }
                  }

                  return (
                     <StyledCell>
                        <SelectWrapper onClick={(e) => e.stopPropagation()}>
                           <SelectStyled
                              value={order.status}
                              onChange={handleChange}
                           >
                              <option value="WAITING">WAITING</option>
                              <option value="READY_FOR_PICKUP">
                                 READY_FOR_PICKUP
                              </option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="GET">GET</option>
                              <option value="CANCELLED">CANCELLED</option>
                              <option value="COURIER_ON_THE_WAY">
                                 COURIER_ON_THE_WAY
                              </option>
                           </SelectStyled>
                        </SelectWrapper>
                     </StyledCell>
                  )
               },
            },
            {
               header: () => <StyledHeaderCell>Действия</StyledHeaderCell>,
               accessorKey: 'actions',
               cell: ({ row }) => (
                  <StyledCell onClick={(e) => e.stopPropagation()}>
                     <IconButton
                        onClick={() => {
                           console.log('Удаляем заказ с ID:', row.original.id)
                           dispatch(deleteOrder(row.original.id))
                        }}
                     >
                        <img src={Icons.deleteb} alt="delete" />
                     </IconButton>
                  </StyledCell>
               ),
            },
         ]
      }

      return []
   }, [variant, dispatch])

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   })

   return (
      <StyledTableContainer component={Paper}>
         <StyledTable>
            <TableHead>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <React.Fragment key={header.id}>
                           {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                           )}
                        </React.Fragment>
                     ))}
                  </TableRow>
               ))}
            </TableHead>
            <TableBody>
               {table.getRowModel().rows.map((row) => (
                  <HoverableRow
                     key={row.id}
                     onClick={() => navigate(`/orders/${row.original.id}`)}
                  >
                     {row.getVisibleCells().map((cell) => (
                        <React.Fragment key={cell.id}>
                           {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                           )}
                        </React.Fragment>
                     ))}
                  </HoverableRow>
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
   width: '1240px',
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
}))

const StyledCell = styled(TableCell)(() => ({
   fontSize: 14,
   color: '#333',
   whiteSpace: 'nowrap',
   padding: '12px 16px',
   border: 'none',
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
}))

const IdText = styled(Box)(() => ({
   fontWeight: 500,
}))

const NumberText = styled(Typography)(() => ({
   fontWeight: 500,
   color: '#2C68F5',
}))

const DateText = styled(Typography)(() => ({
   fontSize: 12,
   color: '#A1A1A1',
}))

const SelectStyled = styled('select')(() => ({
   borderRadius: '8px',
   border: 'none',
   backgroundColor: '#fff',
   fontSize: '10px',
   color: '#F99808',
   outline: 'none',
   width: '140px',
   '&:hover': {
      backgroundColor: '#F5F5F5',
   },
}))

const SelectWrapper = styled(Box)(() => ({
   position: 'relative',
   display: 'flex',
   justifyContent: 'start',
}))

/////////////////////////////////////////////////////////
