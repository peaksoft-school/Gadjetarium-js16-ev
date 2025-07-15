import { useState } from 'react'
import {
   Box,
   Typography,
   Button,
   TextField,
   Checkbox,
   FormControlLabel,
   styled,
} from '@mui/material'
import { Icons } from '../assets/icons'

const StyledContainer = styled(Box)({
   padding: 0,
})

const StyledTitle = styled(Typography)({
   fontWeight: 700,
   fontSize: 22,
   marginBottom: 24,
})

const StyledSubTitle = styled(Typography)({
   fontWeight: 700,
   fontSize: 20,
   marginBottom: 16,
})

const DeliveryOptionsContainer = styled(Box)({
   display: 'flex',
   gap: 24,
   marginBottom: 32,
})

const DeliveryOption = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
   flex: 1,
   border: selected ? '3px solid #2ecc40' : '1px solid #e0e0e0',
   borderRadius: 6,
   background: '#fff',
   padding: 20,
   cursor: 'pointer',
   minHeight: 90,
   boxShadow: selected ? '0 2px 8px rgba(46,204,64,0.08)' : 'none',
   transition: 'border 0.2s',
}))

const RadioButton = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
   width: 20,
   height: 20,
   borderRadius: '50%',
   border: selected ? '7px solid #2ecc40' : '2px solid #bdbdbd',
   background: '#fff',
   marginRight: 12,
   transition: 'border 0.2s',
}))

const PaymentRadioButton = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
   width: 22,
   height: 20,
   borderRadius: '50%',
   border: selected ? '6px solid #2ecc40' : '2px solid #bdbdbd',
   background: '#fff',
   marginRight: 8,
   transition: 'border 0.2s',
}))

const OptionHeader = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   marginBottom: 8,
})

const OptionTitle = styled(Typography)({
   fontWeight: 700,
   fontSize: 16,
})

const OptionDescription = styled(Typography)({
   fontSize: 13,
   color: '#888',
   marginBottom: 8,
})

const Divider = styled(Box)({
   borderTop: '1px solid #e0e0e0',
   marginTop: 32,
   marginBottom: 24,
})

const FormContainer = styled('form')({
   width: '100%',
})

const FormRow = styled(Box)({
   display: 'flex',
   gap: 16,
   marginBottom: 16,
})

const StyledTextField = styled(TextField)({
   background: '#fff',
   borderRadius: '8px',
   marginBottom: 16,
   '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontSize: 16,
      borderColor: '#e0e0e0',
      '& fieldset': {
         borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
         borderColor: '#CB11AB',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#CB11AB',
         borderWidth: 2,
      },
   },
   '& .MuiInputBase-input': {
      fontSize: 16,
      background: '#fff',
      borderRadius: 8,
   },
})

const PrimaryButton = styled(Button)({
   background: '#CB11AB',
   color: '#fff',
   fontWeight: 700,
   fontSize: 18,
   marginTop: 24,
   padding: '12px 0',
   borderRadius: 16,
   boxShadow: 'none',
   '&:hover': {
      background: '#CB11AB',
   },
})

const SecondaryButton = styled(Button)({
   background: '#CB11AB',
   color: '#fff',
   fontWeight: 700,
   fontSize: 18,
   marginTop: 32,
   padding: '12px 0',
   borderRadius: 16,
   boxShadow: 'none',
   '&:hover': {
      background: '#CB11AB',
   },
})

const BackButton = styled(Button)({
   backgroundColor: '#fff',
   color: '#e91e63',
   padding: '10px 20px',
   border: '1px solid #e91e63',
   borderRadius: '6px',
   fontSize: '14px',
   fontWeight: 500,
   cursor: 'pointer',
   width: '100%',
   marginTop: '10px',
   boxShadow: '0 2px 5px rgba(233,30,99,0.1)',
})

const PaymentOptionsContainer = styled(Box)({
   display: 'flex',
   gap: 24,
   marginBottom: 32,
})

const PaymentOption = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
   flex: 1,
   border: selected ? '2px solid #2ecc40' : '1px solid #e0e0e0',
   borderRadius: 16,
   background: '#fff',
   padding: 20,
   cursor: 'pointer',
   minHeight: 90,
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   boxShadow: selected ? '0 2px 8px rgba(46,204,64,0.08)' : 'none',
   transition: 'border 0.2s',
}))

const PaymentIconsContainer = styled(Box)({
   display: 'flex',
   gap: 8,
   marginTop: 8,
})

const CardFormContainer = styled(Box)({
   display: 'flex',
   gap: 24,
   alignItems: 'flex-start',
})

const CardForm = styled(Box)({
   background: '#fff',
   borderRadius: 16,
   boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
   padding: 24,
   minWidth: 380,
   flex: '0 0 380px',
})

const CardIconsContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'flex-end',
   gap: 8,
   marginBottom: 16,
})

const CardTextField = styled(TextField)({
   marginBottom: 16,
   '& .MuiInput-underline:before': {
      borderBottomColor: '#e0e0e0',
   },
   '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#CB11AB',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: '#CB11AB',
   },
   '& .MuiInputBase-input': {
      fontSize: 18,
   },
})

const ExpiryContainer = styled(Box)({
   display: 'flex',
   gap: 16,
   marginBottom: 16,
   alignItems: 'center',
})

const ExpiryField = styled(TextField)({
   width: 60,
   '& .MuiInput-underline:before': {
      borderBottomColor: '#e0e0e0',
   },
   '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#CB11AB',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: '#CB11AB',
   },
   '& .MuiInputBase-input': {
      fontSize: 18,
   },
})

const CVCField = styled(TextField)({
   width: 80,
   marginLeft: 16,
   '& .MuiInput-underline:before': {
      borderBottomColor: '#e0e0e0',
   },
   '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#CB11AB',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: '#CB11AB',
   },
   '& .MuiInputBase-input': {
      fontSize: 18,
   },
})

const SecurityText = styled(Typography)({
   color: '#444',
   fontSize: 14,
   maxWidth: 300,
   marginTop: 12,
})

const OrderReviewContainer = styled(Box)({
   padding: 0,
})

const OrderReviewTitle = styled(Typography)({
   fontSize: '20px',
   fontWeight: 700,
   color: '#333',
   marginBottom: '20px',
   textAlign: 'left',
})

const ReviewSection = styled(Box)({
   backgroundColor: '#fff',
   borderRadius: '8px',
   padding: '20px',
   boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
   marginBottom: '20px',
})

const ReviewHeader = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '10px',
})

const ReviewLabel = styled(Typography)({
   fontWeight: 600,
   color: '#333',
})

const ChangeLink = styled(Typography)({
   color: '#2196f3',
   textDecoration: 'none',
   fontSize: '14px',
   cursor: 'pointer',
})

const ReviewValue = styled(Typography)({
   fontSize: '14px',
   color: '#666',
})

const FinalButton = styled(Button)({
   backgroundColor: '#4caf50',
   color: 'white',
   padding: '12px 30px',
   border: 'none',
   borderRadius: '6px',
   fontSize: '16px',
   fontWeight: 600,
   cursor: 'pointer',
   width: '100%',
   boxShadow: '0 2px 5px rgba(76,175,80,0.3)',
   textTransform: 'uppercase',
   '&:hover': {
      backgroundColor: '#43a047',
   },
})

const FinalBackButton = styled(Button)({
   backgroundColor: '#fff',
   color: '#CB11AB',
   padding: '10px 20px',
   border: '1px solid #CB11AB',
   borderRadius: '6px',
   fontSize: '14px',
   fontWeight: 500,
   cursor: 'pointer',
   width: '100%',
   marginTop: '10px',
   boxShadow: '0 2px 5px rgba(233,30,99,0.1)',
})

const PaymentForm = ({
   currentStep,
   deliveryType,
   paymentMethod,
   formData,
   onFormSubmit,
   onDeliveryChange,
   onPaymentMethodChange,
   onBack,
   onFinalSubmit,
}) => {
   const [localFormData, setLocalFormData] = useState({
      ...formData,
      cardType: 'visa',
   })
   const [errors, setErrors] = useState({})

   const validateForm = () => {
      const newErrors = {}
      if (currentStep === 1) {
         if (!/^[а-яА-Яa-zA-Z\s]{2,}$/.test(localFormData.firstName)) {
            newErrors.firstName = 'Имя керек, минимум 2 ариб'
         }
         if (!/^[а-яА-Яa-zA-Z\s]{2,}$/.test(localFormData.lastName)) {
            newErrors.lastName = 'Фамилия керек, минимум 2 ариб'
         }
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email)) {
            newErrors.email = 'Жарактуу email керек (user@example.com)'
         }
         if (!/^\+996\d{9}$/.test(localFormData.phone)) {
            newErrors.phone =
               'Телефон +996 менен, 9 цифра керек (мисалы, +996555123456)'
         }
         if (deliveryType === 'courier' && !localFormData.address.trim()) {
            newErrors.address = 'Дарек керек'
         }
      }
      if (currentStep === 2 && paymentMethod === 'online') {
         if (!/^\d{16}$/.test(localFormData.cardNumber)) {
            newErrors.cardNumber = 'Карта номери 16 сан болуш керек'
         }
         const [month, year] = localFormData.expiryDate.split('/')
         if (
            !/^(0[1-9]|1[0-2])$/.test(month) ||
            !/^(25|2[6-9]|3[0-5])$/.test(year)
         ) {
            newErrors.expiryDate =
               'MM (01-12) жана YY (25-35) туура болуш керек'
         }
         if (!/^\d{3}$/.test(localFormData.cvv)) {
            newErrors.cvv = 'CVC 3 сан болуш керек'
         }
         if (!/^[а-яА-Яa-zA-Z\s]+$/.test(localFormData.cardHolder)) {
            newErrors.cardHolder =
               'Имя владельца ариб жана боштуктар гана болуш керек'
         }
      }
      return newErrors
   }

   const handleInputChange = (e) => {
      const { name, value } = e.target
      // Карта номерине 16 сандан ашык жазылбашы үчүн
      if (name === 'cardNumber' && value.length > 16) {
         return
      }
      setLocalFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
      setErrors((prev) => ({ ...prev, [name]: '' }))
   }

   const handleCardTypeChange = (e) => {
      setLocalFormData((prev) => ({
         ...prev,
         cardType: e.target.value,
      }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const validationErrors = validateForm()
      if (Object.keys(validationErrors).length === 0) {
         onFormSubmit(localFormData, true)
      } else {
         setErrors(validationErrors)
      }
   }

   if (currentStep === 1) {
      return (
         <StyledContainer>
            <StyledTitle>
               Варианты доставки
            </StyledTitle>
            <DeliveryOptionsContainer>
               <DeliveryOption
                  selected={deliveryType === 'pickup'}
                  onClick={() => onDeliveryChange('pickup')}
               >
                  <OptionHeader>
                     <RadioButton selected={deliveryType === 'pickup'} />
                     <OptionTitle>
                        Самовывоз из магазина
                     </OptionTitle>
                  </OptionHeader>
                  <OptionDescription>
                     Забрать 20 июля, Бесплатно
                  </OptionDescription>
               </DeliveryOption>
               <DeliveryOption
                  selected={deliveryType === 'courier'}
                  onClick={() => onDeliveryChange('courier')}
               >
                  <OptionHeader>
                     <RadioButton selected={deliveryType === 'courier'} />
                     <OptionTitle>
                        Доставка курьером
                     </OptionTitle>
                  </OptionHeader>
                  <OptionDescription>
                     Забрать 20 июля,
                     <br />
                     <span style={{ fontWeight: 700, color: '#222' }}>
                        Бесплатно свыше 10 000 с
                     </span>
                     <br />
                     до 10 000 с — от 200 с
                  </OptionDescription>
               </DeliveryOption>
            </DeliveryOptionsContainer>

            <Divider />

            <StyledSubTitle>
               Личные данные
            </StyledSubTitle>
            <FormContainer onSubmit={handleSubmit}>
               <FormRow>
                  <StyledTextField
                     label="Напишите ваше имя"
                     name="firstName"
                     value={localFormData.firstName}
                     onChange={handleInputChange}
                     placeholder="имя"
                     required
                     fullWidth
                     error={!!errors.firstName}
                     helperText={errors.firstName}
                     variant="outlined"
                  />
                  <StyledTextField
                     label="Напишите вашу Фамилия"
                     name="lastName"
                     value={localFormData.lastName}
                     onChange={handleInputChange}
                     placeholder="фамилия"
                     required
                     fullWidth
                     error={!!errors.lastName}
                     helperText={errors.lastName}
                     variant="outlined"
                  />
               </FormRow>
               <FormRow>
                  <StyledTextField
                     label="Напишите ваш E-mail"
                     type="email"
                     name="email"
                     value={localFormData.email}
                     onChange={handleInputChange}
                     placeholder="email"
                     required
                     fullWidth
                     error={!!errors.email}
                     helperText={errors.email}
                     variant="outlined"
                  />
                  <StyledTextField
                     label="мобильнный телефон"
                     name="phone"
                     value={localFormData.phone}
                     onChange={handleInputChange}
                     placeholder="+996 (___) __ __ __"
                     required
                     fullWidth
                     error={!!errors.phone}
                     helperText={errors.phone}
                     variant="outlined"
                  />
               </FormRow>
               {deliveryType === 'courier' && (
                  <StyledTextField
                     label="Адрес доставки"
                     name="address"
                     value={localFormData.address}
                     onChange={handleInputChange}
                     placeholder="ваш адрес"
                     required
                     fullWidth
                     error={!!errors.address}
                     helperText={errors.address}
                     variant="outlined"
                  />
               )}
               <PrimaryButton
                  type="submit"
                  fullWidth
                  variant="contained"
               >
                  Продолжить
               </PrimaryButton>
               {currentStep > 1 && (
                  <BackButton
                     variant="outlined"
                     onClick={onBack}
                  >
                     Назад
                  </BackButton>
               )}
            </FormContainer>
         </StyledContainer>
      )
   }

   if (currentStep === 2) {
      const paymentOptions = [
        { value: 'online', label: 'Оплата картой онлайн', icons: [Icons.mastercard, Icons.visa, Icons.elcard], description: '' },
        { value: 'pickup', label: 'Картой при получении', icons: [Icons.mastercard, Icons.visa, Icons.elcard], description: 'Предоплата не требуется.' },
        { value: 'cash', label: 'Наличными при получении', icons: [], description: 'Предоплата не требуется.' }
      ];

      return (
         <StyledContainer>
            <StyledTitle>
               Способ оплаты
            </StyledTitle>
            <PaymentOptionsContainer>
               {paymentOptions.map((opt) => (
                  <PaymentOption
                     key={opt.value}
                     selected={paymentMethod === opt.value}
                     onClick={() => onPaymentMethodChange(opt.value)}
                  >
                     <OptionHeader>
                        <PaymentRadioButton selected={paymentMethod === opt.value} />
                        <OptionTitle>
                           {opt.label}
                        </OptionTitle>
                     </OptionHeader>
                     {opt.description && (
                        <OptionDescription>
                           {opt.description}
                        </OptionDescription>
                     )}
                     <PaymentIconsContainer>
                        {opt.icons.map((src) => (
                           <img src={src} alt="" width={32} key={src} />
                        ))}
                     </PaymentIconsContainer>
                  </PaymentOption>
               ))}
            </PaymentOptionsContainer>

            {paymentMethod === 'online' && (
               <CardFormContainer>
                  <CardForm>
                     <CardIconsContainer>
                        <img src={Icons.visa} alt="Visa" width={36} />
                        <img src={Icons.mastercard} alt="MC" width={36} />
                        <img src={Icons.elcard} alt="Elcart" width={36} />
                     </CardIconsContainer>
                     <CardTextField
                        placeholder="Номер карты"
                        variant="standard"
                        fullWidth
                        name="cardNumber"
                        value={localFormData.cardNumber}
                        onChange={handleInputChange}
                        InputProps={{
                           disableUnderline: false,
                        }}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                     />
                     <ExpiryContainer>
                        <ExpiryField
                           placeholder="MM"
                           variant="standard"
                           name="expiryMonth"
                           value={localFormData.expiryDate.split('/')[0] || ''}
                           onChange={(e) => {
                              const value = e.target.value
                              if (/^\d{0,2}$/.test(value)) {
                                 setLocalFormData((prev) => ({
                                    ...prev,
                                    expiryDate:
                                       value +
                                       (prev.expiryDate.split('/')[1]
                                          ? '/' + prev.expiryDate.split('/')[1]
                                          : ''),
                                 }))
                              }
                           }}
                           InputProps={{
                              disableUnderline: false,
                           }}
                        />
                        <Typography>/ </Typography>
                        <ExpiryField
                           placeholder="YY"
                           variant="standard"
                           name="expiryYear"
                           value={localFormData.expiryDate.split('/')[1] || ''}
                           onChange={(e) => {
                              const value = e.target.value
                              if (/^\d{0,2}$/.test(value)) {
                                 setLocalFormData((prev) => ({
                                    ...prev,
                                    expiryDate:
                                       (prev.expiryDate.split('/')[0] || '') +
                                       '/' +
                                       value,
                                 }))
                              }
                           }}
                           InputProps={{
                              disableUnderline: false,
                           }}
                        />
                        <CVCField
                           placeholder="CVC"
                           variant="standard"
                           name="cvv"
                           value={localFormData.cvv}
                           onChange={handleInputChange}
                           InputProps={{
                              disableUnderline: false,
                           }}
                           error={!!errors.cvv}
                           helperText={errors.cvv}
                        />
                     </ExpiryContainer>
                     <CardTextField
                        placeholder="Имя владельца"
                        variant="standard"
                        fullWidth
                        name="cardHolder"
                        value={localFormData.cardHolder}
                        onChange={handleInputChange}
                        InputProps={{
                           disableUnderline: false,
                        }}
                        error={!!errors.cardHolder}
                        helperText={errors.cardHolder}
                     />
                  </CardForm>
                  <SecurityText>
                     Платеж защищен. Данные карты передаются только в
                     зашифрованном виде по протоколу SSL, защищаются и
                     обрабатываются по стандарту безопасности PCI DSS.
                  </SecurityText>
               </CardFormContainer>
            )}

            <SecondaryButton
               fullWidth
               variant="contained"
               onClick={handleSubmit}
            >
               Продолжить
            </SecondaryButton>
            <BackButton
               variant="outlined"
               onClick={onBack}
            >
               Назад
            </BackButton>
         </StyledContainer>
      );
   }

   if (currentStep === 3) {
      return (
         <OrderReviewContainer>
            <OrderReviewTitle>
               Обзор заказа
            </OrderReviewTitle>

            <ReviewSection>
               <ReviewHeader>
                  <ReviewLabel>
                     Доставка
                  </ReviewLabel>
                  <ChangeLink
                     onClick={() => onFormSubmit(localFormData, false, 1)}
                  >
                     Изменить
                  </ChangeLink>
               </ReviewHeader>
               <ReviewValue>
                  {deliveryType === 'pickup'
                     ? 'Самовывоз из магазина'
                     : `г.Бишкек, ${localFormData.address || 'ул. Ахунбаева, д. 14, кв. 15'}`}
               </ReviewValue>
            </ReviewSection>

            <ReviewSection>
               <ReviewHeader>
                  <ReviewLabel>
                     Оплата
                  </ReviewLabel>
                  <ChangeLink
                     onClick={() => onFormSubmit(localFormData, false, 2)}
                  >
                     Изменить
                  </ChangeLink>
               </ReviewHeader>
               <ReviewValue>
                  {paymentMethod === 'online'
                     ? 'Картой онлайн'
                     : paymentMethod === 'pickup'
                       ? 'Картой при получении'
                       : 'Наличными при получении'}
               </ReviewValue>
            </ReviewSection>

            <FinalButton
               variant="contained"
               onClick={onFinalSubmit}
            >
               ОФОРМИТЬ ЗАКАЗ
            </FinalButton>
            <FinalBackButton
               variant="outlined"
               onClick={onBack}
            >
               Назад
            </FinalBackButton>
         </OrderReviewContainer>
      )
   }

   return null
}

export default PaymentForm