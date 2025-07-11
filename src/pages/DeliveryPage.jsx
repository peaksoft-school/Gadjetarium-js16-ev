import { Container, styled, Typography } from '@mui/material'
import { Icons } from '../assets/icons'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'
import Breadcrumbs from '../components/UI/BreadCrums'

const DeliveryPage = () => {
   return (
      <div>
         <StyledDelivery>
            <Breadcrumbs />
            <StyledContent>
               <StyledText>Доставка</StyledText>

               <StyledInfo>
                  <Typography color="grey">
                     Город доставки
                     <StyledBlackText ml={0.5}>Бишкек</StyledBlackText>
                  </Typography>

                  <StyledPayContainer>
                     <StyledContainerInfo>
                        <StyledOneInfo>
                           <StyledIcon src={Icons.fastDelivery} />
                           <Typography>
                              <Typography fontWeight="bold">
                                 Самовывоз со склада
                              </Typography>
                              Забрать в течение 14 дней
                           </Typography>
                        </StyledOneInfo>
                        <StyledOneInfo>
                           <StyledIcon src={Icons.cash} />
                           <Typography>Предоплата не требуется</Typography>
                        </StyledOneInfo>
                     </StyledContainerInfo>

                     <StyledContainerInfo>
                        <StyledOneInfo>
                           <StyledIcon src={Icons.fastDelivery} />
                           <Typography>
                              <Typography fontWeight="bold">
                                 Самовывоз из магазина
                              </Typography>
                              Забрать в течение 14 дней
                           </Typography>
                        </StyledOneInfo>
                        <StyledOneInfo>
                           <StyledIcon src={Icons.cash} />
                           <Typography>Предоплата не требуется</Typography>
                        </StyledOneInfo>
                     </StyledContainerInfo>

                     <StyledContainerInfo>
                        <StyledOneInfo>
                           <StyledIcon src={Icons.fastDelivery} />
                           <Typography>
                              <Typography sx={{ fontWeight: 700 }}>
                                 Доставка
                              </Typography>
                              По городу 200сом, по регионам
                              <br /> Бесплатная доставка
                              <br /> при покупках свыше — 10 000с.
                           </Typography>
                        </StyledOneInfo>
                        <StyledOneInfo>
                           <StyledIcon src={Icons.cash} />
                           <Typography>Предоплата не требуется</Typography>
                        </StyledOneInfo>
                     </StyledContainerInfo>
                  </StyledPayContainer>
               </StyledInfo>

               <StyledPayInfo>
                  <Typography variant="h6">Способы оплаты</Typography>
                  <StyledBottomRow>
                     <StyledPayVariant>
                        <img src={Icons.card} />
                        <Typography>
                           Оплата картой <br /> онлайн
                        </Typography>
                     </StyledPayVariant>
                     <StyledPayVariant>
                        <img src={Icons.coin} />
                        <Typography>
                           Наличными при <br /> получении
                        </Typography>
                     </StyledPayVariant>
                     <StyledPayVariant>
                        <img src={Icons.buy} />
                        <Typography>
                           Картой <br /> при получении
                        </Typography>
                     </StyledPayVariant>
                  </StyledBottomRow>
               </StyledPayInfo>
            </StyledContent>
         </StyledDelivery>
      </div>
   )
}

export default DeliveryPage

const StyledDelivery = styled(Container)({
   padding: 30,
   width: '100%',
})

const StyledBottomRow = styled(Container)({
   display: 'flex',
   gap: '40px',
   padding: 0,
})

const StyledBlackText = styled(Typography)({
   display: 'inline-block',
   color: 'black',
   fontWeight: 'bold',
})

const StyledIcon = styled('img')({
   height: '30px',
   width: '26px',
})

const StyledContent = styled(Container)({
   padding: '40px 120px',
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   maxWidth: '1440px',
})

const StyledText = styled(Typography)({
   paddingBottom: 20,
   borderBottom: '1px solid #CDCDCD',
   fontWeight: 500,
   fontSize: '24px',
})

const StyledInfo = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: 0,
})

const StyledPayContainer = styled(Container)({
   display: 'flex',
   justifyContent: 'space-around',
   padding: 0,
   width: '100%',
})

const StyledContainerInfo = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   maxWidth: '400px',
   padding: '0 0 0 0',
})

const StyledOneInfo = styled('div')({
   display: 'flex',
   alignItems: 'flex-start',
   gap: '12px',
})

const StyledPayInfo = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   padding: 0,
})

const StyledPayVariant = styled('div')({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
})
