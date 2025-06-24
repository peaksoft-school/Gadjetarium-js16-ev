
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../store/ReviewsThunk';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { axiosInstance, injectStore } from '../configs/axiosInstans';

const ReviewsContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
}));

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const store = useSelector((state) => state);

  useEffect(() => {
    injectStore(store);
    dispatch(fetchReviews());
  }, [dispatch, store]);

  return (
    <ReviewsContainer>
      <h1>Отзывы</h1>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      <ReviewForm />
    </ReviewsContainer>
  );
};

export default ReviewsPage