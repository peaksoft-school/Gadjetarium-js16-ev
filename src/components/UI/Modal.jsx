import { Modal as MuiModal, Box, styled } from '@mui/material'

const Modal = ({ open, onClose, children }) => (
   <MuiModal open={open} onClose={onClose}>
      <StyledBox onClick={(e) => e.stopPropagation()}>{children}</StyledBox>
   </MuiModal>
)

export default Modal

const StyledBox = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   backgroundColor: theme.palette.background.paper,
   borderRadius: theme.shape.borderRadius * 2,
   boxShadow: theme.shadows[5],
   padding: theme.spacing(4),
   minWidth: 300,
}))
