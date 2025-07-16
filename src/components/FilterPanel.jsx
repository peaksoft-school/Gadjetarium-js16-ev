import { useEffect, useState } from 'react'
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
   styled,
} from '@mui/material'
import { catalogProductData } from '../utils/constants'

const PurpleCheckbox = styled(Checkbox)({
   color: '#a000c0',
   '&.Mui-checked': {
      color: '#a000c0',
   },
})

const ResetLinkStyled = styled(Button)({
   color: '#1976d2',
   textDecoration: 'underline',
   fontWeight: 500,
   fontSize: 15,
   background: 'none',
   border: 'none',
   boxShadow: 'none',
   cursor: 'pointer',
   marginBottom: 16,
   padding: 0,
   minHeight: 0,
   minWidth: 0,
   '&:hover': {
      background: 'none',
      textDecoration: 'underline',
   },
})

const colorOptions = [
   { name: 'Black', color: 'Black' },
   { name: 'Blue', color: 'Blue' },
   { name: 'Gold', color: '#FFD700' },
   { name: 'Graphite', color: '#666' },
   { name: 'Green', color: 'Green' },  
   { name: 'Rose Gold', color: '#e0bfb8' },
   { name: 'Red', color: 'Red' },
   { name: 'Silver', color: 'Silver' },
   { name: 'White', color: 'White' },
]

const FilterPanel = ({ onApply, value }) => {
   const [draftFilters, setDraftFilters] = useState(
      value || { filters: {}, price: [500, 250000] }
   )
   useEffect(() => {
      setDraftFilters(value || { filters: {}, price: [500, 250000] })
   }, [value])
   const [expandedCategories, setExpandedCategories] = useState(
      catalogProductData.reduce((acc, item) => {
         acc[item.id] = true
         return acc
      }, {})
   )
   const [showAllColors, setShowAllColors] = useState(false)
   const [showAllStorage, setShowAllStorage] = useState(false)

   const handlePriceChange = (_, newValue) => {
      setDraftFilters((prev) => ({ ...prev, price: newValue }))
   }

   const handleCheckboxChange = (key, value) => {
      setDraftFilters((prev) => {
         const f = prev.filters || {}
         const values = f[key] || []
         const updated = {
            ...f,
            [key]: values.includes(value)
               ? values.filter((v) => v !== value)
               : [...values, value],
         }
         return { ...prev, filters: updated }
      })
   }

   const resetFilters = () => {
      setDraftFilters({ filters: {}, price: [500, 250000] })
   }

   const handleApply = () => {
      if (onApply) onApply(draftFilters)
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
                        checked={
                           draftFilters.filters[key]?.includes(label) || false
                        }
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

   const visibleColors = showAllColors ? colorOptions : colorOptions.slice(0, 6)
   const handleColorCheckbox = (color) => {
      handleCheckboxChange('colors', color.name)
   }
   const selectedColors = draftFilters.filters['colors'] || []

   const storageOptions = [
      8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536,
      131072, 262144, 524288, 1048576, 2097152, 4194304,
   ]
   const visibleStorage = showAllStorage
      ? storageOptions
      : storageOptions.slice(0, 6)
   const selectedStorage = draftFilters.filters['1-storage'] || []

   return (
      <FilterWrapper>
         <ResetLinkStyled type="button" onClick={resetFilters}>
            Сбросить все фильтры
         </ResetLinkStyled>
         <Divider sx={{ my: 1 }} />
         <Section>
            <Typography fontWeight={700} fontSize={16} mb={1} color="#a000c0">
               Категории
            </Typography>
            {catalogProductData[0].category.subCategory.map((item) => (
               <FormControlLabel
                  key={item.id}
                  control={
                     <PurpleCheckbox
                        checked={
                           draftFilters.filters['1-brands']?.includes(
                              item.categoryName
                           ) || false
                        }
                        onChange={() =>
                           handleCheckboxChange('1-brands', item.categoryName)
                        }
                        size="small"
                     />
                  }
                  label={
                     <Typography variant="body2">
                        {item.categoryName}
                     </Typography>
                  }
                  sx={{ margin: 0, mb: 1 }}
               />
            ))}
         </Section>
         <Divider sx={{ my: 1 }} />
         <Section>
            <Typography fontWeight={700} fontSize={16} mb={1} color="#a000c0">
               Стоимость
            </Typography>
            <Box display="flex" gap={1} mb={2}>
               <TextField
                  size="small"
                  value={draftFilters.price[0]}
                  onChange={(e) =>
                     setDraftFilters((prev) => ({
                        ...prev,
                        price: [+e.target.value || 0, prev.price[1]],
                     }))
                  }
                  inputProps={{ type: 'number' }}
                  placeholder="от"
                  sx={{ width: 90 }}
               />
               <TextField
                  size="small"
                  value={draftFilters.price[1]}
                  onChange={(e) =>
                     setDraftFilters((prev) => ({
                        ...prev,
                        price: [prev.price[0], +e.target.value || 0],
                     }))
                  }
                  inputProps={{ type: 'number' }}
                  placeholder="до"
                  sx={{ width: 90 }}
               />
            </Box>
            <Slider
               value={draftFilters.price}
               min={500}
               max={250000}
               step={500}
               onChange={handlePriceChange}
               valueLabelDisplay="auto"
               sx={{ color: '#a000c0' }}
            />
         </Section>
         <Divider sx={{ my: 1 }} />
         {/* --- Цвет --- */}
         <Section>
            <Typography fontWeight={700} fontSize={16} mb={1} color="#a000c0">
               Цвет
            </Typography>
            {visibleColors.map((color) => (
               <FormControlLabel
                  key={color.name}
                  control={
                     <PurpleCheckbox
                        checked={selectedColors.includes(color.name)}
                        onChange={() => handleColorCheckbox(color)}
                        size="small"
                     />
                  }
                  label={
                     <Box display="flex" alignItems="center" gap={1}>
                        <span
                           style={{
                              display: 'inline-block',
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              background: color.color,
                              border: color.border
                                 ? `1px solid ${color.border}`
                                 : '1px solid #eee',
                           }}
                        />
                        <Typography variant="body2">{color.name}</Typography>
                        <Typography
                           variant="body2"
                           sx={{ color: '#aaa', ml: 0.5 }}
                        >
                           ({color.count})
                        </Typography>
                     </Box>
                  }
                  sx={{ margin: 0, mb: 1 }}
               />
            ))}
            {colorOptions.length > 6 && (
               <Button
                  sx={{
                     color: '#a000c0',
                     textTransform: 'none',
                     fontWeight: 500,
                     fontSize: 14,
                     pl: 0,
                  }}
                  onClick={() => setShowAllColors((v) => !v)}
               >
                  {showAllColors ? 'Скрыть' : `Еще ${colorOptions.length - 6}`}
               </Button>
            )}
         </Section>
         <Divider sx={{ my: 1 }} />
         <Section>
            <Typography fontWeight={700} fontSize={16} mb={1} color="#a000c0">
               Объем памяти (GB)
            </Typography>
            {visibleStorage.map((val) => (
               <FormControlLabel
                  key={val}
                  control={
                     <PurpleCheckbox
                        checked={selectedStorage.includes(val)}
                        onChange={() => handleCheckboxChange('1-storage', val)}
                        size="small"
                     />
                  }
                  label={<Typography variant="body2">{val}</Typography>}
                  sx={{ margin: 0, mb: 1 }}
               />
            ))}
            {storageOptions.length > 6 && (
               <Button
                  sx={{
                     color: '#a000c0',
                     textTransform: 'none',
                     fontWeight: 500,
                     fontSize: 14,
                     pl: 0,
                  }}
                  onClick={() => setShowAllStorage((v) => !v)}
               >
                  {showAllStorage
                     ? 'Скрыть'
                     : `Еще ${storageOptions.length - 6}`}
               </Button>
            )}
         </Section>
         <Divider sx={{ my: 1 }} />
         {/* --- Объем оперативной памяти (GB) --- */}
         <Section>
            <Typography fontWeight={700} fontSize={16} mb={1} color="#a000c0">
               Объем оперативной памяти (GB)
            </Typography>
            {catalogProductData[0].categories[1].subCategory.map((item) => (
               <FormControlLabel
                  key={item.title}
                  control={
                     <PurpleCheckbox
                        checked={
                           draftFilters.filters['1-ram']?.includes(
                              item.title
                           ) || false
                        }
                        onChange={() =>
                           handleCheckboxChange('1-ram', item.title)
                        }
                        size="small"
                     />
                  }
                  label={<Typography variant="body2">{item.title}</Typography>}
                  sx={{ margin: 0, mb: 1 }}
               />
            ))}
         </Section>
         <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleApply}
         >
            Показать
         </Button>
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
