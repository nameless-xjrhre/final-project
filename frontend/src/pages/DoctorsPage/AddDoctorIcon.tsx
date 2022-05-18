import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AddIcon from '@mui/icons-material/Add'
import './Doctor.css'

interface AddDoctorProps {
  onClick: () => void
}

const AddDoctorIcon = ({ onClick }: AddDoctorProps) => (
  <span
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'Center',
      alignItems: 'Center',
      marginLeft: '5px',
    }}
  >
    <FontAwesomeIcon icon={faUserDoctor} />
    <AddIcon onClick={onClick} scale={0.2} className="svg-icons" />
  </span>
)

export default AddDoctorIcon
