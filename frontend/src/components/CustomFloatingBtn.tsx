import { Fab } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddIcon from '@mui/icons-material/Add'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

const styles = {
  fab: {
    right: 30,
    bottom: 30,
    position: 'absolute',
    background: '#336CFB',
  },
  addIcon: {
    marginTop: -2,
    marginLeft: -2,
  },
}

interface FloatingtBtnProps {
  handleOpen: () => void
  icon: IconDefinition
}

export default function CustomFloatingBtn({
  handleOpen,
  icon,
}: FloatingtBtnProps) {
  return (
    <Fab onClick={handleOpen} color="primary" sx={styles.fab}>
      <FontAwesomeIcon icon={icon} fontSize={28} />
      <AddIcon sx={styles.addIcon} />
    </Fab>
  )
}
