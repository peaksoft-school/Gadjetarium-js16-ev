import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const demoProducts = [
  {
    productTypeId: 1,
    name: 'Samsung Galaxy S21 128gb синий 9(MLP3RU)',
    imageUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg',
    price: 220900,
    code: 393478,
    quantity: 3,
    discount: 20000,
    size: 44,
    color: 'Белый',
  },
  {
    productTypeId: 2,
    name: 'Samsung Galaxy S21 128gb синий 9(MLP3RU)',
    imageUrl: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg',
    price: 220900,
    code: 393478,
    quantity: 3,
    discount: 20000,
    size: 44,
    color: 'Белый',
  },
];

const PaymentList = ({ products }) => {
  const items = Array.isArray(products) && products.length > 0 ? products : demoProducts;

  // Считаем сумму, скидку и итог
  const quantity = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = items.reduce((acc, item) => acc + (item.price || 0), 0);
  const discount = items.reduce((acc, item) => acc + (item.discount || 0), 0);
  const total = subtotal - discount;

  return (
    <>
      <Box sx={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '28px 32px 24px 32px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        minWidth: 350,
        maxWidth: 420,
        margin: '0 auto',
        mb: 3,
      }}>
        <Box sx={{
          fontWeight: 700,
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#222',
        }}>
          <Typography sx={{ fontWeight: 700, fontSize: 26 }}>Сумма заказа</Typography>
          <Link href="#" sx={{
            color: '#3D5AFE',
            textDecoration: 'none',
            fontSize: '17px',
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            Изменить
          </Link>
        </Box>

        <Box sx={{
          marginBottom: '20px',
          borderBottom: '1px solid #E0E0E0',
          paddingBottom: '20px',
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '17px',
            color: '#222',
          }}>
            <Typography>Количество товаров:</Typography>
            <Typography>{quantity} шт.</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '17px',
            color: '#222',
          }}>
            <Typography>Ваша скидка:</Typography>
            <Typography sx={{ color: '#E53935', fontWeight: 500 }}>– {discount.toLocaleString()} c</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '17px',
            color: '#222',
          }}>
            <Typography>Сумма:</Typography>
            <Typography>{subtotal.toLocaleString()} c</Typography>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 700,
          fontSize: '20px',
          color: '#222',
        }}>
          <Typography sx={{ fontWeight: 700 }}>Итого:</Typography>
          <Typography sx={{ fontWeight: 700 }}>{total.toLocaleString()} c</Typography>
        </Box>
      </Box>

      <Box>
        {items.map((item, idx) => (
          <Box
            key={item.productTypeId || idx}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              mb: 3,
              pb: 2,
              borderBottom: idx !== items.length - 1 ? '1px solid #E0E0E0' : 'none',
              background: 'transparent',
              borderRadius: 0,
              boxShadow: 'none',
              px: 0,
              mx: 0,
            }}
          >
            <Box sx={{ minWidth: 70, mr: 2 }}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover' }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 17, color: '#222', mb: 0.5 }}>
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Артикул: {item.code}</Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Кол-во: {item.quantity} шт.</Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Размер: {item.size || 44}</Typography>
              <Typography sx={{ fontSize: 14, color: '#444' }}>Цвет: {item.color || 'Белый'}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PaymentList;