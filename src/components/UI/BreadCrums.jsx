import { useLocation, useNavigate } from 'react-router'
import { Box, Typography, styled } from '@mui/material'
import { forwardRef } from 'react'

const Breadcrumbs = forwardRef(({ baseLabel = 'Главная' }, ref) => {
   const location = useLocation()
   const navigate = useNavigate()

   const pathnames = location.pathname.split('/').filter(Boolean)

   const handleClick = (toIndex) => {
      const to = '/' + pathnames.slice(0, toIndex + 1).join('/')
      navigate(to)
   }

   return (
      <BreadcrumbWrapper ref={ref}>
         <Crumb onClick={() => navigate('/')} clickable="true">
            {baseLabel}
         </Crumb>
         {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1
            return (
               <Box key={index} display="flex" alignItems="center">
                  <DividerSymbol>»</DividerSymbol>
                  <Crumb
                     isLast={isLast ? 'true' : undefined}
                     clickable={!isLast ? 'true' : undefined}
                     onClick={() => !isLast && handleClick(index)}
                  >
                     {decodeURIComponent(
                        name.charAt(0).toUpperCase() + name.slice(1)
                     )}
                  </Crumb>
               </Box>
            )
         })}
      </BreadcrumbWrapper>
   )
})

export default Breadcrumbs

const BreadcrumbWrapper = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
})

const Crumb = styled(Typography, {
   shouldForwardProp: (prop) => prop !== 'isLast' && prop !== 'clickable',
})(({ isLast, clickable }) => ({
   fontSize: '24px',
   fontWeight: isLast ? 500 : 400,
   color: isLast ? '#292929' : '#8B8B8B',
   cursor: clickable ? 'pointer' : 'default',
   '&:hover': clickable ? { textDecoration: 'underline' } : {},
}))

const DividerSymbol = styled(Typography)({
   fontSize: '24px',
   color: '#8B8B8B',
   margin: '0 8px',
})
