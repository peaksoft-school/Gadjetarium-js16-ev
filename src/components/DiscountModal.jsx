import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, styled } from '@mui/material'
import Input from './UI/Input'
import DatePicker from './UI/DatePicker'
import Button from './UI/Button'
import { Icons } from '../assets/icons'
import { addDiscount } from '../store/discount/addDiscountThunk'

const ModalBox = styled(Box)({
  width: 420,
  background: '#FFFFFF',
  borderRadius: 12,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '28px 24px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
})

const Title = styled('h2')({
  fontWeight: 600,
  fontSize: 24,
  margin: 0,
  marginBottom: 24,
  color: '#232323',
  textAlign: 'center',
})

const Row = styled(Box)({
  display: 'flex',
  gap: 12,
  width: '100%',
  marginBottom: 18,
  position: 'relative',
})

const Actions = styled(Box)({
  display: 'flex',
  gap: 12,
  width: '100%',
  marginTop: 20,
})

const DateField = styled(Box)({
  flex: 1,
  border: '1px solid #E3E4E8',
  borderRadius: 6,
  backgroundColor: '#fff',
  height: 44,
  paddingLeft: 12,
  paddingRight: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  position: 'relative',
})

const DateText = styled('span')({
  color: '#384255',
  fontSize: 14,
})

const CalendarIcon = styled('img')({
  width: 20,
})

const PickerWrapper = styled(Box)({
  position: 'absolute',
  top: 48,
  zIndex: 10,
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
})

const StyledInputWrapper = styled(Box)({
  width: '100%',
  marginBottom: 20,
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    borderRadius: 6,
    fontSize: 16,
    height: 44,
  },
  '& .MuiInputLabel-root': {
    fontSize: 16,
  },
})

const DiscountModal = ({ onClose, selectedIds }) => {
  const dispatch = useDispatch()
  const [discount, setDiscount] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [openPicker, setOpenPicker] = useState(null)

  const handleDateChange = (date) => {
    if (openPicker === 'from') setStartDate(date)
    if (openPicker === 'to') setEndDate(date)
    setOpenPicker(null)
  }

  const handleSubmit = () => {
    if (!discount || !startDate || !endDate || selectedIds.length === 0) {
      alert('Заполните все поля и выберите хотя бы один товар.')
      return
    }

    const payload = {
      discountPrice: Number(discount),
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      productTypeIds: selectedIds,
    }

    dispatch(addDiscount(payload))
    onClose()
  }

  return (
    <ModalBox>
      <Title>Создать скидку</Title>

      <StyledInputWrapper>
        <Input
          label="Размер скидки *"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="0%"
          fullWidth
          InputProps={{}}
          InputLabelProps={{ shrink: true }}
        />
      </StyledInputWrapper>

      <Row>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <DateField onClick={() => setOpenPicker('from')}>
            <DateText>
              {startDate ? startDate.format('DD.MM.YY') : 'Дата начала скидки *'}
            </DateText>
            <CalendarIcon src={Icons.calendar} alt="calendar" />
          </DateField>
          {openPicker === 'from' && (
            <PickerWrapper>
              <DatePicker date={startDate} onChange={handleDateChange} />
            </PickerWrapper>
          )}
        </Box>

        <Box sx={{ flex: 1, position: 'relative' }}>
          <DateField onClick={() => setOpenPicker('to')}>
            <DateText>
              {endDate ? endDate.format('DD.MM.YY') : 'Дата окончания скидки *'}
            </DateText>
            <CalendarIcon src={Icons.calendar} alt="calendar" />
          </DateField>
          {openPicker === 'to' && (
            <PickerWrapper>
              <DatePicker date={endDate} onChange={handleDateChange} />
            </PickerWrapper>
          )}
        </Box>
      </Row>

      <Actions>
        <Button variant="outlined" onClick={onClose}>
          ОТМЕНИТЬ
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          ДОБАВИТЬ
        </Button>
      </Actions>
    </ModalBox>
  )
}

export default DiscountModal
