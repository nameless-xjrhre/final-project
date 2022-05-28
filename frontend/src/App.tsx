import { Routes, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import AppointmentsPage from './pages/AppointmentsPage'
import PatientPage from './pages/PatientPage'
import ProfilePage from './pages/ProfilePage'
import DoctorsPage from './pages/DoctorsPage'
import BillsPage from './pages/BillsPage'
import DashboardPage from './pages/DashboardPage'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppointmentsPage />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="patients" element={<PatientPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
      <Route path="profile/:id" element={<ProfilePage />} />
      <Route path="doctors" element={<DoctorsPage />} />
      <Route path="bills" element={<BillsPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
