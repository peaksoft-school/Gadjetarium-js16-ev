import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { axiosInstance } from '../configs/axiosInstans';

const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  maxWidth: '500px',
}));

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    commentary: '',
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/reviews', formData);
      setFormData({ productName: '', commentary: '', rating: 0 });
      alert('Отзыв успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
      alert('Произошла ошибка при добавлении отзыва.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        name="productName"
        label="Название товара"
        value={formData.productName}
        onChange={handleChange}
        required
      />
      <TextField
        name="commentary"
        label="Комментарий"
        value={formData.commentary}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <Rating
        name="rating"
        value={formData.rating}
        onChange={handleRatingChange}
        precision={0.5}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить отзыв
      </Button>
    </FormContainer>
  );
};

export default ReviewForm;