import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Typography,
  Rating, Button, Tabs, Tab, TextField,
} from '@mui/material';
import { Reply, Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  backgroundColor: '#fff',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    fontWeight: 600,
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledRating = styled(Rating)({
  color: '#fbbf24',
});

const ResponseText = styled(Typography)(({ hasresponse }) => ({
  color: hasresponse === 'true' ? '#4caf50' : '#9e9e9e',
}));

const EditContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));

const ContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
}));

const TabPanel = styled(Box)(({ theme }) => ({
  minHeight: 100,
}));

const ReviewsTable = ({ data = [], onReply = () => {} }) => {
  const [tab, setTab] = useState(0);
  const [editMode, setEditMode] = useState(null);
  const [replyText, setReplyText] = useState({});

  const filtered = useMemo(() => {
    if (tab === 1) return data.filter(d => !d.review.response);
    if (tab === 2) return data.filter(d => d.review.response);
    return data;
  }, [tab, data]);

  const columns = useMemo(() => [
    { Header: '№', accessor: (_row, i) => i + 1 },
    {
      Header: 'Фото',
      accessor: 'user.profile',
      Cell: ({ row }) => (
        <Avatar src={row.original.user.profile} alt={row.original.user.fullName} />
      ),
    },
    {
      Header: 'Пользователь',
      accessor: 'user.fullName',
      Cell: ({ row }) => (
        <Box>
          <Typography variant="body2">{row.original.user.fullName}</Typography>
          <Typography variant="caption" color="text.secondary">{row.original.user.email}</Typography>
        </Box>
      ),
    },
    {
      Header: 'Товар',
      accessor: 'product.name',
      Cell: ({ row }) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>{row.original.product.name}</Typography>
          <Typography variant="caption" color="text.secondary">Арт. {row.original.product.article}</Typography>
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
      Cell: ({ row }) => <StyledRating value={row.original.review.rating} readOnly size="small" />,
    },
    {
      Header: 'Ответ',
      accessor: 'review.response',
      Cell: ({ row }) => {
        const has = !!row.original.review.response;
        return (
          <ResponseText hasresponse={has.toString()} variant="body2">
            {row.original.review.response || '—'}
          </ResponseText>
        );
      },
    },
    {
      Header: 'Действия',
      Cell: ({ row }) => {
        const id = row.original.id;
        const isEditing = editMode === id;
        const has = !!row.original.review.response;

        if (isEditing) {
          return (
            <EditContainer>
              <TextField
                value={replyText[id] || ''}
                onChange={e => setReplyText(prev => ({ ...prev, [id]: e.target.value }))}
                multiline rows={2} size="small" fullWidth
                placeholder="Введите ответ..."
              />
              <ActionButtons>
                <Button
                  variant="contained" color="primary" size="small"
                  onClick={() => {
                    onReply({
                      ...row.original,
                      review: {
                        ...row.original.review,
                        response: replyText[id] || '',
                      }
                    });
                    setEditMode(null);
                  }}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined" size="small"
                  onClick={() => setEditMode(null)}
                >
                  Отмена
                </Button>
              </ActionButtons>
            </EditContainer>
          );
        }

        return (
          <Button
            variant="outlined"
            startIcon={has ? <Edit /> : <Reply />}
            size="small"
            onClick={() => {
              setEditMode(id);
              setReplyText(prev => ({ ...prev, [id]: row.original.review.response || '' }));
            }}
          >
            {has ? 'Редактировать' : 'Ответить'}
          </Button>
        );
      },
    },
  ], [editMode, replyText, onReply]);

  const table = useTable({ columns, data: filtered, initialState: { pageSize: 5 } },
    useSortBy, usePagination);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, canPreviousPage, canNextPage, nextPage, previousPage } = table;

  return (
    <ContainerBox>
      <StyledTabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Все" />
        <Tab label="Неотвеченные" />
        <Tab label="Отвеченные" />
      </StyledTabs>

      <TabPanel>
        {filtered.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Нет отзывов</Typography>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table {...getTableProps()}>
              <StyledTableHead>
                {headerGroups.map(hg => (
                  <TableRow {...hg.getHeaderGroupProps()}>
                    {hg.headers.map(col => (
                      <TableCell {...col.getHeaderProps(col.getSortByToggleProps())}>
                        {col.render('Header')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </StyledTableHead>
              <TableBody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()}>
                      {row.cells.map(cell => (
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
        )}
      </TabPanel>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Назад</Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>Вперёд</Button>
      </Box>
    </ContainerBox>
  );
};

export default ReviewsTable;
