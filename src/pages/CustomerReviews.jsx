import { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewsTable from "../ReviewsTable/ReviewsTable";
import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (err) {
        setError('Ошибка при загрузке отзывов');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Отзывы пользователей
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ReviewsTable
            reviews={reviews}
            loading={loading}
            error={error}
            setReviews={setReviews}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CustomerReviews;