// PaymentForm.jsx
import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Box)(({ theme }) => ({
  flex: 2,
}));

const Section = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const steps = ['Варианты доставки', 'Оплата', 'Обзор заказа'];

export default function PaymentForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    delivery: 'pickup',
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    payment: 'cardOnline',
  });

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const next = () => setActiveStep((s) => s + 1);

  return (
    <FormContainer>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Section>
          <Typography variant="subtitle1" gutterBottom>
            Доставка
          </Typography>
          <RadioGroup
            name="delivery"
            value={data.delivery}
            onChange={handleChange}
          >
            <FormControlLabel
              value="pickup"
              control={<Radio />}
              label="Самовывоз из магазина — Бесплатно"
            />
            <FormControlLabel
              value="courier"
              control={<Radio />}
              label="Доставка курьером — от 200 с (свыше 10 000 с — бесплатно)"
            />
          </RadioGroup>

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Личные данные
          </Typography>
          <TextField
            fullWidth
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Фамилия"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="E‑mail"
            name="email"
            value={data.email}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Телефон"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            margin="dense"
          />
          {data.delivery === 'courier' && (
            <TextField
              fullWidth
              label="Адрес доставки"
              name="address"
              value={data.address}
              onChange={handleChange}
              margin="dense"
            />
          )}
        </Section>
      )}

      {activeStep === 1 && (
        <Section>
          <Typography variant="subtitle1" gutterBottom>
            Способ оплаты
          </Typography>
          <RadioGroup
            name="payment"
            value={data.payment}
            onChange={handleChange}
          >
            <FormControlLabel
              value="cardOnline"
              control={<Radio />}
              label="Оплата картой онлайн"
            />
            <FormControlLabel
              value="cardOnDelivery"
              control={<Radio />}
              label="Картой при получении"
            />
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Наличными при получении"
            />
          </RadioGroup>

          {data.payment === 'cardOnline' && (
            <Box sx={{ mt: 2 }}>
              <TextField fullWidth label="Номер карты" margin="dense" />
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField label="MM/YY" sx={{ flex: 1 }} />
                <TextField label="CVC" sx={{ flex: 1 }} />
              </Box>
              <TextField fullWidth label="Имя владельца" margin="dense" />
            </Box>
          )}
        </Section>
      )}

      {activeStep === 2 && (
        <Section>
          <Typography variant="subtitle1" gutterBottom>
            Обзор заказа
          </Typography>
          <Typography>Итого: 250 000 с</Typography>
          <Typography>
            Доставка: {data.delivery === 'pickup'
              ? 'Самовывоз из магазина'
              : data.address}
          </Typography>
          <Typography>
            Оплата:{' '}
            {data.payment === 'cardOnline'
              ? 'Картой онлайн'
              : data.payment === 'cardOnDelivery'
              ? 'Картой при получении'
              : 'Наличными'}
          </Typography>
        </Section>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={next}
        sx={{ mt: 3 }}
      >
        {activeStep === steps.length - 1 ? 'Оформить заказ' : 'Продолжить'}
      </Button>
    </FormContainer>
  );
}
