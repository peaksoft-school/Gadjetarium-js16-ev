import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ReviewsTable from '../components/RewiewsTable';
import Infographic from '../pages/Infographic';
import { fetchReviewsByStatus } from '../store/ReviewsThunk';
import { styled } from '@mui/material/styles';

const DashboardContainer = styled(Box)(({ theme }) => ({
  p: 3,
  backgroundColor: '#f9fafb',
  minHeight: '100vh',
}));

const Header = styled(Typography)(({ theme }) => ({
  mb: 3,
  fontWeight: 600,
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 2,
}));

const ReviewsDashboard = () => {
  const dispatch = useDispatch();
  const { reviews, status, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviewsByStatus('все'));
  }, [dispatch]);

  const handleReply = (review) => {
    console.log('Reply to review:', review);
  };

  return (
    <DashboardContainer>
      <Header variant="h4">Управление отзывами</Header>
      {status === 'loading' && <Typography>Загрузка...</Typography>}
      {status === 'failed' && (
        <Typography color="error">{error || 'Что-то пошло не так!'}</Typography>
      )}
      {status === 'succeeded' && (
        <ContentBox>
          <Box sx={{ flex: 1 }}>
            <ReviewsTable data={reviews} onReply={handleReply} />
          </Box>
          <Box>
            <Infographic />
          </Box>
        </ContentBox>
      )}
    </DashboardContainer>
  );
};

export default ReviewsDashboard;