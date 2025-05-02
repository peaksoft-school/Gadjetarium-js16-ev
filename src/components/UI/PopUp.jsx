import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { SUBMENUS } from '../../utils/constants/index'

export default function PopUp() {
   const [selected, setSelected] = useState(null)
   const [subSelected, setSubSelected] = useState(null)

   const handleSelect = (item) => setSelected(item === selected ? null : item)
   const handleSubSelect = (subItem) => setSubSelected(subItem)

   return (
      <Wrapper>
         <MenuWrapper>
            {Object.keys(SUBMENUS).map((item) => (
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
            <SubWrapper>
               <MenuWrapper>
                  {SUBMENUS[selected].map((subItem) => (
                     <MenuItem
                        key={subItem}
                        active={subSelected === subItem}
                        onClick={() => handleSubSelect(subItem)}
                     >
                        {subItem}
                     </MenuItem>
                  ))}
               </MenuWrapper>
            </SubWrapper>
         )}
      </Wrapper>
   )
}


const Wrapper = styled(Box)({
   display: 'flex',
   position: 'relative',
})

const SubWrapper = styled(Box)({
   marginLeft: '16px',
})

const MenuWrapper = styled(Box)({
   backgroundColor: '#ffffff',
   borderRadius: '4px',
   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
   padding: '16px',
   width: '300px',
})

const MenuItem = styled(Typography, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   marginBottom: '12px',
   color: active ? '#E10098' : '#333333',
   cursor: 'pointer',
   fontWeight: active ? 600 : 400,
   transition: 'color 0.2s ease',
   '&:hover': {
      color: '#E10098',
   },
}))
