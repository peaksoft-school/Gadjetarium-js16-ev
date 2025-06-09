import { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Rating,
  Button,
  Tabs, // Added import for Tabs
  Tab,  // Added import for Tab
} from '@mui/material';
import { Reply } from '@mui/icons-material';

const ReviewsTable = ({ data = [], onReply = () => {} }) => {
  const normalizedData = Array.isArray(data) ? data : [];

  const [tabValue, setTabValue] = useState(0);
  const [filteredData, setFilteredData] = useState(normalizedData);

  useEffect(() => {
    if (tabValue === 0) {
      setFilteredData(normalizedData);
    } else if (tabValue === 1) {
      setFilteredData(normalizedData.filter((item) => !item.review?.response));
    } else {
      setFilteredData(normalizedData.filter((item) => item.review?.response));
    }
  }, [tabValue, normalizedData]);

  const columns = useMemo(
    () => [
      { Header: '№', accessor: 'index', Cell: ({ row }) => row.index + 1 },
      {
        Header: 'Фото',
        accessor: 'user.profile',
        Cell: ({ row }) => (
          <Avatar
            src={row.original.user.profile}
            alt={row.original.user.fullName}
            sx={{ width: 40, height: 40 }}
          />
        ),
      },
      {
        Header: 'Пользователь',
        accessor: 'user.fullName',
        Cell: ({ row }) => (
          <Box>
            <Typography variant="body2">{row.original.user.fullName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {row.original.user.email}
            </Typography>
          </Box>
        ),
      },
      {
        Header: 'Товар',
        accessor: 'product.name',
        Cell: ({ row }) => (
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {row.original.product.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Арт. {row.original.product.article}
            </Typography>
          </Box>
        ),
      },
      {
        Header: 'Отзыв',
        accessor: 'review.comment',
        Cell: ({ row }) => (
          <Box>
            <Typography variant="body2">{row.original.review.comment}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(row.original.review.createdAt).toLocaleString('ru-RU')}
            </Typography>
          </Box>
        ),
      },
      {
        Header: 'Оценка',
        accessor: 'review.rating',
        Cell: ({ row }) => (
          <Rating
            value={row.original.review.rating}
            readOnly
            size="small"
            sx={{ color: '#fbbf24' }}
          />
        ),
      },
      {
        Header: 'Ответ',
        accessor: 'review.response',
        Cell: ({ row }) => (
          <Typography
            variant="body2"
            color={row.original.review.response ? 'green' : 'gray'}
          >
            {row.original.review.response || '—'}
          </Typography>
        ),
      },
      {
        Header: 'Действия',
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            size="small"
            onClick={() => onReply(row.original)}
            startIcon={<Reply />}
          >
            Ответить
          </Button>
        ),
      },
    ],
    [onReply]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <Box>
      <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newVal) => setTabValue(newVal)}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Все отзывы" />
          <Tab label="Неотвеченные" />
          <Tab label="Отвеченные" />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Назад
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Вперед
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewsTable;