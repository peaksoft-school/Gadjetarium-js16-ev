import { useState } from 'react'
import {
   Accordion as MuiAccordion,
   AccordionSummary as MuiAccordionSummary,
   AccordionDetails as MuiAccordionDetails,
   Typography,
   Box,
   styled,
} from '@mui/material'
import { Icons } from '../assets/icons'
import Footer from '../layout/Footer'
import UserHeader from '../layout/user/UserHeader'
import { faqData } from '../utils/constants'

const FAQ = () => {
   const [expanded, setExpanded] = useState(null)

   const handleChange = (panel) => (_, isExpanded) => {
      setExpanded(isExpanded ? panel : false)
   }

   const ExpandIcon = ({ isExpanded }) => <ArrowIcon src={Icons.arrowR} alt="стрелка" isExpanded={isExpanded} />

   return (
      <>
         <UserHeader />
         <Wrapper>
            <MiniContainer>
               <MainTitle>FAQ</MainTitle>
               <Divider />
            </MiniContainer>
            <Centered>
               <Container>
                  <SubTitle>Часто задаваемые вопросы</SubTitle>

                  {faqData.map(({ id, question, answer }, index) => (
                     <Accordion
                        key={id}
                        expanded={expanded === id}
                        onChange={handleChange(id)}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandIcon isExpanded={expanded === id} />}
                        >
                           <QuestionNumber isExpanded={expanded === id}>
                              {index + 1}
                           </QuestionNumber>
                           <QuestionText>{question}</QuestionText>
                        </AccordionSummary>
                        <AccordionDetails>
                           {Array.isArray(answer) ? (
                              answer.map((paragraph, i) => (
                                 <AnswerText key={i}>{paragraph}</AnswerText>
                              ))
                           ) : (
                              <AnswerText>{answer}</AnswerText>
                           )}
                        </AccordionDetails>
                     </Accordion>
                  ))}
               </Container>
            </Centered>
         </Wrapper>
         <Footer />
      </>
   )
}

export default FAQ

const Wrapper = styled(Box)`
   background-color: #f9f9f9;
   padding: 40px 106px;
   font-family: 'Roboto', sans-serif;
   display: flex;
   justify-content: center;
   flex-direction: column;
`

const MiniContainer = styled(Box)``

const Centered = styled(Box)`
   display: flex;
   align-items: center;
   justify-content: center;
`

const Container = styled(Box)`
   display: flex;
   justify-content: center;
   flex-direction: column;
   width: 60vw;
   height: 79vh;
`

const MainTitle = styled(Typography)`
   font-size: 24px;
   font-weight: 700;
   color: #000;
   margin-bottom: 8px;
`

const Divider = styled(Box)`
   height: 1px;
   background-color: #c2bfbf;
   margin-bottom: 24px;
`

const SubTitle = styled(Typography)`
   display: flex;
   justify-content: center;
   font-size: 28px;
   font-weight: 700;
   color: #000;
   margin-bottom: 32px;
`

const Accordion = styled(MuiAccordion)`
   background-color: #fff;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
   margin-bottom: 12px;
   border-radius: 4px !important;
   &::before {
      display: none;
   }
`

const AccordionSummary = styled(MuiAccordionSummary)`
   padding: 16px;
   display: flex;
   align-items: center;
   & .MuiAccordionSummary-content {
      margin: 0;
      align-items: center;
   }
`

const AccordionDetails = styled(MuiAccordionDetails)`
   padding: 16px 24px;
`

const QuestionNumber = styled(Box)(({ isExpanded }) => ({
   width: '32px',
   height: '32px',
   borderRadius: '50%',
   backgroundColor: isExpanded ? '#e805d1' : '#f3d3e2',
   color: isExpanded ? '#fff' : '#e805d1',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   fontWeight: 700,
   fontSize: '16px',
   marginRight: '16px',
   transition: 'all 0.3s ease',
}))

const QuestionText = styled(Typography)`
   font-weight: 700;
   font-size: 16px;
   color: #000;
`

const AnswerText = styled(Typography)`
   font-size: 16px;
   line-height: 1.6;
   color: #333;
   margin-bottom: 12px;
`

const ArrowIcon = styled('img')(({ isExpanded }) => ({
   transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
   transition: 'transform 0.3s ease',
   width: '20px',
   height: '20px',
}))
