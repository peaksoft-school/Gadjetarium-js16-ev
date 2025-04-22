import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { Icons } from '../assets/icons'

const products = [
   {
      id: 1,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
   },
   {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
   },
   {
      id: 3,
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
   },
   {
      id: 4,
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620',
   },
]

export default function GadgetariumSlider() {
   const [currentIndex, setCurrentIndex] = useState(0)
   const [transitioning, setTransitioning] = useState(false)

   const nextSlide = () => {
      if (transitioning) return
      setTransitioning(true)
      setTimeout(() => {
         setCurrentIndex((prev) => (prev + 1) % products.length)
      }, 50)
   }

   const prevSlide = () => {
      if (transitioning) return
      setTransitioning(true)
      setTimeout(() => {
         setCurrentIndex(
            (prev) => (prev - 1 + products.length) % products.length
         )
      }, 50)
   }

   useEffect(() => {
      const timer = setTimeout(() => setTransitioning(false), 800)
      return () => clearTimeout(timer)
   }, [currentIndex])

   const getSlidePosition = (index) => {
      const total = products.length
      const diff = (index - currentIndex + total) % total

      if (diff === 0) return 'center'
      if (diff === 1) return 'right'
      if (diff === total - 1) return 'left'
      return 'hidden'
   }

   return (
      <FullscreenContainer>
         <SliderContainer>
            {products.map((product, index) => {
               const position = getSlidePosition(index)
               return (
                  <Slide
                     key={product.id}
                     position={position}
                     transitioning={transitioning}
                  >
                     <SlideImage
                        style={{ backgroundImage: `url(${product.image})` }}
                     />
                     {position === 'center' && <SlideContent></SlideContent>}
                  </Slide>
               )
            })}

            <NavButtonLeft onClick={prevSlide} disabled={transitioning}>
               <ArrowIcon src={Icons.arrowLeftWhite} alt="Previous" />
            </NavButtonLeft>

            <NavButtonRight onClick={nextSlide} disabled={transitioning}>
               <ArrowIcon src={Icons.arrowRightWhite} alt="Next" />
            </NavButtonRight>
         </SliderContainer>
      </FullscreenContainer>
   )
}

const FullscreenContainer = styled('div')({
   width: '100vw',
   height: '100vh',
   overflow: 'hidden',
   position: 'relative',
   backgroundColor: '#0a0a0a',
})

const SliderContainer = styled('div')({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100vw',
   height: '100vh',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
})

const Slide = styled('div')(({ position, transitioning }) => {
   const common = {
      position: 'absolute',
      height: '70%',
      borderRadius: '4px',
      overflow: 'hidden',
      transition: transitioning ? 'all 0.6s ease-in-out' : 'none',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
      filter: position === 'center' ? 'none' : 'brightness(0.7)',
      '&:hover': {
         filter: position !== 'center' ? 'brightness(0.8)' : 'none',
      },
      zIndex: position === 'center' ? 3 : 2,
   }

   if (position === 'center') {
      return {
         ...common,
         width: '50%',
         transform: 'translateX(0%) scale(1)',
         left: '50%',
         transformOrigin: 'center',
         transform: 'translateX(-50%) scale(1)',
      }
   }

   if (position === 'left') {
      return {
         ...common,
         width: '25%',
         transform: 'translateX(-120%) scale(0.9)',
         left: '50%',
         transformOrigin: 'center',
         transform: 'translateX(-200%) scale(0.9)',
         height: '78vh',
      }
   }

   if (position === 'right') {
      return {
         ...common,
         width: '25%',
         transform: 'translateX(120%) scale(0.9)',
         left: '50%',
         transformOrigin: 'center',
         transform: 'translateX(100%) scale(0.9)',
         height: '78vh',
        }
   }

   return {
      ...common,
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateX(0) scale(0)',
   }
})

const SlideImage = styled('div')({
   width: '100%',
   height: '100%',
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   position: 'relative',
   transition: 'transform 0.3s ease',
})

const SlideContent = styled('div')({
   position: 'absolute',
   bottom: 0,
   left: 0,
   right: 0,
   padding: '30px',
   background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
   color: '#ffffff',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   transition: 'all 0.3s ease',
})

const NavButton = styled(IconButton)({
   position: 'fixed',
   top: '50%',
   transform: 'translateY(-50%)',
   backgroundColor: 'rgba(0,0,0,0.5)',
   width: '50px',
   height: '50px',
   borderRadius: '50%',
   zIndex: 10,
   transition: 'all 0.3s ease',
   '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      transform: 'translateY(-50%) scale(1.1)',
   },
   '&:disabled': {
      opacity: 0.3,
   },
})

const NavButtonLeft = styled(NavButton)({
   left: '20vw',
})

const NavButtonRight = styled(NavButton)({
   right: '20vw',
})

const ArrowIcon = styled('img')({
   width: '15vw',
   height: '15vh',
   transition: 'transform 0.2s ease',
})
