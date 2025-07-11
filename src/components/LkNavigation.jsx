import { Box, Typography, styled } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import Breadcrumbs from './UI/BreadCrums'

const tabs = [
   { label: 'История заказов', path: '/user/account/order-history' },
   { label: 'Избранное', path: '/user/account/favorite' },
   { label: 'Профиль', path: '/user/account/profile' },
]

const LkNavigation = () => {
   const location = useLocation()
   const navigate = useNavigate()

   const getActiveTab = () => {
      const match = tabs.find((tab) => location.pathname.startsWith(tab.path))
      return match?.label || ''
   }

   const handleTabClick = (path) => {
      navigate(path)
   }

   return (
      <Container>
         <StyledBreadCrumbs>
            <Breadcrumbs
               baseLabel="Личный кабинет"
               pathLabels={{
                  'order-history': 'История заказов',
                  favorite: 'Избранное',
                  profile: 'Профиль',
               }}
            />
         </StyledBreadCrumbs>

         <Title variant="h5">{getActiveTab()}</Title>

         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {tabs.map((tab) => (
               <TabButton
                  key={tab.label}
                  active={getActiveTab() === tab.label ? 1 : 0}
                  onClick={() => handleTabClick(tab.path)}
               >
                  {tab.label}
               </TabButton>
            ))}
         </Box>
      </Container>
   )
}

export default LkNavigation

const Container = styled(Box)(() => ({
   maxWidth: '950px',
   marginLeft: '165px',
   padding: '0 16px',
   marginBottom: '30px',
}))

const StyledBreadCrumbs = styled(Box)(() => ({
   marginTop: '2%',
   marginBottom: '16px',
   position: 'relative',
   top: '10px',
}))

const Title = styled(Typography)(() => ({
   fontSize: '24px',
   fontWeight: 600,
   marginBottom: '16px',
   marginTop: '8px',
   marginLeft: '2px',
}))

const TabButton = styled('button')(({ active }) => ({
   backgroundColor: active ? '#1F1F1F' : '#F0F0F0',
   color: active ? '#FFFFFF' : '#000000',
   border: 'none',
   borderRadius: '6px',
   padding: '8px 16px',
   fontWeight: 500,
   cursor: 'pointer',
   fontSize: '14px',
   transition: '0.2s ease',
   '&:hover': {
      backgroundColor: active ? '#333' : '#e0e0e0',
   },
}))
