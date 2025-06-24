import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Infographic = () => {
  const [period, setPeriod] = useState('day');

  const data = {
    day: {
      purchased: '7 556 с',
      ordered: '34 562 с',
      purchasedCount: '12 шт',
      orderedCount: '56 шт',
      delivered: '120 000 с',
      prevDelivered: '100 500 с',
    },
    month: {
      purchased: '15 000 с',
      ordered: '50 000 с',
      purchasedCount: '25 шт',
      orderedCount: '100 шт',
      delivered: '200 000 с',
      prevDelivered: '150 000 с',
    },
    year: {
      purchased: '100 000 с',
      ordered: '300 000 с',
      purchasedCount: '150 шт',
      orderedCount: '500 шт',
      delivered: '950 000 с',
      prevDelivered: '800 000 с',
    },
  };

  const currentData = data[period];

  return (
    <InfographicContainer>
      <InfographicHeader>
        ИНФОГРАФИКА
      </InfographicHeader>
      <DataSection>
        <DataColumn>
          <PurchasedAmount>
            {currentData.purchased}
          </PurchasedAmount>
          <PurchasedLabel>
            Выкупили на сумму
          </PurchasedLabel>
          <PurchasedCount>
            {currentData.purchasedCount}
          </PurchasedCount>
        </DataColumn>
        <DataColumn>
          <OrderedAmount>
            {currentData.ordered}
          </OrderedAmount>
          <OrderedLabel>
            Заказали на сумму
          </OrderedLabel>
          <OrderedCount>
            {currentData.orderedCount}
          </OrderedCount>
        </DataColumn>
      </DataSection>
      <PeriodTabs>
        {[
          { key: 'day', label: 'ЗА ДЕНЬ' },
          { key: 'month', label: 'ЗА МЕСЯЦ' },
          { key: 'year', label: 'ЗА ГОД' },
        ].map((item) => (
          <StyledButton
            key={item.key}
            onClick={() => setPeriod(item.key)}
            $isActive={period === item.key}
          >
            {item.label}
          </StyledButton>
        ))}
      </PeriodTabs>
      <DeliveredSection>
        <DeliveredTitle>
          Доставлено товаров на сумму
        </DeliveredTitle>
        <DeliveredValues>
          <DeliveredValue>
            <DeliveredCurrent>
              {currentData.delivered}
            </DeliveredCurrent>
            <DeliveredPeriod>
              Текущий период
            </DeliveredPeriod>
          </DeliveredValue>
          <DeliveredValue>
            <DeliveredPrev>
              {currentData.prevDelivered}
            </DeliveredPrev>
            <DeliveredPeriod>
              Предыдущий период
            </DeliveredPeriod>
          </DeliveredValue>
        </DeliveredValues>
      </DeliveredSection>
    </InfographicContainer>
  );
};

export default Infographic;

// Styled Components
const InfographicContainer = styled('div')({
  borderRadius: '8px',
  width: '320px',
  padding: '20px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  marginTop: '36px',
  marginLeft: '91px',
});

const InfographicHeader = styled('div')({
  fontSize: '12px',
  fontWeight: 500,
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '20px',
});

const DataSection = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '24px',
});

const DataColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const PurchasedAmount = styled('div')({
  fontSize: '28px',
  fontWeight: 400,
  color: '#2196F3',
  lineHeight: '1.2',
  marginBottom: '4px',
});

const PurchasedLabel = styled('div')({
  fontSize: '13px',
  color: '#666',
  marginBottom: '4px',
  lineHeight: '1.3',
});

const PurchasedCount = styled('div')({
  fontSize: '16px',
  fontWeight: 400,
  color: '#2196F3',
});

const OrderedAmount = styled('div')({
  fontSize: '28px',
  fontWeight: 400,
  color: '#FF9800',
  lineHeight: '1.2',
  marginBottom: '4px',
});

const OrderedLabel = styled('div')({
  fontSize: '13px',
  color: '#666',
  marginBottom: '4px',
  lineHeight: '1.3',
});

const OrderedCount = styled('div')({
  fontSize: '16px',
  fontWeight: 400,
  color: '#FF9800',
});

const PeriodTabs = styled('div')({
  display: 'flex',
  gap: '0px',
  marginBottom: '24px',
});

const StyledButton = styled(Button)(({ $isActive }) => ({
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'uppercase',
  padding: '8px 16px',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: $isActive ? '2px solid #ff00a6' : '2px solid transparent',
  color: $isActive ? '#ff00a6' : '#666',
  cursor: 'pointer',
  fontFamily: 'inherit',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const DeliveredSection = styled('div')({
  backgroundColor: '#F0F0FF',
  borderRadius: '8px',
  padding: '16px',
});

const DeliveredTitle = styled('div')({
  fontSize: '14px',
  color: '#333',
  fontWeight: 500,
  marginBottom: '12px',
});

const DeliveredValues = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const DeliveredValue = styled('div')({});

const DeliveredCurrent = styled('div')({
  fontSize: '24px',
  fontWeight: 400,
  color: '#0fe816',
  marginBottom: '4px',
});

const DeliveredPrev = styled('div')({
  fontSize: '24px',
  fontWeight: 400,
  color: '#0fe816',
  marginBottom: '4px',
});

const DeliveredPeriod = styled('div')({
  fontSize: '12px',
  color: '#666',
});