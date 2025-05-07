import { Box, Container, styled, TextField, Typography } from '@mui/material'
import UserHeader from '../layout/user/UserHeader'
import Footer from '../layout/Footer'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'

const ContactPage = () => {
   return (
      <div>
         <UserHeader />
         <StyledContentBox>
            <StyledContacts>
               <StyledContent>
                  <StyledText>Контакты</StyledText>
               </StyledContent>

               <StyledInfoInContacts>
                  <StyledLeftInfo>
                     <Typography variant="h4" pl={2.8}>
                        Магазин Gadgetarium
                     </Typography>
                     <Container
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '24px',
                        }}
                     >
                        <Box>
                           <StyledBlackText>Адрес:</StyledBlackText>
                           <Typography variant="subtitle1">
                              г. Бишкек, ул. Гражданская 119
                           </Typography>
                        </Box>
                        <Box>
                           <StyledBlackText>Телефон:</StyledBlackText>
                           <Typography variant="subtitle1">
                              +996(400) 00-00-00
                           </Typography>
                        </Box>
                        <Box>
                           <StyledBlackText>Почта:</StyledBlackText>
                           <Typography variant="subtitle1">
                              Gadgetarium.kg
                           </Typography>
                        </Box>
                        <Box>
                           <StyledBlackText>Режим работы:</StyledBlackText>
                           <Typography variant="subtitle1">
                              10:00 - 21:00
                           </Typography>
                        </Box>
                     </Container>
                  </StyledLeftInfo>

                  <StyledRightForm>
                     <Typography variant="h4" pl={2.8} fontWeight={700}>
                        Напишите нам
                     </Typography>
                     <StyledForm>
                        <Row>
                           <Box sx={{ flex: 1 }}>
                              <Typography
                                 fontSize="14px"
                                 fontWeight={500}
                                 mb={1}
                              >
                                 Имя <span style={{ color: 'red' }}>*</span>
                              </Typography>
                              <Input placeholder="Напишите ваше имя" />
                           </Box>
                           <Box sx={{ flex: 1 }}>
                              <Typography
                                 fontSize="14px"
                                 fontWeight={500}
                                 mb={1}
                              >
                                 Фамилия <span style={{ color: 'red' }}>*</span>
                              </Typography>
                              <Input placeholder="Напишите вашу фамилию" />
                           </Box>
                        </Row>
                        <Row>
                           <Box sx={{ flex: 1 }}>
                              <Typography
                                 fontSize="14px"
                                 fontWeight={500}
                                 mb={1}
                              >
                                 E-mail <span style={{ color: 'red' }}>*</span>
                              </Typography>
                              <Input placeholder="Напишите ваш email" />
                           </Box>
                           <Box sx={{ flex: 1 }}>
                              <Typography
                                 fontSize="14px"
                                 fontWeight={500}
                                 mb={1}
                              >
                                 Телефон <span style={{ color: 'red' }}>*</span>
                              </Typography>
                              <Input placeholder="+996 (_ _ _) _ _  _ _  _ _" />
                           </Box>
                        </Row>
                        <Box>
                           <Typography fontSize="14px" fontWeight={500} mb={1}>
                              Сообщение
                           </Typography>
                           <StyledTextField
                              multiline
                              rows={4}
                              placeholder="Напишите сообщение"
                              fullWidth
                           />
                        </Box>
                        <Button variant="contained">ОТПРАВИТЬ</Button>
                     </StyledForm>
                  </StyledRightForm>
               </StyledInfoInContacts>
            </StyledContacts>

            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.857806848455!2d74.62493107489409!3d42.87584530236189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb78fc81678db%3A0x8f6025b536a29455!2sPeaksoft%20house!5e0!3m2!1sru!2skg!4v1746097749285!5m2!1sru!2skg"
               width="80%"
               height="569"
               style={{ margin: '120px' }}
               allowFullScreen=""
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
         </StyledContentBox>
         <Footer />
      </div>
   )
}

export default ContactPage


const StyledContacts = styled(Container)({
   padding: 30,
   width: '100%',
})

const StyledContent = styled(Container)({
   padding: '40px 120px',
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   maxWidth: '1440px',
})

const StyledContentBox = styled(Container)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const StyledText = styled(Typography)({
   paddingBottom: 20,
   borderBottom: '1px solid #CDCDCD',
   fontWeight: 500,
   fontSize: '24px',
})

const StyledLeftInfo = styled(Container)({
   width: '372px',
   height: '272px',
   display: 'flex',
   flexDirection: 'column',
   gap: '47px',
   alignItems: 'start',
})

const StyledRightForm = styled(Container)({
   width: '668px',
})

const StyledBlackText = styled(Typography)({
   color: 'black',
   fontWeight: '700',
})

const StyledInfoInContacts = styled(Container)({
   display: 'flex',
   justifyContent: 'space-between',
})

const StyledForm = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '32px',
   borderRadius: '8px',
   width: '100%',
   maxWidth: '760px',
   marginTop: '40px',
})

const Row = styled(Box)({
   display: 'flex',
   gap: '20px',
   flexWrap: 'nowrap',
   width: '100%',
   justifyContent: 'space-between',
})

const StyledTextField = styled(TextField)({
   flex: 1,
   backgroundColor: '#fff',
   '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
   },
   '& .MuiInputLabel-root': {
      fontSize: '14px',
   },
})
