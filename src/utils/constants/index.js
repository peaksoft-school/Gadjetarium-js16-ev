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
