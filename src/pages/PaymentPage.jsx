// PaymentPage.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PaymentForm from './PaymentForm';
import PaymentList from './PaymentList';

const FlexWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export default function PaymentPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Оформление заказа
      </Typography>
      <FlexWrapper>
        <PaymentForm />
        <PaymentList />
      </FlexWrapper>
    </Container>
  );
}
