import { Chip as MuiChip, styled } from '@mui/material'
import { forwardRef } from 'react'
import { Icons } from '../../assets/icons'

const Chip = forwardRef(({ label, onDelete }, ref) => (
   <StyledCustomChip
      ref={ref}
      label={label}
      onDelete={onDelete}
      deleteIcon={<img src={Icons.cancel} />}
   />
))

export default Chip

const StyledCustomChip = styled(MuiChip)(() => ({
   backgroundColor: '#E8E8E8',
   border: '1px solid #CDCDCD',
   borderRadius: '4px',
   color: '#1f1f1f',
   height: 'auto',
   maxHeight: '50px',
   width: 'auto',
   maxWidth: '150px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '6px 10px',

   '.MuiChip-label': {
      height: '20px',
      fontWeight: 400,
      fontSize: '14px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },

   '.MuiChip-deleteIcon': {
      color: '#292929',
      width: 'auto',
      height: 'auto',
      maxWidth: '20px',
      maxHeight: '20px',
      '&:hover': {
         color: '#1f1f1f',
      },
   },
}))
