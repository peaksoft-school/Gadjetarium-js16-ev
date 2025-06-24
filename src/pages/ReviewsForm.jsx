
import React, { useState } from 'react';
import { Box, TextField, Rating, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addReview } from '../store/ReviewsThunk';

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}));

const ReviewForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: '',
    commentary: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, rating: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(formData));
    setFormData({ productName: '', commentary: '', rating: 0 });
  };

  return (
    <FormContainer>
      <Typography variant="h6" gutterBottom>
        Добавить отзыв
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="productName"
          label="Название продукта"
          value={formData.productName}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          name="commentary"
          label="Комментарий"
          value={formData.commentary}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 2 }}>
          <Typography component="legend">Оценка</Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Отправить
        </Button>
      </form>
    </FormContainer>
  );
};

export default ReviewForm