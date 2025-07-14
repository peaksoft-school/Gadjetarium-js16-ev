import { Box, Button, Container, Typography, styled } from '@mui/material'
import UserHeader from '../layout/user/UserHeader'
import Footer from '../layout/Footer'
import { useState } from 'react'
import { Images } from '../assets/images'
import Breadcrumbs from '../components/UI/BreadCrums'

const tabs = ['История заказов', 'Избранное', 'Профиль']

export default function OrderHistoryPustoi() {
   const [activeTab, setActiveTab] = useState('История заказов')

   return (
      <Wrapper>
         <UserHeader />
         <StyledBreadCrumbs>
            <Breadcrumbs
               baseLabel="Личный кабинет"
               pathLabels={{
                  orders: 'История заказов',
                  empty: 'Здесь пусто',
               }}
            />
         </StyledBreadCrumbs>
         <Title>История заказов</Title>
         <Divider />
         <ContentWrapper maxWidth="md">
            <TabButtonsBox>
               {tabs.map((tab) => (
                  <TabButton
                     key={tab}
                     active={activeTab === tab ? 1 : 0}
                     onClick={() => setActiveTab(tab)}
                  >
                     {tab}
                  </TabButton>
               ))}
            </TabButtonsBox>

            {activeTab === 'История заказов' && (
               <EmptyBox>
                  <img
                     src={Images.human}
                     alt="empty"
                     style={{ width: 200, height: 200 }}
                  />
                  <Typography variant="h6" fontWeight={600} mt={2}>
                     Здесь пока пусто
                  </Typography>
                  <Typography sx={{ color: '#5A5A5A', mt: 1 }}>
                     Здесь будет храниться история ваших заказов.
                  </Typography>
                  <ButtonStyled variant="contained">К покупкам</ButtonStyled>
               </EmptyBox>
            )}

            {activeTab === 'Избранное' && (
               <TabContent>
                  <Typography variant="h6">Избранное</Typography>
                  <Typography sx={{ color: '#5A5A5A', mt: 1 }}>
                     Здесь будут ваши избранные товары.
                  </Typography>
               </TabContent>
            )}

            {activeTab === 'Профиль' && (
               <TabContent>
                  <Typography variant="h6">Профиль</Typography>
                  <Typography sx={{ color: '#5A5A5A', mt: 1 }}>
                     Здесь будет отображаться информация о вашем профиле.
                  </Typography>
               </TabContent>
            )}
         </ContentWrapper>
         <Footer />
      </Wrapper>
   )
}

const Wrapper = styled('div')({
   overflow: 'hidden',
})

const Title = styled('h2')({
   position: 'relative',
   left: '12.2%',
   marginTop: '2%',
})

const Divider = styled('hr')({
   width: '75.5%',
   margin: '24px auto',
})

const ContentWrapper = styled(Container)({
   marginBottom: '5%',
})

const TabButtonsBox = styled(Box)({
   display: 'flex',
   gap: '12px',
   marginBottom: '32px',
   position: 'relative',
   right: '17.5%',
})

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

const EmptyBox = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   textAlign: 'center',
   padding: '40px 0',
})

const ButtonStyled = styled(Button)({
   backgroundColor: '#C035A2',
   marginTop: '24px',
   textTransform: 'none',
   fontWeight: 500,
   padding: '8px 24px',
   borderRadius: '8px',
   '&:hover': {
      backgroundColor: '#a02d88',
   },
})

const TabContent = styled(Box)({
   padding: '40px 0',
   textAlign: 'center',
})

const StyledBreadCrumbs = styled(Box)(() => ({
   marginLeft: '12.2%',
   marginTop: '2%',
   position: 'relative',
   top: '10px',
}))
