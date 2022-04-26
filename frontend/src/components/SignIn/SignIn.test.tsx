import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SignIn from './SignIn'

it('renders without crashing', () => {
  render(<SignIn />)
  expect(screen.getByText('Sign In')).toBeInTheDocument()
})
