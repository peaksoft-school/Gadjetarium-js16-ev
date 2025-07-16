import { useEffect, useRef, useState } from 'react'
import { Box, Card, CardMedia, IconButton, styled } from '@mui/material'

const BannerSlider = ({ images }) => {
   const [index, setIndex] = useState(0)
   const sliderRef = useRef()

   const goTo = (i) => setIndex((i + images.length) % images.length)

   useEffect(() => {
      const interval = setInterval(() => {
         setIndex((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
   }, [images.length])

   const handleClick = (e) => {
      const rect = sliderRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickPercent = (clickX / rect.width) * 100

      if (clickPercent > 80) goTo(index + 1)
      else if (clickPercent < 20) goTo(index - 1)
   }

   return (
      <Wrapper>
         <SliderWrapper ref={sliderRef} onClick={handleClick}>
            <SlidesContainer index={index}>
               {images.map((img) => (
                  <Slide key={img.id}>
                     <SlideImage src={img} alt={`Slide ${img.id}`} />
                  </Slide>
               ))}
            </SlidesContainer>
         </SliderWrapper>

         <DotsContainer>
            {images.map((_, i) => (
               <Dot key={i} active={i === index} onClick={() => goTo(i)} />
            ))}
         </DotsContainer>
      </Wrapper>
   )
}

export default BannerSlider

const Wrapper = styled(Box)({
   width: '100%',
   height: '600px',
})

const SliderWrapper = styled(Box)({
   overflow: 'hidden',
   height: '100%',
   width: '100%',
   cursor: 'pointer',
})

const SlidesContainer = styled(Box)(({ index }) => ({
   display: 'flex',
   transform: `translateX(-${index * 100}%)`,
   transition: 'transform 0.5s ease',
   width: '100%',
}))

const Slide = styled(Card)({
   width: '100%',
   height: '580px',
   flexShrink: 0,
   borderRadius: 0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
})

const SlideImage = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover', 
})

const DotsContainer = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 16,
   gap: 8,
})

const Dot = styled(IconButton, {
   shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
   width: active ? 14 : 8,
   height: active ? 14 : 8,
   borderRadius: '50%',
   backgroundColor: active ? theme.palette.primary.main : '#CB11AB4D',
   padding: 0,
   '&:hover': {
      backgroundColor: active ? theme.palette.primary.main : '#CB11AB4D',
   },
}))
