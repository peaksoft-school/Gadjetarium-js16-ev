import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, Typography } from '@mui/material';


const StyledInfoCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  width: '320px',
}));

const TopRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const StatGroup = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const LargeStat = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#1976D2',
  lineHeight: 1.2,
}));

const Label = styled(Typography)(() => ({
  fontSize: '0.875rem',
  color: '#555',
}));

const Count = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: '#333',
}));

const BottomSection = styled(Card)(({ theme }) => ({
  backgroundColor: '#E6F0FA',
  boxShadow: 'none',
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0, 2, 2),
  padding: theme.spacing(2),
}));

const BottomRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const InfoLabel = styled(Typography)(() => ({
  fontSize: '0.875rem',
  color: '#333',
}));

const InfoCount = styled(Typography)(() => ({
  fontSize: '1.25rem',
  fontWeight: 600,
}));

const Infographic = () => (
  <StyledInfoCard>
    <CardContent>
      <TopRow>
        <StatGroup>
          <LargeStat>7 556 ₸</LargeStat>
          <Label>Выкупили на сумму</Label>
          <Count>12 шт</Count>
        </StatGroup>
        <StatGroup>
          <LargeStat>34 562 ₸</LargeStat>
          <Label>Заказали на сумму</Label>
          <Count>56 шт</Count>
        </StatGroup>
      </TopRow>

      <BottomSection variant="outlined">
        <InfoLabel>Доставлено товаров на сумму</InfoLabel>
        <BottomRow>
          <Box>
            <InfoCount>120 000 ₸</InfoCount>
            <Label>Текущий период</Label>
          </Box>
          <Box>
            <InfoCount>100 500 ₸</InfoCount>
            <Label>Предыдущий период</Label>
          </Box>
        </BottomRow>
      </BottomSection>
    </CardContent>
  </StyledInfoCard>
);

export default Infographic;
