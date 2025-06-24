
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const ReviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const ReviewItem = ({ review }) => {
  return (
    <ReviewCard>
      <CardContent>
        <Typography variant="h6">{review.productName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {review.commentary}
        </Typography>
        <Rating value={review.rating} readOnly />
        <Typography variant="caption" color="text.secondary">
          {new Date(review.date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </ReviewCard>
  );
};

export default ReviewItem