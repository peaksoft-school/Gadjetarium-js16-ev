import { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

const CartHoverTrigger = ({ icon, children, onClick }) => {
   const [hovered, setHovered] = useState(false)

   return (
      <Wrapper
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <IconWrapper onClick={onClick}>
            <img src={icon} alt="cart icon" />
         </IconWrapper>

         {hovered && <DropdownWrapper>{children}</DropdownWrapper>}
      </Wrapper>
   )
}

export default CartHoverTrigger

const Wrapper = styled(Box)`
   position: relative;
   display: inline-block;
   cursor: pointer;
`

const IconWrapper = styled(Box)`
   width: 18px;
   height: 18px;

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }
`

const DropdownWrapper = styled(Box)`
   position: absolute;
   top: 40px;
   right: 0;
   z-index: 100;
   background-color: white;
   border-radius: 8px;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   padding: 12px;
   min-width: 180px;
`
