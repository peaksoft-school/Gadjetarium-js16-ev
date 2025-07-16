import React, { useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import PaymentForm from '../pages/PaymentForm';
import PaymentList from './PaymentList';
import Breadcrumbs from '../components/UI/BreadCrums';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasket } from '../store/basket/basketThunk';

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

  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket);

  React.useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

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
    setShowSuccessModal(true);
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
    <>
      <MainContainer>
        <ContentWrapper>
          <BreadcrumbsContainer>
            <Breadcrumbs />
          </BreadcrumbsContainer>
          
          <PageTitle>
            Оформление заказа
          </PageTitle>
          
          <StepsContainer>
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <StepWrapper>
                  <StepNumber active={currentStep === step.number}>
                    {step.number}
                  </StepNumber>
                  <StepLabel active={currentStep === step.number}>
                    {step.label}
                  </StepLabel>
                </StepWrapper>
                {idx < steps.length - 1 && (
                  <StepConnector completed={idx < currentStep - 1} />
                )}
              </React.Fragment>
            ))}
          </StepsContainer>
          
          <MainContent>
            <FormContainer>
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
            </FormContainer>
            {currentStep !== 2 && (
              <ListContainer>
                <PaymentList orderData={basket} />
              </ListContainer>
            )}
          </MainContent>
        </ContentWrapper>

        {showSuccessModal && (
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>
                Спасибо!
              </ModalTitle>
              <ModalSubtitle>
                Заявка успешно оформлена!
              </ModalSubtitle>
              
              <OrderNumber>
                Номер заявки: {orderNumber}
              </OrderNumber>
              
              <OrderInfo>
                <OrderDescription>
                  Ваш заказ №{orderNumber} от {orderDate} оформлен
                </OrderDescription>
                <OrderEmail>
                  Вся актуальная информация о статусе исполнения заказа придет на указанный email:
                </OrderEmail>
                <OrderEmailValue>
                  {formData.email}
                </OrderEmailValue>
              </OrderInfo>
              
              <ContinueButton
                variant="contained"
                onClick={handleCloseModal}
              >
                Продолжить покупки
              </ContinueButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContainer>
    </>
  );
};

export default PaymentPage;


const MainContainer = styled(Box)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: '20px'
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto'
}));

const BreadcrumbsContainer = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
  fontSize: '14px',
  color: '#666'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 700,
  marginBottom: '31px',
  textAlign: 'left',
  color: '#333'
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(1)
}));

const StepWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const StepNumber = styled(Box)(({ theme, active }) => ({
  width: 22,
  height: 22,
  borderRadius: '50%',
  background: active ? '#CB11AB' : '#ccc',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 13,
  marginBottom: theme.spacing(0.2),
  transition: 'background 0.2s'
}));

const StepLabel = styled(Typography)(({ theme, active }) => ({
  fontSize: 11,
  fontWeight: active ? 700 : 400,
  color: active ? '#CB11AB' : '#888',
  marginTop: theme.spacing(0.2),
  textAlign: 'center'
}));

const StepConnector = styled(Box)(({ theme, completed }) => ({
  flex: 1,
  height: 2,
  background: completed ? '#CB11AB' : '#ddd',
  marginLeft: theme.spacing(0.2),
  marginRight: theme.spacing(0.2),
  minWidth: 8,
  borderRadius: 2,
  transition: 'background 0.2s'
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '100px'
}));

const FormContainer = styled(Box)(({ theme }) => ({
  flex: '0 0 66.66%',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  padding: '10px'
}));

const ListContainer = styled(Box)(({ theme }) => ({
  flex: '0 0 33.33%'
}));

const ModalOverlay = styled(Box)(({ theme }) => ({
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
  zIndex: 1000
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '32px 32px 28px 32px',
  maxWidth: '520px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(203,17,171,0.12)'
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: '#CB11AB',
  marginBottom: '10px'
}));

const ModalSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#33fd06',
  marginBottom: '18px'
}));

const OrderNumber = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  color: '#333',
  marginBottom: '18px'
}));

const OrderInfo = styled(Box)(({ theme }) => ({
  backgroundColor: '#fafbfc',
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '22px',
  textAlign: 'left'
}));

const OrderDescription = styled(Typography)(({ theme }) => ({
  color: '#333',
  fontSize: '14px',
  marginBottom: '8px'
}));

const OrderEmail = styled(Typography)(({ theme }) => ({
  color: '#333',
  fontSize: '14px'
}));

const OrderEmailValue = styled(Typography)(({ theme }) => ({
  marginTop: '6px',
  fontWeight: 600,
  color: '#333',
  fontSize: '14px'
}));

const ContinueButton = styled(Button)(({ theme }) => ({
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
  '&:hover': {
    backgroundColor: '#CB11AB'
  }
}));
