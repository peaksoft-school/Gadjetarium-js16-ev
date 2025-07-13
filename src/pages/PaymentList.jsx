// PaymentList.jsx
import React from 'react';
import { Box, Typography, Divider, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const Summary = styled(Box)(({ theme }) => ({
  flex: 1,
  border: '1px solid #eee',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  height: 'fit-content',
}));

export default function PaymentList() {
  return (
    <Summary>
      <Typography variant="subtitle1" gutterBottom>
        Сумма заказа
      </Typography>
      <Typography>Количество товаров: 3 шт.</Typography>
      <Typography color="error">Ваша скидка: -20 000 с</Typography>
      <Typography>Сумма: 220 900 с</Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Итого: 200 900 с
      </Typography>

      <Divider sx={{ my: 2 }} />

      {[0, 1].map((i) => (
        <Card key={i} variant="outlined" sx={{ display: 'flex', mb: 1 }}>
          <CardMedia
            component="img"
            alt="Samsung Galaxy S21"
            sx={{ width: 80 }}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography noWrap>Samsung Galaxy S21 128 GB синий</Typography>
            <Typography variant="body2">Кол-во: 3 шт.</Typography>
            <Typography variant="body2">Размер: 44</Typography>
            <Typography variant="body2">Цвет: Белый</Typography>
          </CardContent>
        </Card>
      ))}
    </Summary>
  );
}
