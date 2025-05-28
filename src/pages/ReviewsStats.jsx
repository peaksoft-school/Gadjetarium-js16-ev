import { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const StatsContainer = styled(Box)({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  width: '100%',
  maxWidth: '360px',
});

const Title = styled(Typography)({
  fontSize: '18px',
  fontWeight: '700',
  marginBottom: '24px',
  color: '#333333',
});

const StatRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '20px',
});

const MainStat = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const BigValue = styled(Typography)({
  fontSize: '24px',
  fontWeight: '700',
  color: '#333333',
  lineHeight: '1.2',
});

const SmallLabel = styled(Typography)({
  fontSize: '14px',
  color: '#666666',
  marginTop: '4px',
});

const SecondaryStat = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
});

const SmallValue = styled(Typography)({
  fontSize: '18px',
  fontWeight: '700',
  color: '#333333',
  marginRight: '4px',
});

const UnitLabel = styled(Typography)({
  fontSize: '14px',
  color: '#666666',
});

const Divider = styled(Box)({
  height: '1px',
  backgroundColor: '#EEEEEE',
  margin: '16px 0',
});

const PeriodTabs = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const PeriodTab = styled(Typography)(({ active }) => ({
  fontSize: '14px',
  color: active ? '#333333' : '#666666',
  cursor: 'pointer',
  fontWeight: active ? '600' : '400',
  position: 'relative',
  paddingBottom: '4px',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: active ? '2px' : '0px',
    backgroundColor: '#E91E63',
    transition: 'all 0.2s ease',
  },
  '&:hover': {
    color: '#333333',
  },
}));

const ComparisonBlock = styled(Box)({
  backgroundColor: '#F8F9FA',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '12px',
});

const ComparisonTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '12px',
  color: '#333333',
});

const ComparisonRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ComparisonValue = styled(Typography)({
  fontSize: '20px',
  fontWeight: '700',
  color: '#333333',
});

const ComparisonLabel = styled(Typography)({
  fontSize: '12px',
  color: '#999999',
});

const ReviewsStats = ({ stats }) => {
  const [activePeriod, setActivePeriod] = useState('day');

  return (
    <StatsContainer>
      <Title>ИНФОГРАФИКА</Title>

      <StatRow>
        <MainStat>
          <BigValue>{stats.totalEarnings} с</BigValue>
          <SmallLabel>Выкупили на сумму</SmallLabel>
        </MainStat>
        <SecondaryStat>
          <SmallValue>{stats.dailyStats.orders}</SmallValue>
          <UnitLabel>ШТ</UnitLabel>
        </SecondaryStat>
      </StatRow>

      <StatRow>
        <MainStat>
          <BigValue>{stats.totalOrdersThisMonth} с</BigValue>
          <SmallLabel>Заказали на сумму</SmallLabel>
        </MainStat>
        <SecondaryStat>
          <SmallValue>{stats.dailyStats.items}</SmallValue>
          <UnitLabel>ШТ</UnitLabel>
        </SecondaryStat>
      </StatRow>

      <Divider />

      <PeriodTabs>
        <PeriodTab active={activePeriod === 'day'} onClick={() => setActivePeriod('day')}>
          ЗА ДЕНЬ
        </PeriodTab>
        <PeriodTab active={activePeriod === 'month'} onClick={() => setActivePeriod('month')}>
          ЗА МЕСЯЦ
        </PeriodTab>
        <PeriodTab active={activePeriod === 'year'} onClick={() => setActivePeriod('year')}>
          ЗА ГОД
        </PeriodTab>
      </PeriodTabs>

      <ComparisonBlock>
        <ComparisonTitle>Доставлено товаров на сумму</ComparisonTitle>
        <ComparisonRow>
          <Box textAlign="center">
            <ComparisonValue>
              {activePeriod === 'day' && '12 500 с'}
              {activePeriod === 'month' && '120 000 с'}
              {activePeriod === 'year' && '1 450 000 с'}
            </ComparisonValue>
            <ComparisonLabel>Текущий период</ComparisonLabel>
          </Box>
          <TrendingUp style={{ color: '#4CAF50', fontSize: '28px' }} />
          <Box textAlign="center">
            <ComparisonValue>
              {activePeriod === 'day' && '10 200 с'}
              {activePeriod === 'month' && '100 500 с'}
              {activePeriod === 'year' && '1 200 000 с'}
            </ComparisonValue>
            <ComparisonLabel>Предыдущий период</ComparisonLabel>
          </Box>
        </ComparisonRow>
      </ComparisonBlock>
    </StatsContainer>
  );
};

export default ReviewsStats;