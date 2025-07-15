import React, { useState } from 'react';
import { Box, Typography , Button} from '@mui/material';
import PaymentForm from './PaymentForm';
import PaymentList from './PaymentList';
import { orderData } from '../utils/constants/index';
import Breadcrumbs from '../components/UI/BreadCrums';

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (data, isValid, step) => {
    if (isValid) {
      setFormData(prev => ({ ...prev, ...data }));
      handleNext();
    } else if (step) {
      setCurrentStep(step);
    }
  };

  const handleDeliveryChange = (type) => {
    setDeliveryType(type);
    if (type === 'pickup') {
      setFormData(prev => ({ ...prev, address: '' }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'online') {
      setFormData(prev => ({
        ...prev,
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: ''
      }));
    }
  };

  const generateOrderNumber = () => {
    const now = new Date();
    const number = Math.floor(1000000 + Math.random() * 9000000);
    setOrderNumber(number.toString());
    setOrderDate(now.toLocaleDateString('ru-RU'));
    return number;
  };

  const handleFinalSubmit = () => {
    const orderNum = generateOrderNumber();
    setShowSuccessModal(true); // Модалдык терезени ачуу
    console.log('Submitted Data:', {
      formData,
      deliveryType,
      paymentMethod,
      orderNumber: orderNum,
      orderDate: new Date().toLocaleDateString('ru-RU')
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const steps = [
    { number: 1, label: 'Варианты доставки' },
    { number: 2, label: 'Оплата' },
    { number: 3, label: 'Обзор заказа' }
  ];

  return (
    <Box sx={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
          <Breadcrumbs/>
        </Box>
        <Typography sx={{ fontSize: '30px', fontWeight: 700, marginBottom: '30px', textAlign: 'left', color: '#333' }}>
          Оформление заказа
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, mt: 1 }}>
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: currentStep === step.number ? '#CB11AB' : '#ccc',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 13,
                    mb: 0.2,
                    transition: 'background 0.2s',
                  }}
                >
                  {step.number}
                </Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: currentStep === step.number ? 700 : 400,
                    color: currentStep === step.number ? '#CB11AB' : '#888',
                    mt: 0.2,
                    textAlign: 'center',
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
              {idx < steps.length - 1 && (
                <Box
                  sx={{
                    flex: 1,
                    height: 2,
                    background: idx < currentStep - 1 ? '#CB11AB' : '#ddd',
                    mx: 0.2,
                    minWidth: 8,
                    borderRadius: 2,
                    transition: 'background 0.2s',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: '100px' }}>
          <Box sx={{
            flex: '0 0 66.66%',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '10px',
          }}>
            <PaymentForm
              currentStep={currentStep}
              deliveryType={deliveryType}
              paymentMethod={paymentMethod}
              formData={formData}
              onFormSubmit={handleFormSubmit}
              onDeliveryChange={handleDeliveryChange}
              onPaymentMethodChange={handlePaymentMethodChange}
              onBack={handleBack}
              onFinalSubmit={handleFinalSubmit}
            />
          </Box>
          {currentStep !== 2 && (
            <Box sx={{ flex: '0 0 33.33%' }}>
              <PaymentList orderData={orderData} />
            </Box>
          )}
        </Box>
      </Box>

      {showSuccessModal && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.18)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '32px 32px 28px 32px',
              maxWidth: '520px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(203,17,171,0.12)',
            }}
          >
            <Typography sx={{ fontSize: '28px', fontWeight: 700, color: '#CB11AB', mb: '10px' }}>
              Спасибо!
            </Typography>
            <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#222', mb: '18px' }}>
              Заявка успешно оформлена!
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#333', mb: '18px' }}>
              Номер заявки: {orderNumber}
            </Typography>
            <Box
              sx={{
                backgroundColor: '#fafbfc',
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
                mb: '22px',
                textAlign: 'left',
              }}
            >
              <Typography sx={{ color: '#333', fontSize: '14px', mb: '8px' }}>
                Ваш заказ №{orderNumber} от {orderDate} оформлен
              </Typography>
              <Typography sx={{ color: '#333', fontSize: '14px' }}>
                Вся актуальная информация о статусе исполнения заказа придет на указанный email:
              </Typography>
              <Typography sx={{ mt: '6px', fontWeight: 600, color: '#333', fontSize: '14px' }}>
                {formData.email || 'aza@gmail.com'}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                backgroundColor: '#CB11AB',
                color: 'white',
                padding: '12px 0',
                border: 'none',
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: '8px',
                width: '100%',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#CB11AB' },
              }}
            >
              Продолжить покупки
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;