import { Outlet } from 'react-router'
import ProductActionsHeader from '../../components/Products'

const Home = () => {
   const product = {
      name: 'Galaxy S21 5G',
      available: 105,
      article: '030696',
      colors: ['#000', '#fff', '#ce9df5', '#e56161', '#c045dd', '#488bf4'],
      price: '54 190',
      oldPrice: '57 190',
      discount: '-10%',
      images: [
         '/images/phone1.png',
         '/images/phone2.png',
         '/images/phone3.png',
      ],
      specs: [
         { label: 'Экран', value: '53" (2340×1080) IPS' },
         { label: 'Цвет', value: 'Black' },
         { label: 'Дата выпуска', value: 'Март 2022' },
         { label: 'ОС', value: 'Android 12' },
         { label: 'Память', value: '128GB' },
         { label: 'SIM-карты', value: '2' },
         { label: 'Гарантия', value: '12 мес' },
         { label: 'Процессор', value: 'Exynos 1280 (5 nm)' },
         { label: 'Вес', value: '177 г' },
      ],
   }

   return (
      <div>
         {/* <ProductActionsHeader/> */}
         <ProductCard product={product}/>

         <Outlet />
      </div>
   )
}

export default Home
