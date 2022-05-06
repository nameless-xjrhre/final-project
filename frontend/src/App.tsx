import { Routes, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import PatientPage from './pages/PatientPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="patients" element={<PatientPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
