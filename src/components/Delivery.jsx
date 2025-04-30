import { Container, styled, Typography } from '@mui/material'
import { Icons } from '../assets/icons'

const Delivery = () => {
   return (
      <StyledDelivery>
         {/* Header */}

         <StyledContent>
            {/* BreadCrumbs */}

            <StyledText>Доставка</StyledText>

            <StyledInfo>
               <Typography color="grey">
                  Город доставки
                  <Typography
                     ml={0.5}
                     sx={{ display: 'inline-block' }}
                     color="black"
                  >
                     Бишкек
                  </Typography>
               </Typography>
               <Container>
                  <StyledContainerInfo>
                     <StyledoneInfo>
                        <img
                           src={Icons.fastDelivery}
                           style={{ height: '30px', width: '26px' }}
                        />
                        <Typography>
                           <Typography sx={{ fontWeight: 700 }}>
                              Самовывоз со склада
                           </Typography>
                           Забрать в течение 14 дней
                        </Typography>
                     </StyledoneInfo>

                     <StyledoneInfo>
                        <img
                           src={Icons.cash}
                           style={{ height: '30px', width: '26px' }}
                        />
                        <Typography>Предоплата не требуется</Typography>
                     </StyledoneInfo>
                  </StyledContainerInfo>
                  <StyledContainerInfo>
                     <StyledoneInfo>
                        <img
                           src={Icons.fastDelivery}
                           style={{ height: '30px', width: '26px' }}
                        />
                        <Typography>
                           <Typography sx={{ fontWeight: 700 }}>
                              Самовывозиз магазина
                           </Typography>
                           Забрать в течение 14 дней
                        </Typography>
                     </StyledoneInfo>

                     <StyledoneInfo>
                        <img
                           src={Icons.cash}
                           style={{ height: '30px', width: '26px' }}
                        />
                        <Typography>Предоплата не требуется</Typography>
                     </StyledoneInfo>
                  </StyledContainerInfo>
                  <StyledContainerInfo>
                     <StyledoneInfo>
                        <img
                           src={Icons.fastDelivery}
                           style={{ height: '30px', width: '26px' }}
                        />
                        <Typography>
                           <Typography sx={{ fontWeight: 700 }}>
                              Доставка
                           </Typography>
                           По городу 200сом, по регионам Бесплатная доставка при
                           покупках свыше — 10 000с.
                        </Typography>
                     </StyledoneInfo>

                     <StyledoneInfo>
                        <img
                           src={Icons.cash}
                           style={{ height: '30px', width: '26px' }}
                        />
                        <Typography>Предоплата не требуется</Typography>
                     </StyledoneInfo>
                  </StyledContainerInfo>
               </Container>
            </StyledInfo>
         </StyledContent>

         {/* Footer */}
      </StyledDelivery>
   )
}

export default Delivery

const StyledDelivery = styled(Container)({})

const StyledContent = styled(Container)({
   padding: '63px 195px 120px 195px',
})

const StyledText = styled(Typography)({
   padding: 0,
   paddingBottom: 20,
   borderBottom: '1px solid #CDCDCD',
   fontWeight: 500,
})

const StyledInfo = styled(Container)({})
const StyledContainerInfo = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
})

const StyledoneInfo = styled(Container)({
   display: 'flex',
   gap: '12px',
})
