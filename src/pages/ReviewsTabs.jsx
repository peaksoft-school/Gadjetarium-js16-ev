import React from 'react';
import { Tabs, Tab, Badge, styled } from '@mui/material';
import { REVIEW_STATUSES, TAB_LABELS } from '../utils/constants/index';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  marginBottom: '24px',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '500',
  padding: '8px 16px',
  margin: '0 4px',
  borderRadius: '20px',
  minHeight: '36px',
  backgroundColor: '#f0f0f0',
  color: '#666',
  '&.Mui-selected': {
    backgroundColor: '#e91e63',
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#d81b60',
  },
}));

const ReviewsTabs = ({ activeTab, onTabChange, reviewsCounts }) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <StyledTabs value={activeTab} onChange={handleChange}>
      <StyledTab value={REVIEW_STATUSES.ALL} label={TAB_LABELS[REVIEW_STATUSES.ALL]} />
      <StyledTab
        value={REVIEW_STATUSES.UNREAD}
        label={
          <Badge badgeContent={reviewsCounts.unread} color="success">
            {TAB_LABELS[REVIEW_STATUSES.UNREAD]}
          </Badge>
        }
      />
      <StyledTab value={REVIEW_STATUSES.ANSWERED} label={TAB_LABELS[REVIEW_STATUSES.ANSWERED]} />
    </StyledTabs>
  );
};

export default ReviewsTabs;