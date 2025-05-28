import gatget from '../../assets/images/gatget.png'
import PeopleTc from '../../assets/images/PeopleTc.png'
import GatgetStore from '../../assets/images/GatgetStore.png'

export const products = [
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

export { SUBMENUS }


export const REVIEW_STATUSES = {
  ALL: 'all',
  UNREAD: 'unread',
  ANSWERED: 'answered',
};

export const TAB_LABELS = {
  [REVIEW_STATUSES.ALL]: 'Все отзывы',
  [REVIEW_STATUSES.UNREAD]: 'Нeoтветченные',
  [REVIEW_STATUSES.ANSWERED]: 'Отвеченные',
};

// Mock stats data (can be replaced with backend data)
export const MOCK_STATS = {
  totalReviews: 1775,
  totalEarnings: 7556,
  totalOrdersThisMonth: 34562,
  dailyStats: {
    orders: 12,
    items: 56,
  },
  periods: {
    current: { amount: 120000, label: 'Текущий период' },
    previous: { amount: 100500, label: 'Предыдущий период' },
  },
};