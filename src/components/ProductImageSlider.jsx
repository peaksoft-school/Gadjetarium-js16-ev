import React, { useState } from 'react'
import styled from 'styled-components'
import { Icons } from '../../assets' // или где у тебя лежат иконки

const ProductImageSlider = ({ images = [] }) => {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [isModalOpen, setIsModalOpen] = useState(false)

   const handlePrev = (e) => {
      e?.stopPropagation()
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
   }

   const handleNext = (e) => {
      e?.stopPropagation()
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
   }

   const handleThumbnailClick = (index) => {
      setCurrentIndex(index)
   }

   const handleImageClick = () => {
      setIsModalOpen(true)
   }

   const handleCloseModal = () => {
      setIsModalOpen(false)
   }

   if (!images.length) return null

   return (
      <Wrapper>
         <MainImage
            src={images[currentIndex]}
            alt="Main Product"
            onClick={handleImageClick}
         />
         <ThumbnailList>
            <Icon src={Icons.arrowLeft} onClick={handlePrev} />
            {images.map((img, index) => (
               <Thumbnail
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  isActive={index === currentIndex}
                  onClick={() => handleThumbnailClick(index)}
               />
            ))}
            <Icon src={Icons.arrowRight} onClick={handleNext} />
         </ThumbnailList>

         {isModalOpen && (
            <ModalOverlay onClick={handleCloseModal}>
               <ModalContent onClick={(e) => e.stopPropagation()}>
                  <CloseButton src={Icons.cancel} onClick={handleCloseModal} />
                  <ModalArrow
                     src={Icons.arrowLeftWhite}
                     onClick={handlePrev}
                     left
                  />
                  <ZoomedImage src={images[currentIndex]} alt="Zoomed" />
                  <ModalArrow
                     src={Icons.arrowRightWhite}
                     onClick={handleNext}
                  />
               </ModalContent>
            </ModalOverlay>
         )}
      </Wrapper>
   )
}

export default ProductImageSlider

// Styled-components:
const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 12px;
`

const MainImage = styled.img`
   width: 100%;
   height: 400px;
   object-fit: contain;
   border-radius: 16px;
   cursor: zoom-in;
`

const ThumbnailList = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   overflow-x: auto;
`

const Thumbnail = styled.img`
   width: 60px;
   height: 60px;
   object-fit: cover;
   border-radius: 8px;
   border: ${({ isActive }) =>
      isActive ? '2px solid #000' : '1px solid #ccc'};
   cursor: pointer;
   transition: border 0.2s ease;
`

const Icon = styled.img`
   width: 24px;
   height: 24px;
   cursor: pointer;
`

const ModalOverlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.85);
   z-index: 9999;
   display: flex;
   justify-content: center;
   align-items: center;
`

const ModalContent = styled.div`
   position: relative;
   max-width: 90%;
   max-height: 90%;
`

const ZoomedImage = styled.img`
   width: 100%;
   height: auto;
   max-height: 90vh;
   object-fit: contain;
`

const CloseButton = styled.img`
   position: absolute;
   top: 12px;
   right: 12px;
   width: 32px;
   height: 32px;
   cursor: pointer;
`

const ModalArrow = styled.img`
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   width: 32px;
   height: 32px;
   cursor: pointer;
   left: ${({ left }) => (left ? '16px' : 'auto')};
   right: ${({ left }) => (left ? 'auto' : '16px')};
`
