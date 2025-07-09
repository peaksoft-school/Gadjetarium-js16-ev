import { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

const CartHoverTrigger = ({ icon, children }) => {
   const [hovered, setHovered] = useState(false)

   return (
      <Wrapper
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <IconWrapper>
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
   width: 28px;
   height: 28px;

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
`
