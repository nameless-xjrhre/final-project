import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

it('Shows Sign In', () => {
  render(<App />)
  expect(screen.getByText('Sign In')).toBeInTheDocument()
})
