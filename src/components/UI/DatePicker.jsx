import { styled } from '@mui/material/styles'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Icons } from '../../assets/icons'

const DatePicker = ({ date, onChange }) => (
   <StyledCalendar
      value={date}
      onChange={onChange}
      views={['day']}
      disableHighlightToday
      showDaysOutsideCurrentMonth
      slots={{
         leftArrowIcon: () => (
            <img
               src={Icons.arrowLeft}
               alt="Назад"
               style={{ width: 20, height: 20 }}
            />
         ),
         rightArrowIcon: () => (
            <img
               src={Icons.arrowRight}
               alt="Вперёд"
               style={{ width: 20, height: 20 }}
            />
         ),
      }}
   />
)

export default DatePicker

const StyledCalendar = styled(DateCalendar)(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   borderRadius: theme.shape.borderRadius,

   boxShadow: '0px 4px 16px 0px #00000026',
   '& .MuiPickersDay-root': {
      margin: '2px',
   },
   '& .Mui-selected': {
      backgroundColor: '#ad00a7 !important',
      color: '#fff',
   },
}))
