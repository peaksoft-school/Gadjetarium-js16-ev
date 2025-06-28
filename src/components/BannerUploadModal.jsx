import { useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Icons } from '../assets/icons'
import { useDispatch } from 'react-redux'
import { postBanner } from '../store/banner/bannerThunk'

const ModalBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 700,
   height: 630,
   background: theme.palette.background.paper,
   borderRadius: 16,
   boxShadow: 24,
   padding: '40px 36px 32px 36px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

const Title = styled('h2')({
   textAlign: 'center',
   margin: 0,
   marginBottom: 32,
   fontWeight: 500,
   fontSize: 36,
   color: '#232323',
})

const Grid = styled(Box)({
   width: '100%',
   background: '#F3F4F8',
   borderRadius: 12,
   padding: '32px 20px 24px 20px',
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gridTemplateRows: 'repeat(2, 1fr)',
   gap: 24,
   marginBottom: 36,
   minHeight: 320,
   alignItems: 'center',
   justifyItems: 'center',
})

const Placeholder = styled(Box)({
   width: 180,
   height: 160,
   background: 'none',
   borderRadius: 12,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#A1A6B1',
   fontSize: 18,
   cursor: 'pointer',
   border: 'none',
   position: 'relative',
   transition: 'background 0.2s',
   '&:hover': { background: '#ececec' },
})

const Preview = styled(Box)({
   width: 180,
   height: 160,
   borderRadius: 12,
   overflow: 'hidden',
   position: 'relative',
   background: '#fff',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
})

const RemoveButton = styled(IconButton)({
   position: 'absolute',
   top: 10,
   right: 10,
   background: '#E3E4E8',
   boxShadow: 1,
   width: 36,
   height: 36,
   padding: 0,
   '&:hover': { background: '#D1D2D6' },
   zIndex: 2,
})

const Actions = styled(Box)({
   display: 'flex',
   gap: 24,
   width: '100%',
})

const BannerUploadModal = ({ onClose }) => {
   const dispatch = useDispatch()
   const [images, setImages] = useState([])
   const inputRef = useRef(null)

   const handleFileChange = (event) => {
      const files = Array.from(event.target.files).slice(0, 6 - images.length)
      const newImages = files.map((file) => ({
         url: URL.createObjectURL(file),
         file,
      }))
      setImages((prev) => [...prev, ...newImages])
      event.target.value = null
   }

   const handleRemove = (idx) => {
      setImages((prev) => prev.filter((_, i) => i !== idx))
   }

   const handleUpload = async () => {
      if (images.length === 0) return
      const files = images.map((img) => img.file)
      await dispatch(postBanner(files))
      onClose()
   }

   const gridItems = []

   if (images.length < 6) {
      gridItems.push(
         <Placeholder key="placeholder" onClick={() => inputRef.current.click()}>
            <img
               src={Icons.addPhoto}
               alt="add"
               style={{ width: 56, height: 56, marginBottom: 14, opacity: 0.7 }}
            />
            <div style={{ textAlign: 'center', color: '#A1A6B1', fontSize: 18 }}>
               Добавить фото
            </div>
            <input
               ref={inputRef}
               type="file"
               accept="image/*"
               multiple
               style={{ display: 'none' }}
               onChange={handleFileChange}
            />
         </Placeholder>
      )
   }

   images.forEach((img, idx) => {
      gridItems.push(
         <Preview key={idx}>
            <img
               src={img.url}
               alt="preview"
               style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 12,
               }}
            />
            <RemoveButton size="small" onClick={() => handleRemove(idx)}>
               <img src={Icons.trash} alt="delete" style={{ width: 22, height: 22 }} />
            </RemoveButton>
         </Preview>
      )
   })

   while (gridItems.length < 6) {
      gridItems.push(<Box key={`empty-${gridItems.length}`} />)
   }

   return (
      <ModalBox>
         <Title>Загрузить баннер</Title>
         <Grid>{gridItems}</Grid>
         <Actions>
            <Button
               variant="outlined"
               fullWidth
               onClick={onClose}
               sx={{
                  color: '#D100C9',
                  borderColor: '#D100C9',
                  fontWeight: 500,
                  fontSize: 20,
                  height: 56,
                  letterSpacing: 0,
                  '&:hover': { borderColor: '#D100C9', background: '#F9E6F9' },
               }}
            >
               ОТМЕНИТЬ
            </Button>
            <Button
               variant="contained"
               fullWidth
               onClick={handleUpload}
               disabled={images.length === 0}
               sx={{
                  background: '#D100C9',
                  fontWeight: 500,
                  fontSize: 20,
                  height: 56,
                  letterSpacing: 0,
                  '&:hover': { background: '#B000B0' },
               }}
            >
               ЗАГРУЗИТЬ
            </Button>
         </Actions>
      </ModalBox>
   )
}

export default BannerUploadModal
