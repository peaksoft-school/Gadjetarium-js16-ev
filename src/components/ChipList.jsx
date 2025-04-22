import { useState } from 'react'
import { Box, ButtonBase, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icons } from '../assets/icons'

const options = ['Apple', 'Graphite', 'Peach', 'Mango']

const ChipList = () => {
   const [chips, setChips] = useState([])

   const addChip = (label) => {
      if (!chips.includes(label)) {
         setChips((prev) => [...prev, label])
      }
   }

   const removeChip = (label) => {
      setChips((prev) => prev.filter((chip) => chip !== label))
   }

   return (
      <Wrapper>
         <Row>
            {options.map((option) => (
               <OptionButton
                  key={option}
                  onClick={() => addChip(option)}
                  disabled={chips.includes(option)}
               >
                  {option}
               </OptionButton>
            ))}
         </Row>

         <Row>
            {chips.map((chip) => (
               <Chip key={chip} disableRipple>
                  {chip}
                  <RemoveButton onClick={() => removeChip(chip)}>
                     <img src={Icons.cancel} alt="" />
                  </RemoveButton>
               </Chip>
            ))}
         </Row>
      </Wrapper>
   )
}

export default ChipList

const Chip = styled(ButtonBase)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   backgroundColor: '#e5e5e5',
   border: '2px solid #ccc',
   borderRadius: '12px',
   padding: '12px 16px',
   fontSize: '20px',
   fontWeight: 400,
   color: '#1a1a1a',
   cursor: 'default',
   gap: '12px',
   '&:hover': {
      backgroundColor: '#e0e0e0',
   },
}))

const RemoveButton = styled(IconButton)(({ theme }) => ({
   padding: 0,
   color: '#1a1a1a',
   '&:hover': {
      color: '#000',
   },
}))

const OptionButton = styled(ButtonBase)(({ theme }) => ({
   border: '1px solid #ccc',
   borderRadius: '999px',
   padding: '8px 16px',
   fontSize: '16px',
   backgroundColor: '#fff',
   textTransform: 'none',
   fontWeight: 400,
   '&:hover': {
      backgroundColor: '#f2f2f2',
   },
   '&:disabled': {
      backgroundColor: '#eee',
      color: '#999',
      cursor: 'not-allowed',
   },
}))

const Wrapper = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}))

const Row = styled(Box)(() => ({
   display: 'flex',
   gap: '12px',
   flexWrap: 'wrap',
}))
