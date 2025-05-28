import { useEffect } from 'react';
import { Box, Container, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsTabs from '../pages/ReviewsTabs';
import ReviewsStats from '../pages/ReviewsStats';
import ReviewsList from '../pages/ReviewsList';
import { REVIEW_STATUSES, MOCK_STATS } from '../utils/constants/index';
import { fetchReviewsAsync, setCurrentStatus, submitReplyAsync, deleteReviewAsync } from '../store/rewiews/RewiewsSlice';

const PageContainer = styled(Container)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
});

const ContentContainer = styled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'flex-start',
});

const MainContent = styled(Box)({
  flex: 1,
});

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error, currentStatus } = useSelector((state) => state.reviews);
  const stats = MOCK_STATS;

  const reviewsCounts = {
    all: reviews.length,
    unread: reviews.filter((r) => r.status === REVIEW_STATUSES.UNREAD).length,
    answered: reviews.filter((r) => r.status === REVIEW_STATUSES.ANSWERED).length,
  };

  useEffect(() => {
    dispatch(fetchReviewsAsync(currentStatus));
  }, [currentStatus, dispatch]);

  const handleTabChange = (newTab) => {
    dispatch(setCurrentStatus(newTab));
  };

  const handleReply = (reviewId, replyText) => {
    dispatch(submitReplyAsync({ reviewId, replyText }));
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReviewAsync(reviewId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageContainer>
      <ContentContainer>
        <MainContent>
          <ReviewsTabs
            activeTab={currentStatus}
            onTabChange={handleTabChange}
            reviewsCounts={reviewsCounts}
          />
          <ReviewsList
            reviews={reviews}
            onReply={handleReply}
            onEditReply={handleReply} // Reusing for simplicity
            onDelete={handleDelete}
          />
        </MainContent>
        <ReviewsStats stats={stats} />
      </ContentContainer>
    </PageContainer>
  );
};

export default ReviewsPage;