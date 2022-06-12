import React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import SearchBar from '../SearchBar'
import { HeaderType } from '../../types/enums'

interface Props {
  type: HeaderType
}

export default function SearchAppBar({ type }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {type}
        </Typography>
        <SearchBar type={type} />
      </Toolbar>
    </Box>
  )
}
