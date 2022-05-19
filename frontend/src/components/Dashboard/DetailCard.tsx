import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface DetailCardProps {
  logo: string
  title: string
  amount: number
}

export default function DetailCard({ logo, title, amount }: DetailCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 256,
          height: 128,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <img src={logo} alt={title} />
        <Typography fontFamily="Lato" variant="h6">
          {title}
        </Typography>
        <Typography fontFamily="Lato" variant="h5">
          {amount}
        </Typography>
      </Paper>
    </Box>
  )
}
