import { useState } from 'react';
import { Box, TextField, Button, styled } from '@mui/material';

const ReplyContainer = styled(Box)({
  marginTop: '16px',
  padding: '16px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
});

const ReplyTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e91e63',
    },
  },
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '12px',
  marginTop: '12px',
});

const SaveButton = styled(Button)({
  backgroundColor: '#e91e63',
  color: '#fff',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#d81b60',
  },
});

const CancelButton = styled(Button)({
  color: '#e91e63',
  borderColor: '#e91e63',
  textTransform: 'none',
  '&:hover': {
    borderColor: '#d81b60',
    backgroundColor: 'rgba(233, 30, 99, 0.04)',
  },
});

const ReviewReplyForm = ({ reviewId, initialReply = '', onSave, onCancel, isEditing = false }) => {
  const [reply, setReply] = useState(initialReply);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!reply.trim()) return;

    setIsLoading(true);
    try {
      await onSave(reviewId, reply);
      if (!isEditing) {
        setReply('');
      }
    } catch (error) {
      console.error('Error saving reply:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setReply(initialReply);
    } else {
      setReply('');
    }
    onCancel();
  };

  return (
    <ReplyContainer>
      <ReplyTextField
        fullWidth
        multiline
        rows={3}
        placeholder={isEditing ? 'Редактировать ответ...' : 'Ответить на комментарий'}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        variant="outlined"
      />
      <ButtonContainer>
        <CancelButton
          variant="outlined"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isEditing ? 'Отменить' : 'Отменить'}
        </CancelButton>
        <SaveButton
          variant="contained"
          onClick={handleSave}
          disabled={isLoading || !reply.trim()}
        >
          {isEditing ? 'Сохранить' : 'Сохранить'}
        </SaveButton>
      </ButtonContainer>
    </ReplyContainer>
  );
};

export default ReviewReplyForm;