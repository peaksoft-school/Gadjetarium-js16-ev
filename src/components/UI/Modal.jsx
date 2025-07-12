import { Modal as MuiModal, Box, styled } from '@mui/material'

const Modal = ({ open, onClose, children, name = '12px' }) => (
   <MuiModal open={open} onClose={onClose}>
      <StyledBox onClick={(e) => e.stopPropagation()} name={name}>
         {children}
      </StyledBox>
   </MuiModal>
)

export default Modal

const StyledBox = styled(Box)(({ theme, name }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   backgroundColor: 'none',
   borderRadius: name,
   boxShadow: theme.shadows[5],
   border: 'none',
   minWidth: 300,
}))
