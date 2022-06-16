import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { testRenderer } from '../../utils/test-util'
import { AppointmentStatus } from '../../graphql/generated'
import StatusButton from './StatusButton'
import '@testing-library/jest-dom'

describe('StatusButton for canceled status', () => {
  const clickFn = vi.fn()

  const renderPage = testRenderer(
    <StatusButton status={AppointmentStatus.Canceled} onClick={clickFn} />,
  )

  // click the button
  it('calls onClick when clicked', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    fireEvent.click(button)
    expect(clickFn).toHaveBeenCalled()
  })

  // check that the button color is #FFE5E5
  it('has a color of #FFE5E5', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    expect(button).toHaveStyle('background-color: #FFE5E5')
  })
})

describe('StatusButton for done status', () => {
  const clickFn = vi.fn()

  const renderPage = testRenderer(
    <StatusButton status={AppointmentStatus.Done} onClick={clickFn} />,
  )

  // click the button
  it('calls onClick when clicked', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    fireEvent.click(button)
    expect(clickFn).toHaveBeenCalled()
  })

  // check that the button color is #F0FFE9
  it('has a color of #F0FFE9', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    expect(button).toHaveStyle('background-color: #F0FFE9')
  })
})

describe('StatusButton for expired status', () => {
  const clickFn = vi.fn()

  const renderPage = testRenderer(
    <StatusButton status={AppointmentStatus.Expired} onClick={clickFn} />,
  )

  // click the button
  it('calls onClick when clicked', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    fireEvent.click(button)
    expect(clickFn).toHaveBeenCalled()
  })

  // check that the button color is #FEBD70
  it('has a color of #FFF5E9', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    expect(button).toHaveStyle('background-color: #FFF5E9')
  })
})

describe('StatusButton for pending status', () => {
  const clickFn = vi.fn()

  const renderPage = testRenderer(
    <StatusButton status={AppointmentStatus.Pending} onClick={clickFn} />,
  )

  // click the button
  it('calls onClick when clicked', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    fireEvent.click(button)
    expect(clickFn).toHaveBeenCalled()
  })

  // check that the button color is ##5692EC
  it('has a color of #BCD4F8', async () => {
    renderPage()
    const button = await screen.findByRole('button')
    expect(button).toHaveStyle('background-color: #BCD4F8')
  })
})
