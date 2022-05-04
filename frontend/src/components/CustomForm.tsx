import { Box, createTheme, Modal, ThemeProvider } from '@mui/material'

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 3,
}

const theme = createTheme({
  components: {
    MuiGrid: {
      defaultProps: {
        justifyContent: 'space-between',
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          width: 255,
        },
        variant: 'outlined',
        margin: 'normal',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: 13,
        },
      },
    },
  },
})

interface FormProps {
  children: any
  open: boolean
}

export default function CustomForm({ children, open }: FormProps) {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={open}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </ThemeProvider>
  )
}
