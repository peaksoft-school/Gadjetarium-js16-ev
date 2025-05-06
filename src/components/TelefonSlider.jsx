import { useState } from 'react'
import { Telefon } from '../utils/constants'
import { IconButton, styled } from '@mui/material'
import { Icons } from '../assets/icons'

const TelefonSlider = () => {
   const [currentIndex, setCurrentIndex] = useState(0)

   const handlePrev = () => {
      setCurrentIndex((prev) => (prev === 0 ? Telefon.length - 1 : prev - 1))
   }

   const handleNext = () => {
      setCurrentIndex((prev) => (prev === Telefon.length - 1 ? 0 : prev + 1))
   }

   const handleThumbnailClick = (index) => {
      setCurrentIndex(index)
   }

   return (
      <SliderWrapper>
         <MainImage src={Telefon[currentIndex].image} alt="Main" />

         <Thumbnails>
            <IconButton onClick={handlePrev}>
               <StyledIcon src={Icons.arrowLeft} alt="" />
            </IconButton>

            {Telefon.map((item, idx) => (
               <Thumbnail
                  key={item.id}
                  src={item.image}
                  alt={`Thumbnail ${idx}`}
                  className={currentIndex === idx ? 'selected' : ''}
                  onClick={() => handleThumbnailClick(idx)}
               />
            ))}

            <IconButton onClick={handleNext}>
               <StyledIcon src={Icons.arrowRight} />
            </IconButton>
         </Thumbnails>
      </SliderWrapper>
   )
}

export default TelefonSlider

const SliderWrapper = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const MainImage = styled('img')({
   height: '364px',
   marginBottom: '100px',
})

const Thumbnails = styled('div')({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   justifyContent: 'center',
})

const Thumbnail = styled('img')({
   width: '70px',
   height: '470',
   border: '1px solid transparent',
   borderRadius: '4px',
   cursor: 'pointer',
   transition: 'border .40s ease',
   '&.selected': {
      borderColor: '#CB11AB',
   },
})

const StyledIcon = styled('img')({
   width: '25px',
   height: '25px',
})
