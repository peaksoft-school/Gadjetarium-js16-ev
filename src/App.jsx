import { Typography } from '@mui/material'
import { Themes } from './components/Themes';
import React from 'react'

export default function App() {
   return (
      <div>
         <Themes>
            <Typography variant="h1">H1 Ubuntu Bold</Typography>
            <Typography variant="h2">H2 Inter Medium</Typography>

            <Typography variant="h2" fontWeight={700}>
               H2 Inter Bold
            </Typography>

            <Typography variant="h4" className="MuiTypography-h4-regular">
               H4 Regular
            </Typography>
            <Typography variant="h4" className="MuiTypography-h4-medium">
               H4 Medium
            </Typography>

            <Typography sx={{ fontWeight: 300, fontSize: '16px' }}>
               Body Light
            </Typography>
            <Typography variant="bodyMedium">Body Medium (10px)</Typography>
         </Themes>
      </div>
   )
}
