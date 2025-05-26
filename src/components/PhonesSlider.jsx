import { useState } from 'react'
import { styled } from '@mui/material'
import { Icons } from '../assets/icons'
import { PHONE_SLIDER } from '../utils/constants'

const PhonesSlider = () => {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [isModalOpen, setIsModalOpen] = useState(false)

   const handlePrev = (e) => {
      e?.stopPropagation()

      setCurrentIndex((prev) =>
         prev === 0 ? PHONE_SLIDER.length - 1 : prev - 1
      )
   }

   const handleNext = (e) => {
      e?.stopPropagation()

      setCurrentIndex((prev) =>
         prev === PHONE_SLIDER.length - 1 ? 0 : prev + 1
      )
   }

   const handleThumbnailClick = (i) => setCurrentIndex(i)

   const handleImageClick = () => setIsModalOpen(true)

   const handleCloseModal = () => setIsModalOpen(false)

   return (
      <SliderWrapper>
         <MainImage
            src={PHONE_SLIDER[currentIndex].image}
            alt="Main"
            onClick={handleImageClick}
         />

         <Thumbnails>
            <NavIcon src={Icons.arrowLeft} alt="prev" onClick={handlePrev} />

            {PHONE_SLIDER.map(({ id, image }, idx) => (
               <Thumbnail
                  key={id}
                  src={image}
                  alt={`Thumbnail ${idx}`}
                  className={currentIndex === idx ? 'selected' : ''}
                  onClick={() => handleThumbnailClick(idx)}
               />
            ))}

            <NavIcon src={Icons.arrowRight} alt="next" onClick={handleNext} />
         </Thumbnails>

         {isModalOpen && (
            <ModalBackdrop onClick={handleCloseModal}>
               <ModalImageContainer onClick={(e) => e.stopPropagation()}>
                  <CloseIcon
                     src={Icons.cancel}
                     alt="close"
                     onClick={handleCloseModal}
                  />

                  <ArrowIcon
                     src={Icons.arrowLeftWhite}
                     alt="prev"
                     position="left"
                     onClick={handlePrev}
                  />

                  <ZoomedImage
                     src={PHONE_SLIDER[currentIndex].image}
                     alt="Zoomed"
                  />

                  <ArrowIcon
                     src={Icons.arrowRightWhite}
                     alt="next"
                     position="right"
                     onClick={handleNext}
                  />
               </ModalImageContainer>
            </ModalBackdrop>
         )}
      </SliderWrapper>
   )
}

export default PhonesSlider

const SliderWrapper = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
})

const MainImage = styled('img')({
   height: '364px',
   marginBottom: '100px',
   cursor: 'pointer',
})

const Thumbnails = styled('div')({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   justifyContent: 'center',
})

const Thumbnail = styled('img')({
   width: '70px',
   height: '70px',
   border: '1px solid transparent',
   cursor: 'pointer',
   transition: 'border .60s ease',
   '&.selected': {
      borderColor: '#CB11AB',
   },
})

const NavIcon = styled('img')({
   width: '25px',
   height: '25px',
   cursor: 'pointer',
   transition: 'opacity 0.3s ease',
   '&:hover': {
      opacity: 0.7,
   },
})

const ModalBackdrop = styled('div')({
   position: 'fixed',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(23, 23, 23, 0.8)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   zIndex: 1000,
})

const ModalImageContainer = styled('div')({
   position: 'relative',
   maxWidth: '55vw',
   marginBottom: '150px',
})

const ZoomedImage = styled('img')({
   maxWidth: '100%',
   maxHeight: '100%',
})

const ArrowIcon = styled('img')(({ position }) => ({
   position: 'absolute',
   top: '50%',
   [position]: 20,
   transform: 'translateY(-50%)',
   width: '60px',
   height: '60px',
   cursor: 'pointer',
   transition: 'opacity 0.30s ease',
   '&:hover': {
      opacity: 0.7,
   },
}))

const CloseIcon = styled('img')({
   position: 'absolute',
   top: 100,
   right: 10,
   width: '24px',
   height: '24px',
   cursor: 'pointer',
   filter: 'invert(1)',
   transition: 'filter 0.3s ease',
   '&:hover': {
      filter: 'invert(42%) sepia(72%) saturate(1500%) hue-rotate(290deg)',
      color: 'gray',
   },
})
