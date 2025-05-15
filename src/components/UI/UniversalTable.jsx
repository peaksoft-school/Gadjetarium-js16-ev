import React, { useMemo, useState } from 'react'
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
import Checkbox from './Checkbox'
import { Icons } from '../../assets/icons'

const UniversalTable = ({ variant, data = [] }) => {
   const [selected, setSelected] = useState([])

   const toggleCheckbox = (id) => {
      setSelected((prev) =>
         prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
      )
   }

   const columns = useMemo(() => {
      if (variant === 'orders') {
         return [
            {
               header: () => (
                  <StyledHeaderCell width="60px">ID</StyledHeaderCell>
               ),
               accessorKey: 'id',
               cell: ({ row }) => (
                  <StyledCell width="60px">
                     <CheckboxWrapper className="checkbox">
                        <Checkbox
                           checked={selected.includes(row.original.id)}
                           onChange={() => toggleCheckbox(row.original.id)}
                           size="small"
                        />
                     </CheckboxWrapper>
                     <IdText className="idText">{row.original.id}</IdText>
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
                     <DateText>{row.original.date}</DateText>
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
               cell: () => (
                  <StyledCell>
                     <StatusBox>
                        <StatusText>В обработке</StatusText>
                        <StatusIcon src={Icons.arrowDown} />
                     </StatusBox>
                  </StyledCell>
               ),
            },
            {
               header: () => <StyledHeaderCell>Действия</StyledHeaderCell>,
               accessorKey: 'actions',
               cell: () => (
                  <StyledCell>
                     <IconButton>
                        <img src={Icons.deleteb} alt="delete" />
                     </IconButton>
                  </StyledCell>
               ),
            },
         ]
      }

      return []
   }, [variant, selected])

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
                  <HoverableRow key={row.id}>
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

const StyledCell = styled(TableCell)(() => ({
   fontSize: 14,
   color: '#333',
   whiteSpace: 'nowrap',
   position: 'relative',
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
   '&:hover .checkbox': {
      visibility: 'visible',
   },
   '&:hover .idText': {
      visibility: 'hidden',
   },
}))

const CheckboxWrapper = styled(Box)(() => ({
   position: 'absolute',
   top: '50%',
   left: 10,
   transform: 'translateY(-50%)',
   visibility: 'hidden',
}))

const IdText = styled(Box)(() => ({
   visibility: 'visible',
}))

const NumberText = styled(Typography)(() => ({
   fontWeight: 500,
   color: '#2C68F5',
}))

const DateText = styled(Typography)(() => ({
   fontSize: 12,
   color: '#A1A1A1',
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
