import { Routes, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import AppointmentsPage from './pages/AppointmentsPage/AppointmentsPage'
import PatientPage from './pages/PatientPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="patients" element={<PatientPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
    </Routes>
  )
}

export default App
