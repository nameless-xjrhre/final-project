import { Routes, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import AppointmentsPage from './pages/AppointmentsPage'
import PatientPage from './pages/PatientPage'
import ProfilePage from './pages/ProfilePage'
import DoctorsPage from './pages/DoctorsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppointmentsPage />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="patients" element={<PatientPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="doctors" element={<DoctorsPage />} />
    </Routes>
  )
}

export default App
