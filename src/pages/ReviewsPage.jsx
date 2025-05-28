import { useState, useEffect } from 'react';
import { Box, Container, styled } from '@mui/material';
import ReviewsTabs from '../pages/ReviewsTabs';
import ReviewsStats from '../pages/ReviewsStats';
import ReviewsList from '../pages/ReviewsList';
import { REVIEW_STATUSES, MOCK_STATS } from '../utils/constants/index';

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

const fetchReviews = async (status = REVIEW_STATUSES.ALL, url = 'YOUR_BACKEND_API_ENDPOINT') => {
  try {
    const response = await fetch(`${url}?status=${status}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

const submitReply = async (reviewId, replyText, url = 'YOUR_BACKEND_API_ENDPOINT/reply') => {
  try {
    const response = await fetch(`${url}/${reviewId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: replyText }),
    });
    if (!response.ok) throw new Error('Failed to submit reply');
    return { success: true };
  } catch (error) {
    console.error('Error submitting reply:', error);
    throw error;
  }
};

const updateReply = async (reviewId, replyText, url = 'YOUR_BACKEND_API_ENDPOINT/update') => {
  try {
    const response = await fetch(`${url}/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: replyText }),
    });
    if (!response.ok) throw new Error('Failed to update reply');
    return { success: true };
  } catch (error) {
    console.error('Error updating reply:', error);
    throw error;
  }
};

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState(REVIEW_STATUSES.ALL);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats] = useState(MOCK_STATS);

  const reviewsCounts = {
    all: reviews.length,
    unread: reviews.filter((r) => r.status === REVIEW_STATUSES.UNREAD).length,
    answered: reviews.filter((r) => r.status === REVIEW_STATUSES.ANSWERED).length,
  };

  useEffect(() => {
    loadReviews();
  }, [activeTab]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const fetchedReviews = await fetchReviews(activeTab);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const handleReply = async (reviewId, replyText) => {
    try {
      await submitReply(reviewId, replyText);
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, reply: replyText, status: REVIEW_STATUSES.ANSWERED } : r
        )
      );
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleEditReply = async (reviewId, replyText) => {
    try {
      await updateReply(reviewId, replyText);
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, reply: replyText } : r))
      );
    } catch (error) {
      console.error('Error updating reply:', error);
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <MainContent>
          <ReviewsTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            reviewsCounts={reviewsCounts}
          />
          <ReviewsList
            reviews={reviews}
            onReply={handleReply}
            onEditReply={handleEditReply}
          />
        </MainContent>
        <ReviewsStats stats={stats} />
      </ContentContainer>
    </PageContainer>
  );
};

export default ReviewsPage;