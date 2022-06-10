import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface DetailCardProps {
  logo: string
  title: string
  amount: string
}

export default function DetailCard({ logo, title, amount }: DetailCardProps) {
  return (
    <Box
      data-testid={title}
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
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            ml: 1,
          }}
        >
          <img
            src={logo}
            alt={title}
            style={{
              marginRight: 20,
            }}
          />
          <div
            style={{
              marginTop: 17,
            }}
          >
            <Stack direction="column">
              <Typography fontFamily="Lato" fontWeight="bold" variant="h6">
                {title}
              </Typography>
              <Typography
                fontFamily="Lato"
                fontWeight="thin"
                color="#336CFB"
                variant="h5"
              >
                {amount}
              </Typography>
            </Stack>
          </div>
        </Stack>
      </Paper>
    </Box>
  )
}
