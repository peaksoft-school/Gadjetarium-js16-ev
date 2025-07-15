import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const PaymentList = ({ orderData }) => {
  const { summary, products } = orderData;

  return (
    <Box sx={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      height: 'fit-content'
    }}>
      <Box sx={{
        fontSize: '18px',
        fontWeight: 700,
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#333'
      }}>
        <Typography>Сумма заказа</Typography>
        <Link href="#" sx={{
          color: '#2196f3',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500
        }}>
          Изменить
        </Link>
      </Box>

      <Box sx={{
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '20px'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          fontSize: '14px',
          color: '#666'
        }}>
          <Typography>Количество товаров:</Typography>
          <Typography>{summary.quantity}</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          fontSize: '14px',
          color: '#666'
        }}>
          <Typography>Ваша скидка:</Typography>
          <Typography sx={{ color: '#e91e63' }}>– {summary.discount}</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          fontSize: '14px',
          color: '#666'
        }}>
          <Typography>Сумма:</Typography>
          <Typography>{summary.subtotal}</Typography>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 700,
        fontSize: '16px',
        marginBottom: '20px',
        color: '#333'
      }}>
        <Typography>Итого:</Typography>
        <Typography>{summary.total}</Typography>
      </Box>

      {/* Бардык товарлар бир эле Box'тун ичинде */}
      <Box sx={{ marginBottom: '20px' }}>
        {/* Статичный список телефонов, как на скриншоте */}
        {[1,2].map((_, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, pb: 2, borderBottom: idx === 0 ? '1px solid #eee' : 'none' }}>
            <Box sx={{ minWidth: 70, mr: 2 }}>
              <img
                src="https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg"
                alt="Samsung Galaxy S21"
                style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover' }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 17, color: '#222', mb: 0.5 }}>
                Samsung Galaxy S21 128gb синий 9(MLP3RU)
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Артикул: 393478</Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Кол-во: 3 шт.</Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Размер: 44</Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Цвет: Белый</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PaymentList;