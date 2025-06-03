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

const Filters = styled(Box)({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '8px',
})

const StyledFilterButton = styled(MUIButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '14px',
  borderRadius: '6px',
  minWidth: '120px',
  padding: '6px 16px',
  boxShadow: 'none',
  border: 'none',
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

const Toolbar = () => {
  const [activeFilter, setActiveFilter] = useState(0)
  const filterLabels = ['Все товары', 'В продаже', 'В избранном', 'В корзине']

  return (
    <Wrapper>
      <LeftColumn>
        <SearchBox>
          <StyledInput placeholder="Поиск по артикулу или ..." />
          <IconButton sx={{ padding: 0 }}>
            <img src={Icons.searchGrey} alt="search" />
          </IconButton>
        </SearchBox>

        <Filters>
          {filterLabels.map((label, index) => (
            <StyledFilterButton
              key={label}
              onClick={() => setActiveFilter(index)}
              variant="contained"
              sx={{
                backgroundColor: activeFilter === index ? '#2D3A45' : '#F4F6F9',
                color: activeFilter === index ? '#FFFFFF' : '#1A1A25',
                '&:hover': {
                  backgroundColor:
                    activeFilter === index ? '#1c252c' : '#eaecee',
                  boxShadow: 'none',
                },
              }}
            >
              {label}
            </StyledFilterButton>
          ))}
        </Filters>
      </LeftColumn>

      <RightColumn>
        <ActionButtons>
          <Button variant="outlined">Добавить товар</Button>
          <Button variant="outlined">Создать скидку</Button>
        </ActionButtons>
        <UploadBanner>
          <img src={Icons.link} alt="link" />
          Загрузить баннер
        </UploadBanner>
      </RightColumn>
    </Wrapper>
  )
}

export default Toolbar
