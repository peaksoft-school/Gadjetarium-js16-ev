import * as yup from 'yup'

export const forgotPasswordSchema = yup.object().shape({
   email: yup.string().required('Email обязателен').email('Некорректный email'),
})

export const resetPasswordSchema = yup.object().shape({
   password: yup
      .string()
      .required('Пароль обязателен')
      .min(8, 'Пароль должен быть не менее 8 символов'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
})

export const registrationSchema = yup.object().shape({
   firstName: yup.string().required('Имя обязательно'),
   lastName: yup.string().required('Фамилия обязательна'),
   email: yup.string().required('Email обязателен').email('Некорректный email'),
   password: yup
      .string()
      .required('Пароль обязателен')
      .min(8, 'Пароль должен быть не менее 8 символов'),
   confirmPassword: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
})
