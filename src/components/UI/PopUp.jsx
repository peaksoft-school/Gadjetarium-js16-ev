import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import styled from 'styled-components'

const PopUp = () => {
   const [selected, setSelected] = useState(null)
   const [subSelected, setSubSelected] = useState(null)

   const handleSelect = (item) => {
      setSelected(item === selected ? null : item)
      setSubSelected(null)
   }

   const handleSubSelect = (subItem) => {
      setSubSelected(subItem)
   }

   return (
      <Box display="flex" position="relative">
         <MenuWrapper>
            {Object.keys(submenus).map((item) => (
               <MenuItem
                  key={item}
                  active={selected === item}
                  onClick={() => handleSelect(item)}
               >
                  {item}
               </MenuItem>
            ))}
         </MenuWrapper>

         {selected && (
            <Box ml={2}>
               <MenuWrapper>
                  {submenus[selected].map((subItem) => (
                     <MenuItem
                        key={subItem}
                        active={subSelected === subItem}
                        onClick={() => handleSubSelect(subItem)}
                     >
                        {subItem}
                     </MenuItem>
                  ))}
               </MenuWrapper>
            </Box>
         )}
      </Box>
   )
}

export default PopUp

const MenuWrapper = styled(Box)`
   background: white;
   border-radius: 4px;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
   padding: 16px;
   width: 300px;
`

const MenuItem = styled(Typography).withConfig({
   shouldForwardProp: (prop) => prop !== 'active',
})`
   margin-bottom: 12px;
   color: ${({ active }) => (active ? '#E10098' : '#333')};
   cursor: pointer;
`

const submenus = {
   'По акции': ['Все акции', 'До 50%', 'Свыше 50%'],
   Новинки: ['2024', '2023', '2022'],
   Рекомендуемые: ['Популярные', 'С высокой оценкой'],
   'По увеличению цены': ['От дешевых к дорогим', 'Фильтры'],
   'По уменьшению цены': ['От дорогих к дешевым', 'Скидки'],
}
