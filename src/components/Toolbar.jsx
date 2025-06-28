import { useState } from 'react'
import {
   Box,
   IconButton,
   InputBase,
   Typography,
   Button as MUIButton,
   styled,
} from '@mui/material'
import Button from './UI/Button'
import { Icons } from '../assets/icons'

const Toolbar = ({
   onSearch,
   onActionChange,
   currentAction,
   onUploadBanner,
   onOpenDiscount,
}) => {
   const [searchValue, setSearchValue] = useState('')

   const handleSearchChange = (e) => {
      const value = e.target.value
      setSearchValue(value)
      onSearch(value)
   }

   const filterOptions = [
      { label: 'Все товары', value: 'all' },
      { label: 'В продаже', value: 'inStock' },
      { label: 'В избранном', value: 'favorites' },
      { label: 'В корзине', value: 'cart' },
   ]

   return (
      <Wrapper>
         <LeftColumn>
            <SearchBox>
               <StyledInput
                  placeholder="Поиск по артикулу или ..."
                  value={searchValue}
                  onChange={handleSearchChange}
               />
               <StyledIconButton>
                  <img src={Icons.searchGrey} alt="search" />
               </StyledIconButton>
            </SearchBox>

            <Filters>
               {filterOptions.map(({ label, value }) => (
                  <StyledFilterButton
                     key={value}
                     $active={currentAction === value}
                     onClick={() => onActionChange(value)}
                     variant="contained"
                  >
                     {label}
                  </StyledFilterButton>
               ))}
            </Filters>
         </LeftColumn>

         <RightColumn>
            <ActionButtons>
               <Button variant="outlined">Добавить товар</Button>
               <Button variant="outlined" onClick={onOpenDiscount}>
                  Создать скидку
               </Button>
            </ActionButtons>
            <UploadBanner onClick={onUploadBanner}>
               <img src={Icons.link} alt="link" />
               Загрузить баннер
            </UploadBanner>
         </RightColumn>
      </Wrapper>
   )
}

export default Toolbar

const Wrapper = styled(Box)({
   width: '80vw',
   margin: '32px auto 0 auto',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'flex-start',
   flexWrap: 'wrap',
   gap: '16px',
})

const LeftColumn = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
})

const SearchBox = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   width: '550px',
   border: '1px solid #C4C4C4',
   borderRadius: '8px',
   backgroundColor: '#FFFFFF',
   padding: '8px 16px',
   marginTop: '20px',
})

const StyledInput = styled(InputBase)({
   flex: 1,
   fontSize: '16px',
   color: '#6C727F',
   '&::placeholder': {
      color: '#A0A0A0',
   },
})

const StyledIconButton = styled(IconButton)({
   padding: 0,
})

const Filters = styled(Box)({
   display: 'flex',
   gap: '8px',
   flexWrap: 'wrap',
   marginTop: '8px',
})

const StyledFilterButton = styled(MUIButton)(({ theme, $active }) => ({
   textTransform: 'none',
   fontWeight: 500,
   fontSize: '14px',
   borderRadius: '6px',
   minWidth: '120px',
   padding: '6px 16px',
   boxShadow: 'none',
   border: 'none',
   backgroundColor: $active ? '#2D3A45' : '#F4F6F9',
   color: $active ? '#FFFFFF' : '#1A1A25',
   '&:hover': {
      backgroundColor: $active ? '#1c252c' : '#eaecee',
      boxShadow: 'none',
   },
}))

const RightColumn = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'end',
   justifyContent: 'space-between',
   gap: '16px',
   flexWrap: 'wrap',
   alignSelf: 'center',
})

const ActionButtons = styled(Box)({
   display: 'flex',
   gap: '16px',
})

const UploadBanner = styled(Typography)({
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   fontSize: '14px',
   fontWeight: 500,
   color: '#2D3A45',
   gap: '6px',
})
