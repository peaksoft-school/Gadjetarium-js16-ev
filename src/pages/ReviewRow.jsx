import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Collapse,
  Rating,
  styled,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Delete } from '@mui/icons-material';
import ReviewReplyForm from './ReviewReplyForm';

const ReviewContainer = styled(Box)({
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  marginBottom: '16px',
  borderRadius: '8px',
  overflow: 'hidden',
});

const ReviewHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  cursor: 'pointer',
});

const ReviewContent = styled(Box)({
  padding: '0 16px 16px',
});

const RowNumber = styled(Typography)({
  fontSize: '16px',
  color: '#333',
  fontWeight: '500',
  minWidth: '24px',
  marginRight: '16px',
});

const ProductSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  minWidth: '180px',
  flex: '0 0 180px',
});

const ProductImage = styled(Avatar)({
  width: 48,
  height: 48,
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
});

const ProductInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const ProductName = styled(Typography)({
  fontWeight: '600',
  fontSize: '16px',
  color: '#333',
});

const ProductDetails = styled(Typography)({
  color: '#666',
  fontSize: '12px',
});

const CommentSection = styled(Box)({
  flex: 1,
  paddingRight: '20px',
});

const ReviewText = styled(Typography)({
  fontSize: '14px',
  color: '#333',
  lineHeight: 1.4,
  wordBreak: 'break-word',
});

const ReviewDate = styled(Typography)({
  color: '#999',
  fontSize: '12px',
});

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

const StyledRating = styled(Rating)({
  color: '#ff9800',
});

const UserSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '120px',
});

const UserAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  marginBottom: '4px',
});

const UserName = styled(Typography)({
  fontWeight: '500',
  fontSize: '14px',
  textAlign: 'center',
});

const UserEmail = styled(Typography)({
  color: '#999',
  fontSize: '12px',
  textAlign: 'center',
});

const ControlSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const DeleteIcon = styled(Delete)({
  color: '#999',
  fontSize: '18px',
});

const ImageGrid = styled(Box)({
  display: 'flex',
  gap: '8px',
  margin: '12px 0',
});

const ImagePlaceholder = styled(Box)({
  width: '80px',
  height: '80px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
});

const ReplySection = styled(Box)({
  backgroundColor: '#f9f9f9',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '16px',
});

const ReplyText = styled(Typography)({
  color: '#666',
  marginBottom: '16px',
  fontSize: '14px',
});

const ReplyButton = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '8px',
});

const EditButton = styled(Box)({
  backgroundColor: '#d946ef',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#c026d3',
  },
});

const ReviewRow = ({
  review,
  expanded,
  onToggleExpand,
  onReply,
  onEditReply,
  onDelete,
  index,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    if (!expanded) setShowReplyForm(false);
  }, [expanded]);

  const handleReplyClick = (e) => {
    e.stopPropagation();
    setShowReplyForm(true);
    if (!expanded) onToggleExpand();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(review.id);
  };

  const handleSaveReply = async (reviewId, replyText) => {
    await onReply(reviewId, replyText);
    setShowReplyForm(false);
  };

  const handleEditSaveReply = async (reviewId, replyText) => {
    await onEditReply(reviewId, replyText);
    setShowReplyForm(false);
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  const fullComment = review.comment || 'Эрсултан, красавчик! '.repeat(10);
  const truncatedComment = fullComment.length > 100 ? `${fullComment.substring(0, 100)}...` : fullComment;

  return (
    <ReviewContainer>
      <ReviewHeader onClick={onToggleExpand}>
        <RowNumber>{index}</RowNumber>
        <ProductSection>
          <ProductImage />
          <ProductInfo>
            <ProductName>{review.product?.name || 'Asus'}</ProductName>
            <ProductDetails>
              {review.product?.model || 'Модель'}<br />
              Арт. {review.product?.article || review.article || '1212121212'}
            </ProductDetails>
          </ProductInfo>
        </ProductSection>
        <CommentSection>
          <ReviewText>{expanded ? fullComment : truncatedComment}</ReviewText>
          <ReviewDate>{review.date || '20.06.22 - 14:15'}</ReviewDate>
        </CommentSection>
        <RightSection>
          <StyledRating value={review.rating || 3} readOnly size="small" />
          <UserSection>
            <UserAvatar />
            <UserName>{review.user?.name || 'Адыл Бакытов'}</UserName>
            <UserEmail>{review.user?.email || 'Adyl@mail.com'}</UserEmail>
          </UserSection>
          <ControlSection>
            <IconButton size="small" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}>
              {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </ControlSection>
        </RightSection>
      </ReviewHeader>
      <Collapse in={expanded}>
        <ReviewContent>
          <ImageGrid>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <ImagePlaceholder key={idx} />
            ))}
          </ImageGrid>
          <ReplySection>
            {!showReplyForm && (
              <Box>
                <ReplyText variant="body2">
                  Добрый день! Благодарим Вас за отзыв, рады быть полезными. Спасибо, что выбираете нас. Хорошего дня!
                </ReplyText>
                <ReplyButton>
                  <EditButton onClick={handleReplyClick}>Редактировать</EditButton>
                </ReplyButton>
              </Box>
            )}
            {showReplyForm && (
              <ReviewReplyForm
                reviewId={review.id}
                initialReply={review.reply || 'Добрый день! Благодарим Вас за отзыв, рады быть полезными. Спасибо, что выбираете нас. Хорошего дня!'}
                onSave={review.reply ? handleEditSaveReply : handleSaveReply}
                onCancel={handleCancelReply}
                isEditing={!!review.reply}
              />
            )}
          </ReplySection>
        </ReviewContent>
      </Collapse>
    </ReviewContainer>
  );
};

export default ReviewRow;