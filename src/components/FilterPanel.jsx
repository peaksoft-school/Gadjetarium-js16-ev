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
   Divider,
} from '@mui/material'
import { styled } from '@mui/system'
import { Icons } from '../assets/icons'
import { catalogProductData } from '../utils/constants'

const FilterPanel = () => {
   const [price, setPrice] = useState([500, 250000])
   const [selectedFilters, setSelectedFilters] = useState({})
   const [expandedCategories, setExpandedCategories] = useState(
      catalogProductData.reduce((acc, item) => {
         acc[item.id] = true
         return acc
      }, {})
   )

   const handlePriceChange = (_, newValue) => {
      setPrice(newValue)
   }

   const handleCheckboxChange = (key, value) => {
      setSelectedFilters((prev) => {
         const values = prev[key] || []
         return {
            ...prev,
            [key]: values.includes(value)
               ? values.filter((v) => v !== value)
               : [...values, value],
         }
      })
   }

   const resetFilters = () => {
      setPrice([500, 250000])
      setSelectedFilters({})
   }

   const toggleCategory = (id) => {
      setExpandedCategories((prev) => ({
         ...prev,
         [id]: !prev[id],
      }))
   }

   const renderCheckboxGroup = (options, key) => (
      <FormGroup>
         {options.map((item) => {
            const label = item.categoryName || item.title
            return (
               <FormControlLabel
                  key={item.id}
                  control={
                     <Checkbox
                        checked={selectedFilters[key]?.includes(label) || false}
                        onChange={() => handleCheckboxChange(key, label)}
                        size="small"
                        sx={{ padding: '4px 8px' }}
                     />
                  }
                  label={<Typography variant="body2">{label}</Typography>}
                  sx={{ margin: 0 }}
               />
            )
         })}
      </FormGroup>
   )

   return (
      <FilterWrapper>
         <ResetLink onClick={resetFilters}>Сбросить все фильтры</ResetLink>

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

         <Divider sx={{ my: 2 }} />

         {catalogProductData.map((product) => (
            <Box key={product.id}>
               <CategoryHeader onClick={() => toggleCategory(product.id)}>
                  <Typography fontWeight="bold" color="#a000c0">
                     {product.title}
                  </Typography>
                  <img
                     src={Icons.arrowDown}
                     style={{
                        transform: expandedCategories[product.id]
                           ? 'rotate(180deg)'
                           : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                     }}
                  />
               </CategoryHeader>

               {expandedCategories[product.id] && (
                  <>
                     <Section>
                        <Accordion defaultExpanded>
                           <AccordionSummary
                              expandIcon={<img src={Icons.arrowDown} />}
                           >
                              <FilterTitle>Бренды</FilterTitle>
                           </AccordionSummary>
                           <AccordionDetails>
                              {renderCheckboxGroup(
                                 product.category.subCategory,
                                 `${product.id}-brands`
                              )}
                           </AccordionDetails>
                        </Accordion>
                     </Section>

                     {product.categories.map((characteristic) => (
                        <Section key={characteristic.id}>
                           <Accordion defaultExpanded>
                              <AccordionSummary
                                 expandIcon={<img src={Icons.arrowDown} />}
                              >
                                 <FilterTitle>
                                    {characteristic.type}
                                 </FilterTitle>
                              </AccordionSummary>
                              <AccordionDetails>
                                 {renderCheckboxGroup(
                                    characteristic.subCategory,
                                    `${product.id}-${characteristic.filterCharacteristicsKey}`
                                 )}
                              </AccordionDetails>
                           </Accordion>
                        </Section>
                     ))}
                  </>
               )}
               <Divider sx={{ my: 2 }} />
            </Box>
         ))}
      </FilterWrapper>
   )
}

export default FilterPanel

const Section = styled(Box)({
   marginBottom: '12px',
})

const FilterTitle = styled(Typography)({
   fontWeight: 600,
   fontSize: '0.9rem',
   color: '#a000c0',
})

const FilterWrapper = styled(Box)({
   width: 280,
   padding: 20,
   borderRadius: 8,
   border: 'none',
   backgroundColor: '#fff',
   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
})

const ResetLink = styled(Button)({
   padding: 0,
   textTransform: 'none',
   color: '#1976d2',
   marginBottom: '16px',
   background: 'none',
   boxShadow: 'none',

   '&:hover': {
      background: 'none',
      textDecoration: 'underline',
   },
})

const CategoryHeader = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '8px 0',
   cursor: 'pointer',
   '&:hover': {
      opacity: 0.8,
   },
})
