import { Icons } from '../../assets/icons'
import images1 from '../../assets/images/images1.png'
import images2 from '../../assets/images/images2.png'
import images3 from '../../assets/images/images3.png'
import images4 from '../../assets/images/images4.png'
import images5 from '../../assets/images/images5.png'
import images6 from '../../assets/images/images6.png'

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
      id: 'panel1',
      question: 'Как оформить заказ на сайте?',
      answer:
         'Вы можете оформить заказ, выбрав нужные товары и перейдя в корзину. Далее следуйте инструкциям по оформлению доставки и оплаты.',
   },
   {
      id: 'panel2',
      question: 'Какие способы доставки доступны?',
      answer: [
         'Мы предлагаем курьерскую доставку, самовывоз и доставку через почтовые службы и еще доставка бесплатно.',
      ],
   },
   {
      id: 'panel3',
      question: 'Можно ли вернуть товар после покупки?',
      answer:
         'Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в употреблении и сохранена упаковка.',
   },
   {
      id: 'panel4',
      question: 'Как получить консультацию перед покупкой?',
      answer:
         'Вы можете связаться с нашим менеджером по телефону или через онлайн-чат на сайте. Мы с радостью ответим на все ваши вопросы.',
   },
   {
      id: 'panel5',
      question: 'Предоставляете ли вы гарантию на товары?',
      answer:
         'Да, на все товары предоставляется гарантия сроком от 6 до 24 месяцев, в зависимости от категории продукта.',
   },
]

const SUBMENUS = {
   'По акции': ['Все акции', 'До 50%', 'Свыше 50%'],
   Новинки: ['2024', '2023', '2022', `2021`, `2020`],
   Рекомендуемые: ['Популярные', 'С высокой оценкой'],
   'По увеличению цены': ['От дешевых к дорогим', 'Фильтры'],
   'По уменьшению цены': ['От дорогих к дешевым', 'Скидки'],
}

export const Telefon = [
   {
      id: 2,
      image: images2,
   },
   {
      id: 1,
      image: images1,
   },
   {
      id: 3,
      image: images3,
   },
   {
      id: 4,
      image: images4,
   },
   {
      id: 5,
      image: images5,
   },
   {
      id: 6,
      image: images6,
   },
]

export { SUBMENUS, QUESTIONS, POSSIBILITIES }
