import React, { useState } from 'react'
import { Box, Typography, Stack, styled } from '@mui/material'

// Styled wrappers
const Container = styled(Box)({
   maxWidth: 600,
   margin: '0 auto',
   padding: 16,
})

const Title = styled(Typography)({
   marginBottom: 24,
   fontWeight: 600,
})

const InfoRow = styled(Stack)({
   flexDirection: 'row',
   gap: 32,
   marginBottom: 32,
})

const InfoBox = styled(Box)({
   flex: 1,
})

const Separator = styled(Box)({
   width: '1px',
   backgroundColor: '#E0E0E0',
   marginTop: 8,
   marginBottom: 8,
})

const InfoCard = styled(Box)({
   background: '#F4F6F9',
   borderRadius: 8,
   padding: 16,
})

const PeriodSelector = styled(Box)({
   display: 'flex',
   borderBottom: '1px solid #E0E0E0',
   marginBottom: 24,
})

const PeriodButton = styled('button', {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
   flex: 1,
   padding: 12,
   background: 'none',
   border: 'none',
   cursor: 'pointer',
   position: 'relative',
   color: active ? '#000' : '#666',
   fontWeight: active ? 600 : 400,
   transition: 'color 0.2s ease',
   '&:after': active
      ? {
           content: '""',
           position: 'absolute',
           bottom: 0,
           left: 0,
           width: '100%',
           height: '2px',
           background: '#000',
        }
      : {},
}))

const ValueBox = styled(Box)({
   display: 'flex',
   alignItems: 'baseline',
   gap: 4,
})

const Value = styled(Typography)({
   fontSize: 32,
   fontWeight: 700,
   lineHeight: 1,
})

const SmallValue = styled(Value)({
   fontSize: 28,
   color: '#4CAF50',
})

const PreviousValue = styled(Value)({
   fontSize: 24,
   fontWeight: 500,
   color: '#666',
})

const Unit = styled(Typography)({
   fontSize: 14,
   color: '#666',
})

const Label = styled(Typography)({
   fontSize: 14,
   color: '#666',
   marginTop: 8,
})

const Count = styled(Typography)({
   fontSize: 14,
   marginTop: 4,
})

const Infographics = ({ data }) => {
   const [activePeriod, setActivePeriod] = useState('day')

   const formatNumber = (num) => num.toLocaleString('ru-RU')

   return (
      <Container>
         <Title variant="h6">ИНФОГРАФИКА</Title>

         <InfoRow>
            <InfoBox>
               <ValueBox>
                  <Value sx={{ color: '#2196F3' }}>
                     {formatNumber(data.purchasedAmount)}
                  </Value>
                  <Unit>с</Unit>
               </ValueBox>
               <Label>Выкупили на сумму</Label>
               <Count sx={{ color: '#2196F3' }}>{data.purchasedCount} шт</Count>
            </InfoBox>

            <Separator />

            <InfoBox>
               <ValueBox>
                  <Value sx={{ color: '#FF9800' }}>
                     {formatNumber(data.orderedAmount)}
                  </Value>
                  <Unit>с</Unit>
               </ValueBox>
               <Label>Заказали на сумму</Label>
               <Count sx={{ color: '#FF9800' }}>{data.orderedCount} шт</Count>
            </InfoBox>
         </InfoRow>

         <PeriodSelector>
            {[
               { id: 'day', label: 'ЗА ДЕНЬ' },
               { id: 'month', label: 'ЗА МЕСЯЦ' },
               { id: 'year', label: 'ЗА ГОД' },
            ].map((period) => (
               <PeriodButton
                  key={period.id}
                  active={activePeriod === period.id}
                  onClick={() => setActivePeriod(period.id)}
               >
                  {period.label}
               </PeriodButton>
            ))}
         </PeriodSelector>

         <InfoCard>
            <Typography
               sx={{ color: '#666', marginBottom: 2, fontWeight: 500 }}
            >
               Доставлено товаров на сумму
            </Typography>

            <Stack direction="row" spacing={4}>
               <Box>
                  <ValueBox>
                     <SmallValue>
                        {formatNumber(data.deliveredAmount)}
                     </SmallValue>
                     <Unit>с</Unit>
                  </ValueBox>
                  <Label>Текущий период</Label>
               </Box>
               <Box>
                  <ValueBox>
                     <PreviousValue>
                        {formatNumber(data.previousDeliveredAmount)}
                     </PreviousValue>
                     <Unit>с</Unit>
                  </ValueBox>
                  <Label>Предыдущий период</Label>
               </Box>
            </Stack>
         </InfoCard>
      </Container>
   )
}

export default Infographics
