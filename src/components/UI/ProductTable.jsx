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

const ProductTable = ({ data = [] }) => {
   const [selected, setSelected] = useState([])

   const toggleCheckbox = (id) => {
      setSelected((prev) =>
         prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
      )
   }

   const columns = useMemo(
      () => [
         {
            header: () => <StyledHeaderCell width="60px">ID</StyledHeaderCell>,
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
            header: () => <StyledHeaderCell>Фото</StyledHeaderCell>,
            accessorKey: 'photo',
            cell: ({ getValue }) => (
               <StyledCell>
                  <ProductImage src={getValue()} alt="product" />
               </StyledCell>
            ),
         },
         {
            header: () => <StyledHeaderCell>Артикул</StyledHeaderCell>,
            accessorKey: 'article',
            cell: ({ getValue }) => <StyledCell>{getValue()}</StyledCell>,
         },
         {
            header: () => (
               <StyledHeaderCell>Наименование товара</StyledHeaderCell>
            ),
            accessorKey: 'name',
            cell: ({ row }) => (
               <StyledCell>
                  <Typography>{row.original.name}</Typography>
                  <SubText>{row.original.subname}</SubText>
               </StyledCell>
            ),
         },
         {
            header: () => <StyledHeaderCell>Дата создания</StyledHeaderCell>,
            accessorKey: 'createdAt',
            cell: ({ row }) => (
               <StyledCell>
                  <Typography>{row.original.createdAt}</Typography>
                  <SubText>{row.original.createdTime}</SubText>
               </StyledCell>
            ),
         },
         {
            header: () => <StyledHeaderCell>Кол-во</StyledHeaderCell>,
            accessorKey: 'quantity',
            cell: ({ getValue }) => <StyledCell>{getValue()}</StyledCell>,
         },
         {
            header: () => <StyledHeaderCell>Цена товара</StyledHeaderCell>,
            accessorKey: 'price',
            cell: ({ row }) => (
               <StyledCell>
                  <Typography color="#2C68F5" fontWeight={500}>
                     {row.original.price}
                  </Typography>
                  <Typography color="red" fontSize={13}>
                     {row.original.discount}
                  </Typography>
               </StyledCell>
            ),
         },
         {
            header: () => <StyledHeaderCell>Текущая цена</StyledHeaderCell>,
            accessorKey: 'currentPrice',
            cell: ({ getValue }) => (
               <StyledCell>
                  <Typography color="#2C68F5">{getValue()}</Typography>
               </StyledCell>
            ),
         },
         {
            header: () => <StyledHeaderCell>Действия</StyledHeaderCell>,
            accessorKey: 'actions',
            cell: () => (
               <StyledCell>
                  <IconButton>
                     <img src={Icons.edit} alt="edit" />
                  </IconButton>
                  <IconButton>
                     <img src={Icons.deleteb} alt="delete" />
                  </IconButton>
               </StyledCell>
            ),
         },
      ],
      [selected]
   )

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

export default ProductTable

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

const ProductImage = styled('img')(() => ({
   width: 40,
   height: 40,
   objectFit: 'cover',
   borderRadius: 6,
}))

const SubText = styled(Typography)(() => ({
   fontSize: 12,
   color: '#A1A1A1',
}))
