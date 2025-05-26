import { useState } from 'react'
import {
   Box,
   Typography,
   Slider,
   Checkbox,
   FormControlLabel,
   FormGroup,
   Accordion,
   AccordionSummary,
   AccordionDetails,
   TextField,
   Button,
} from '@mui/material'
import { styled } from '@mui/system'
import { Icons } from '../assets/icons'

const FilterPanel = () => {
   const [price, setPrice] = useState([500, 250000])
   const [category, setCategory] = useState([])
   const [colors, setColors] = useState([])
   const [memory, setMemory] = useState([])
   const [ram, setRam] = useState([])

   const handlePriceChange = (_, newValue) => {
      setPrice(newValue)
   }

   const handleCheckboxChange = (value, group, setGroup) => {
      if (group.includes(value)) {
         setGroup(group.filter((v) => v !== value))
      } else {
         setGroup([...group, value])
      }
   }

   const resetFilters = () => {
      setPrice([500, 250000])
      setCategory([])
      setColors([])
      setMemory([])
      setRam([])
   }

   const renderCheckboxGroup = (options, selected, setSelected) => (
      <FormGroup>
         {options.map((option) => (
            <FormControlLabel
               key={option}
               control={
                  <Checkbox
                     checked={selected.includes(option)}
                     onChange={() =>
                        handleCheckboxChange(option, selected, setSelected)
                     }
                  />
               }
               label={option}
            />
         ))}
      </FormGroup>
   )

   return (
      <FilterWrapper>
         <ResetLink onClick={resetFilters}>Сбросить все фильтры</ResetLink>

         <Section>
            <Accordion defaultExpanded>
               <AccordionSummary expandIcon={<img src={Icons.arrowDown} />}>
                  <FilterTitle>Категория</FilterTitle>
               </AccordionSummary>
               <AccordionDetails>
                  {renderCheckboxGroup(
                     ['Samsung', 'Apple', 'Huawei', 'Honor', 'Xiaomi'],
                     category,
                     setCategory
                  )}
               </AccordionDetails>
            </Accordion>
         </Section>

         <Section>
            <Accordion defaultExpanded>
               <AccordionSummary expandIcon={<img src={Icons.arrowDown} />}>
                  <FilterTitle>Стоимость</FilterTitle>
               </AccordionSummary>
               <AccordionDetails>
                  <Box display="flex" gap={1} mb={2}>
                     <TextField
                        size="small"
                        value={price[0]}
                        onChange={(e) =>
                           setPrice([+e.target.value || 0, price[1]])
                        }
                        inputProps={{ type: 'number' }}
                     />
                     <TextField
                        size="small"
                        value={price[1]}
                        onChange={(e) =>
                           setPrice([price[0], +e.target.value || 0])
                        }
                        inputProps={{ type: 'number' }}
                     />
                  </Box>
                  <Slider
                     value={price}
                     min={500}
                     max={250000}
                     step={500}
                     onChange={handlePriceChange}
                     valueLabelDisplay="auto"
                     sx={{ color: '#a000c0' }}
                  />
               </AccordionDetails>
            </Accordion>
         </Section>

         <Section>
            <Accordion defaultExpanded>
               <AccordionSummary expandIcon={<img src={Icons.arrowDown} />}>
                  <FilterTitle>Цвет</FilterTitle>
               </AccordionSummary>
               <AccordionDetails>
                  {renderCheckboxGroup(
                     [
                        'Black',
                        'Blue',
                        'Gold',
                        'Graphite',
                        'Green',
                        'Rose Gold',
                        'Red',
                        'Silver',
                        'White',
                     ],
                     colors,
                     setColors
                  )}
               </AccordionDetails>
            </Accordion>
         </Section>

         <Section>
            <Accordion defaultExpanded>
               <AccordionSummary expandIcon={<img src={Icons.arrowDown} />}>
                  <FilterTitle>Оперативная память (GB)</FilterTitle>
               </AccordionSummary>
               <AccordionDetails>
                  {renderCheckboxGroup(
                     ['32', '64', '128', '512', '1024'],
                     ram,
                     setRam
                  )}
               </AccordionDetails>
            </Accordion>
         </Section>

         <Section>
            <Accordion defaultExpanded>
               <AccordionSummary expandIcon={<img src={Icons.arrowDown} />}>
                  <FilterTitle>Объем памяти (GB)</FilterTitle>
               </AccordionSummary>
               <AccordionDetails>
                  {renderCheckboxGroup(
                     ['16', '32', '64', '128'],
                     memory,
                     setMemory
                  )}
               </AccordionDetails>
            </Accordion>
         </Section>
      </FilterWrapper>
   )
}

export default FilterPanel

const Section = styled(Box)({
   marginBottom: '20px',
})

const FilterTitle = styled(Typography)({
   fontWeight: 600,
   marginBottom: '10px',
   color: '#a000c0',
})

const FilterWrapper = styled(Box)({
   width: 280,
   padding: 20,
   borderRadius: 8,
   border: 'none',
})

const ResetLink = styled(Button)({
   padding: 0,
   textTransform: 'none',
   color: '#1976d2',
   marginBottom: '10px',
   background: 'none',
   boxShadow: 'none',

   '&:hover': {
      background: 'none',
      textDecoration: 'underline',
   },
})
