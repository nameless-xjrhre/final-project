import { Fab } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheelchair } from '@fortawesome/free-solid-svg-icons'
import AddIcon from '@mui/icons-material/Add'

interface AddPatientBtnProps {
  handleOpen: () => void
}

export default function AddPatientBtn({ handleOpen }: AddPatientBtnProps) {
  return (
    <Fab
      onClick={handleOpen}
      color="primary"
      sx={{
        right: 30,
        bottom: 30,
        position: 'absolute',
        background: '#336CFB',
      }}
    >
      <FontAwesomeIcon icon={faWheelchair} fontSize={28} />
      <AddIcon sx={{ marginTop: -2, marginLeft: -2 }} />
    </Fab>
  )
}
