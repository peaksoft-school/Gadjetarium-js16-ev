import { useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { postBanner } from '../store/banner/bannerThunk'
import { Icons } from '../assets/icons'

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

   const handleRemove = (index) =>
      setImages((prev) => prev.filter((_, i) => i !== index))

   const handleUpload = async () => {
      if (!images.length) return
      const files = images.map((img) => img.file)
      await dispatch(postBanner(files))
      onClose()
   }

   const gridItems = images.map((img, idx) => (
      <Preview key={idx}>
         <StyledImage src={img.url} alt="preview" />
         <RemoveButton size="small" onClick={() => handleRemove(idx)}>
            <Icon src={Icons.deleteb} alt="delete" />
         </RemoveButton>
      </Preview>
   ))

   if (images.length < 6) {
      gridItems.push(
         <Placeholder
            key="placeholder"
            onClick={() => inputRef.current.click()}
         >
            <Icon src={Icons.photo} alt="add" />
            <LabelText>Добавить фото</LabelText>
            <input
               ref={inputRef}
               type="file"
               accept="image/*"
               multiple
               hidden
               onChange={handleFileChange}
            />
         </Placeholder>
      )
   }

   while (gridItems.length < 6)
      gridItems.push(<Box key={`empty-${gridItems.length}`} />)

   return (
      <ModalBox>
         <Title>Загрузить баннер</Title>
         <Grid>{gridItems}</Grid>
         <Actions>
            <StyledButton variant="outlined" onClick={onClose}>
               Отменить
            </StyledButton>
            <StyledButton
               variant="contained"
               onClick={handleUpload}
               disabled={!images.length}
            >
               Загрузить
            </StyledButton>
         </Actions>
      </ModalBox>
   )
}

export default BannerUploadModal

const ModalBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 720,
   background: theme.palette.background.paper,
   borderRadius: 20,
   boxShadow: theme.shadows[5],
   padding: '40px 36px 32px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

const Title = styled(Typography)({
   fontSize: 32,
   fontWeight: 600,
   color: '#1A1A1A',
   marginBottom: 32,
})

const Grid = styled(Box)({
   width: '100%',
   background: '#F5F7FA',
   borderRadius: 16,
   padding: 24,
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: 20,
   marginBottom: 32,
   minHeight: 320,
   alignItems: 'center',
   justifyItems: 'center',
})

const Placeholder = styled(Box)({
   width: 180,
   height: 160,
   background: '#FFFFFF',
   border: '2px dashed #C4C4C4',
   borderRadius: 12,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   cursor: 'pointer',
   transition: 'background 0.25s ease',
   '&:hover': { background: '#F0F0F0' },
})

const LabelText = styled(Typography)({
   fontSize: 14,
   color: '#A1A6B1',
})

const Icon = styled('img')({
   width: 50,
   height: 50,
   opacity: 0.6,
   marginBottom: 10,
})

const StyledImage = styled('img')({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
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
   boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
})

const RemoveButton = styled(IconButton)({
   position: 'absolute',
   top: 8,
   right: 8,
   background: '#F1F1F1',
   width: 32,
   height: 32,
   padding: 4,
   '&:hover': { background: '#E0E0E0' },
})

const Actions = styled(Box)({
   display: 'flex',
   gap: 20,
   width: '100%',
})

const StyledButton = styled(Button)({
   flex: 1,
   fontWeight: 500,
   fontSize: 16,
   height: 48,
})
