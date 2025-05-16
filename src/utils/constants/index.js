import { Icons } from '../../assets/icons'
import { Images } from '../../assets/images'

const POSSIBILITIES = [
   {
      icon: Icons.diary,
      text: 'Официальный',
      text2: 'дистрибьютер',
   },
   {
      icon: Icons.repair,
      text: 'Гарантийное ',
      text2: 'обслуживание',
   },
   {
      icon: Icons.cardPay,
      text: 'Оплата любым',
      text2: 'удобным способом',
   },
   {
      icon: Icons.handshake,
      text: 'Оптовые',
      text2: 'продажи',
   },
   {
      icon: Icons.delivery,
      text: 'Доставка в любой',
      text2: 'регион Кыргызстана',
   },
]

const QUESTIONS = [
   {
      id: 1,
      image: `${GatgetStore}`,
   },
   {
      id: 2,
      image: `${gatget}`,
   },
   {
      id: 3,
      image: `${PeopleTc}`,
   },
]

const SUBMENUS = {
   'По акции': ['Все акции', 'До 50%', 'Свыше 50%'],
   Новинки: ['2024', '2023', '2022', `2021`, `2020`],
   Рекомендуемые: ['Популярные', 'С высокой оценкой'],
   'По увеличению цены': ['От дешевых к дорогим', 'Фильтры'],
   'По уменьшению цены': ['От дорогих к дешевым', 'Скидки'],
}

const PHONE_SLIDER = [
   {
      id: 2,
      image: Images.firstPhoneImage,
   },

   {
      id: 1,
      image: Images.secondPhoneImage,
   },

   {
      id: 3,
      image: Images.thirdPhoneImage,
   },

   {
      id: 4,
      image: Images.fourthPhoneImage,
   },

   {
      id: 5,
      image: Images.fifthPhoneImage,
   },

   {
      id: 6,
      image: Images.sixthPhoneImage,
   },
]

export { SUBMENUS, QUESTIONS, POSSIBILITIES, PHONE_SLIDER }
