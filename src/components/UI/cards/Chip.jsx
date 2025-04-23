import { Chip } from '@mui/material'
import styled from '@emotion/styled'
import { Icons } from '../../../assets/icons'

const StyledChip = ({ label, onDelete }) => {
   return (
      <CustomChip
         label={label}
         onDelete={onDelete}
         deleteIcon={<img src={Icons.cancel} />}
      />
   )
}

export default StyledChip

const CustomChip = styled(Chip)(() => ({
   backgroundColor: '#CDCDCD',
   border: '1px solid #E8E8E8',
   borderRadius: '4px',
   color: '#1f1f1f',
   height: 'auto',
   maxHeight: '50px',
   width: 'auto',
   maxWidth: '150px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',

   '.MuiChip-label': {
      height: '20px',
      fontWeight: 400,
      fontSize: '14px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },

   '.MuiChip-deleteIcon': {
      color: '#1f1f1f',
      width: 'auto',
      height: 'auto',
      maxWidth: '20px',
      maxHeight: '20px',
      '&:hover': {
         color: '#1f1f1f',
      },
   },
}))
