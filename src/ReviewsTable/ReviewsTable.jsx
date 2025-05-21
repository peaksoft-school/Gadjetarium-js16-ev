import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const ProductCell = styled(TableCell)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& img': {
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
  },
  '& .article': {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));

const UserCell = styled(TableCell)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .email': {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));

const ReviewsTable = ({ reviews, loading, error, setReviews }) => {
  const [editingId, setEditingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, answer: replyText } : r));
    setReplyText('');
    setEditingId(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Товар</TableCell>
            <TableCell>Комментарий</TableCell>
            <TableCell>Оценка</TableCell>
            <TableCell>Пользователь</TableCell>
            <TableCell>Ответ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review, index) => (
            <TableRow key={review.id}>
              <TableCell>{index + 1}</TableCell>
              <ProductCell>
                <img
                  src={review.product?.image || 'https://via.placeholder.com/50'}
                  alt={review.product?.name}
                  width={50}
                  height={50}
                />
                <div>
                  <div>{review.product?.name}</div>
                  <div className="article">Арт: {review.product?.article}</div>
                </div>
              </ProductCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <UserCell>
                <Avatar src={review.user?.avatar} />
                <div>
                  <div>{review.user?.name}</div>
                  <div className="email">{review.user?.email}</div>
                </div>
              </UserCell>
              <TableCell>
                {editingId === review.id ? (
                  <div>
                    <TextField
                      fullWidth
                      size="small"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                    />
                    <Button
                      size="small"
                      onClick={() => handleReply(review.id)}
                      variant="contained"
                      color="primary"
                    >
                      Сохранить
                    </Button>
                  </div>
                ) : review.answer ? (
                  <div>
                    <Typography>{review.answer}</Typography>
                    <Button size="small" onClick={() => {
                      setEditingId(review.id);
                      setReplyText(review.answer);
                    }}>
                      Редактировать
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="small"
                    onClick={() => setEditingId(review.id)}
                    variant="outlined"
                  >
                    Ответить
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default ReviewsTable;
