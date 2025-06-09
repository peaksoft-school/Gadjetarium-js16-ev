import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ReviewsTable from '../src/components/RewiewsTable';
import { fetchReviewsByStatus } from '../src/store/ReviewsThunk';

const App = () => {
  const dispatch = useDispatch();

  const { reviews, status, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    // Бэкенддин талабына жараша туура статус тандоо
    dispatch(fetchReviewsByStatus('неотвеченные')); // Жооп берилбегендерди алуу, башка тандоо: 'отвеченные' же 'все'
  }, [dispatch]);

  const handleReply = (review) => {
    console.log('Reply to review:', review);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Управление отзывами
      </Typography>

      {status === 'loading' && <Typography>Загрузка...</Typography>}
      {status === 'failed' && (
        <Typography color="error">{error || 'Что-то пошло не так!'}</Typography>
      )}
      {status === 'succeeded' && (
        <ReviewsTable data={reviews} onReply={handleReply} />
      )}
    </Box>
  );
};

export default App;