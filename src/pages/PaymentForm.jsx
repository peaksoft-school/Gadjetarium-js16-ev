import { useState } from 'react'
import {
   Box,
   Typography,
   Button,
   TextField,
   Checkbox,
   FormControlLabel,
} from '@mui/material'
import { Icons } from '../assets/icons'

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
         <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 22, mb: 3 }}>
               Варианты доставки
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
               <Box
                  onClick={() => onDeliveryChange('pickup')}
                  sx={{
                     flex: 1,
                     border:
                        deliveryType === 'pickup'
                           ? '2px solid #2ecc40'
                           : '1px solid #e0e0e0',
                     borderRadius: 2,
                     background: '#fff',
                     p: 2.5,
                     cursor: 'pointer',
                     minHeight: 90,
                     boxShadow:
                        deliveryType === 'pickup'
                           ? '0 2px 8px rgba(46,204,64,0.08)'
                           : 'none',
                     transition: 'border 0.2s',
                  }}
               >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                     <Box
                        sx={{
                           width: 20,
                           height: 20,
                           borderRadius: '50%',
                           border:
                              deliveryType === 'pickup'
                                 ? '7px solid #2ecc40'
                                 : '2px solid #bdbdbd',
                           background: '#fff',
                           mr: 1.5,
                           transition: 'border 0.2s',
                        }}
                     />
                     <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        Самовывоз из магазина
                     </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 13, color: '#888', mb: 1 }}>
                     Забрать 20 июля, Бесплатно
                  </Typography>
               </Box>
               <Box
                  onClick={() => onDeliveryChange('courier')}
                  sx={{
                     flex: 1,
                     border:
                        deliveryType === 'courier'
                           ? '2px solid #2ecc40'
                           : '1px solid #e0e0e0',
                     borderRadius: 2,
                     background: '#fff',
                     p: 2.5,
                     cursor: 'pointer',
                     minHeight: 90,
                     boxShadow:
                        deliveryType === 'courier'
                           ? '0 2px 8px rgba(46,204,64,0.08)'
                           : 'none',
                     transition: 'border 0.2s',
                  }}
               >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                     <Box
                        sx={{
                           width: 20,
                           height: 20,
                           borderRadius: '50%',
                           border:
                              deliveryType === 'courier'
                                 ? '7px solid #2ecc40'
                                 : '2px solid #bdbdbd',
                           background: '#fff',
                           mr: 1.5,
                           transition: 'border 0.2s',
                        }}
                     />
                     <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        Доставка курьером
                     </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 13, color: '#888', mb: 1 }}>
                     Забрать 20 июля,
                     <br />
                     <span style={{ fontWeight: 700, color: '#222' }}>
                        Бесплатно свыше 10 000 с
                     </span>
                     <br />
                     до 10 000 с — от 200 с
                  </Typography>
               </Box>
            </Box>

            <Box sx={{ borderTop: '1px solid #e0e0e0', mt: 4, mb: 3 }} />

            <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 2 }}>
               Личные данные
            </Typography>
            <form onSubmit={handleSubmit}>
               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                     label=" Напишите ваше имя "
                     name="firstName"
                     value={localFormData.firstName}
                     onChange={handleInputChange}
                     placeholder="имя"
                     required
                     fullWidth
                     error={!!errors.firstName}
                     helperText={errors.firstName}
                     variant="outlined"
                     sx={{
                        background: '#ffff',
                        borderRadius: '8px',
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
                        mb: 2,
                     }}
                     InputProps={{
                        style: {
                           fontSize: 16,
                           background: '#fff',
                           borderRadius: 8,
                        },
                     }}
                  />
                  <TextField
                     label="Напишите вашу Фамилия "
                     name="lastName"
                     value={localFormData.lastName}
                     onChange={handleInputChange}
                     placeholder="фамилия"
                     required
                     fullWidth
                     error={!!errors.lastName}
                     helperText={errors.lastName}
                     variant="outlined"
                     sx={{
                        background: '#fff',
                        borderRadius: '8px',
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
                        mb: 2,
                     }}
                     InputProps={{
                        style: {
                           fontSize: 16,
                           background: '#fff',
                           borderRadius: 8,
                        },
                     }}
                  />
               </Box>
               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                     label=" Напишите ваш E-mail "
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
                     sx={{
                        background: '#fff',
                        borderRadius: '8px',
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
                        mb: 2,
                     }}
                     InputProps={{
                        style: {
                           fontSize: 16,
                           background: '#fff',
                           borderRadius: 8,
                        },
                     }}
                  />
                  <TextField
                     label=" мобильнный телефон "
                     name="phone"
                     value={localFormData.phone}
                     onChange={handleInputChange}
                     placeholder="+996 (___) __ __ __"
                     required
                     fullWidth
                     error={!!errors.phone}
                     helperText={errors.phone}
                     variant="outlined"
                     sx={{
                        background: '#fff',
                        borderRadius: '8px',
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
                        mb: 2,
                     }}
                     InputProps={{
                        style: {
                           fontSize: 16,
                           background: '#fff',
                           borderRadius: 8,
                        },
                     }}
                  />
               </Box>
               {deliveryType === 'courier' && (
                  <TextField
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
                     sx={{
                        background: '#fff',
                        borderRadius: '8px',
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
                        mb: 2,
                     }}
                     InputProps={{
                        style: {
                           fontSize: 16,
                           background: '#fff',
                           borderRadius: 8,
                        },
                     }}
                  />
               )}
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                     background: '#CB11AB',
                     color: '#fff',
                     fontWeight: 700,
                     fontSize: 18,
                     mt: 3,
                     py: 1.5,
                     borderRadius: 2,
                     boxShadow: 'none',
                     '&:hover': { background: '#CB11AB' },
                  }}
               >
                  Продолжить
               </Button>
               {currentStep > 1 && (
                  <Button
                     variant="outlined"
                     onClick={onBack}
                     sx={{
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
                     }}
                  >
                     Назад
                  </Button>
               )}
            </form>
         </Box>
      )
   }

   if (currentStep === 2) {
      const paymentOptions = [
        { value: 'online', label: 'Оплата картой онлайн', icons: [Icons.mastercard, Icons.visa, Icons.elcard], description: '' },
        { value: 'pickup', label: 'Картой при получении', icons: [Icons.mastercard, Icons.visa, Icons.elcard], description: 'Предоплата не требуется.' },
        { value: 'cash', label: 'Наличными при получении', icons: [], description: 'Предоплата не требуется.' }
      ];
      return (
         <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 22, mb: 3 }}>
               Способ оплаты
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
               {paymentOptions.map((opt) => (
                  <Box
                     key={opt.value}
                     onClick={() => onPaymentMethodChange(opt.value)}
                     sx={{
                        flex: 1,
                        border:
                           paymentMethod === opt.value
                              ? '2px solid #2ecc40'
                              : '1px solid #e0e0e0',
                        borderRadius: 2,
                        background: '#fff',
                        p: 2.5,
                        cursor: 'pointer',
                        minHeight: 90,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow:
                           paymentMethod === opt.value
                              ? '0 2px 8px rgba(46,204,64,0.08)'
                              : 'none',
                        transition: 'border 0.2s',
                     }}
                  >
                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box
                           sx={{
                              width: 22,
                              height: 20,
                              borderRadius: '50%',
                              border:
                                 paymentMethod === opt.value
                                    ? '6px solid #2ecc40'
                                    : '2px solid #bdbdbd',
                              background: '#fff',
                              mr: 1,
                              transition: 'border 0.2s',
                           }}
                        />
                        <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                           {opt.label}
                        </Typography>
                     </Box>
                     {opt.description && (
                        <Typography sx={{ fontSize: 13, color: '#888', mb: 1 }}>
                           {opt.description}
                        </Typography>
                     )}
                     <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {opt.icons.map((src) => (
                           <img src={src} alt="" width={32} key={src} />
                        ))}
                     </Box>
                  </Box>
               ))}
            </Box>

            {paymentMethod === 'online' && (
               <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box
                     sx={{
                        background: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                        p: 3,
                        minWidth: 380,
                        flex: '0 0 380px',
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                           gap: 1,
                           mb: 2,
                        }}
                     >
                        <img src={Icons.visa} alt="Visa" width={36} />
                        <img src={Icons.mastercard} alt="MC" width={36} />
                        <img src={Icons.elcard} alt="Elcart" width={36} />
                     </Box>
                     <TextField
                        placeholder="Номер карты"
                        variant="standard"
                        fullWidth
                        name="cardNumber"
                        value={localFormData.cardNumber}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                        InputProps={{
                           disableUnderline: false,
                           style: { fontSize: 18 },
                        }}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                     />
                     <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
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
                              style: { fontSize: 18 },
                           }}
                           sx={{ width: 60 }}
                        />
                        <Typography sx={{ mt: 2 }}> / </Typography>
                        <TextField
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
                              style: { fontSize: 18 },
                           }}
                           sx={{ width: 60 }}
                        />
                        <TextField
                           placeholder="CVC"
                           variant="standard"
                           name="cvv"
                           value={localFormData.cvv}
                           onChange={handleInputChange}
                           InputProps={{
                              disableUnderline: false,
                              style: { fontSize: 18 },
                           }}
                           sx={{ width: 80, ml: 2 }}
                           error={!!errors.cvv}
                           helperText={errors.cvv}
                        />
                     </Box>
                     <TextField
                        placeholder="Имя владельца"
                        variant="standard"
                        fullWidth
                        name="cardHolder"
                        value={localFormData.cardHolder}
                        onChange={handleInputChange}
                        InputProps={{
                           disableUnderline: false,
                           style: { fontSize: 18 },
                        }}
                        error={!!errors.cardHolder}
                        helperText={errors.cardHolder}
                     />
                  </Box>
                  <Typography
                     sx={{
                        color: '#444',
                        fontSize: 14,
                        maxWidth: 300,
                        mt: 1.5,
                     }}
                  >
                     Платеж защищен. Данные карты передаются только в
                     зашифрованном виде по протоколу SSL, защищаются и
                     обрабатываются по стандарту безопасности PCI DSS.
                  </Typography>
               </Box>
            )}

          <Button
            fullWidth
            variant="contained"
            sx={{
              background: '#e91e63',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              mt: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { background: '#d81b60' }
            }}
            onClick={handleSubmit}
          >
            Продолжить
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
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
            }}
          >
            Назад
          </Button>
        </Box>
      );
   }

   if (currentStep === 3) {
      return (
         <Box>
            <Typography
               sx={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#333',
                  marginBottom: '20px',
                  textAlign: 'left',
               }}
            >
               Обзор заказа
            </Typography>
            <Typography
               sx={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#e91e63',
                  marginBottom: '30px',
                  textAlign: 'center',
               }}
            >
               Итого: 250 000 с
            </Typography>

            <Box
               sx={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  marginBottom: '20px',
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     marginBottom: '10px',
                  }}
               >
                  <Typography sx={{ fontWeight: 600, color: '#333' }}>
                     Доставка
                  </Typography>
                  <Typography
                     component="a"
                     href="#"
                     sx={{
                        color: '#2196f3',
                        textDecoration: 'none',
                        fontSize: '14px',
                     }}
                     onClick={() => onFormSubmit(localFormData, false, 1)}
                  >
                     Изменить
                  </Typography>
               </Box>
               <Typography sx={{ fontSize: '14px', color: '#666' }}>
                  {deliveryType === 'pickup'
                     ? 'Самовывоз из магазина'
                     : `г.Бишкек, ${localFormData.address || 'ул. Ахунбаева, д. 14, кв. 15'}`}
               </Typography>
            </Box>

            <Box
               sx={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  marginBottom: '20px',
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     marginBottom: '10px',
                  }}
               >
                  <Typography sx={{ fontWeight: 600, color: '#333' }}>
                     Оплата
                  </Typography>
                  <Typography
                     component="a"
                     href="#"
                     sx={{
                        color: '#2196f3',
                        textDecoration: 'none',
                        fontSize: '14px',
                     }}
                     onClick={() => onFormSubmit(localFormData, false, 2)}
                  >
                     Изменить
                  </Typography>
               </Box>
               <Typography sx={{ fontSize: '14px', color: '#666' }}>
                  {paymentMethod === 'online'
                     ? 'Картой онлайн'
                     : paymentMethod === 'pickup'
                       ? 'Картой при получении'
                       : 'Наличными при получении'}
               </Typography>
            </Box>

            <Button
               variant="contained"
               onClick={onFinalSubmit}
               sx={{
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
                  '&:hover': { backgroundColor: '#43a047' },
               }}
            >
               ОФОРМИТЬ ЗАКАЗ
            </Button>
            <Button
               variant="outlined"
               onClick={onBack}
               sx={{
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
               }}
            >
               Назад
            </Button>
         </Box>
      )
   }

   return null
}

export default PaymentForm
