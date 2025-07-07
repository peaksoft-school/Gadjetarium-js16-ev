import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import ReviewsTable from '../components/RewiewsTable'
import { fetchReviewsByStatus } from '../store/reviews/ReviewsThunk'
import { styled } from '@mui/material/styles'
import AdminHeader from '../layout/admin/AdminHeader'
import Footer from '../layout/Footer'
import Infographic from '../components/Infographics'

const DashboardContainer = styled(Box)(({ theme }) => ({
   p: 3,
   backgroundColor: '#ffff',
   minHeight: '100vh',
}))

const ContentBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: 2,
}))

const ReviewsDashboardd = () => {
   const dispatch = useDispatch()
   const { reviews, status, error } = useSelector((state) => state.reviews)

   useEffect(() => {
      dispatch(fetchReviewsByStatus('все'))
   }, [dispatch])

   return (
      <>
         <AdminHeader />
         <DashboardContainer>
            {status === 'loading' && <Typography>Загрузка...</Typography>}
            {status === 'failed' && (
               <Typography color="error">
                  {error || 'Что-то пошло не так!'}
               </Typography>
            )}
            {status === 'succeeded' && (
               <ContentBox>
                  <Box sx={{ flex: 2 }}>
                     <ReviewsTable data={reviews} />
                  </Box>
                  <Box sx={{ flex: 1, marginLeft:"10%" }}>
                     <Infographic />
                  </Box>
               </ContentBox>
            )}
         </DashboardContainer>
         <Footer />
      </>
   )
}

export default ReviewsDashboardd
