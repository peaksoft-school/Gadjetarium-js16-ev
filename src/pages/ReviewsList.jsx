import { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import ReviewRow from './ReviewRow';

const ListContainer = styled(Box)({
  flex: 1,
});

const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '40px 20px',
  color: '#665',
});

const EmptyTitle = styled(Typography)({
  marginBottom: '8px',
});

const EmptyText = styled(Typography)({
  fontSize: '14px',
});

const ReviewsList = ({ reviews, onReply, onEditReply, onDelete }) => {
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const handleToggleExpand = (id) => {
    setExpandedReviewId((prev) => (prev === id ? null : id));
  };

  if (!reviews || reviews.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyTitle variant="h6">Отзывы не найдены</EmptyTitle>
          <EmptyText variant="body2">В данной категории пока нет отзывов</EmptyText>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {reviews.map((review, index) => (
        <ReviewRow
          key={review.id}
          review={review}
          expanded={expandedReviewId === review.id}
          onToggleExpand={() => handleToggleExpand(review.id)}
          onReply={onReply}
          onEditReply={onEditReply}
          onDelete={onDelete}
          index={index + 1}
        />
      ))}
    </ListContainer>
  );
};

export default ReviewsList;