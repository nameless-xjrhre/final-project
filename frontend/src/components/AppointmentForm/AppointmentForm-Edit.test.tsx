import '@testing-library/jest-dom'
import { render, screen, within, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import {
  AppointmentStatus,
  ScheduleStatus,
  VisitType,
} from '../../graphql/generated'
import AppointmentForm from './AppointmentForm'

const appointment = {
  id: 4,
  visitType: VisitType.Followup,
  date: new Date('2022-06-01T02:30:28.225Z'),
  status: AppointmentStatus.Pending,
  note: 'stomach ache',
  patient: {
    id: 1004,
    fullName: 'James Reid',
  },
  medStaff: {
    id: 7,
    fullName: 'Idell Huels',
    schedules: [
      {
        id: 15,
        startTime: '2022-06-01T02:30:28.225Z',
        endTime: '2022-06-01T04:00:28.226Z',
        status: ScheduleStatus.Open,
        medStaff: {
          id: 7,
        },
      },
      {
        id: 20,
        startTime: '2022-06-03T02:30:39.904Z',
        endTime: '2022-06-03T04:00:39.904Z',
        status: ScheduleStatus.Open,
        medStaff: {
          id: 7,
        },
      },
    ],
  },
}

const onSubmit = vi.fn()
beforeEach(() => {
  render(
    <AppointmentForm
      open
      handleClose={() => false}
      isNewAppointment={false}
      toUpdate
      appointment={appointment}
      onSubmit={onSubmit}
    />,
  )

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList => ({
      media: query,
      // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
      matches: query === '(pointer: fine)',
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

describe('AppointmentForm - Edit Appointment', () => {
  it('should render default state', async () => {
    const presentation = screen.getByRole('presentation')

    // should display create appointment heading
    const formHeading = screen.getByRole('heading', { level: 6 })
    expect(formHeading.textContent).toBe('Edit Appointment')

    // display selected patient's appointment visit type
    const visitType = /visit type/i
    const selectVisitType = within(
      screen.getByRole('combobox', { name: visitType }),
    ).getByRole('button')
    expect(selectVisitType.textContent).toBe('FOLLOWUP')

    // display selected patient's appointment doctor
    const doctor = /select doctor/i
    const selectDoctor = await within(
      screen.getByRole('combobox', { name: doctor }),
    ).findByRole('button', { name: 'Dr. Huels' })

    expect(selectDoctor.textContent).toBe('Dr. Huels')

    // display selected patient's appointment date
    const appointmentDate = await within(presentation).findByRole('textbox', {
      name: /select date/i,
    })
    expect(appointmentDate).toHaveValue('06/01/2022')

    // display selected patient's appointment time
    const appointmentTime = await within(presentation).findByRole('textbox', {
      name: /select time/i,
    })
    expect(appointmentTime).toHaveValue('10:30')

    // display selected patient's appointment note as placeholder
    const appointmentNote = screen.getByPlaceholderText('stomach ache')
    expect(appointmentNote).toBeInTheDocument()

    // should display save changes button
    const submitButton = await screen.findByRole('button', {
      name: /save changes/i,
    })
    expect(submitButton.textContent).toBe('Save Changes')
  })

  it('should update data when there are changes', async () => {
    const presentation = screen.getByRole('presentation')

    // change visit type to urgent
    const visitType = /visit type/i
    const selectVisitType = within(
      screen.getByRole('combobox', { name: visitType }),
    ).getByRole('button')
    userEvent.click(selectVisitType)
    const visitTypeList = within(screen.getByRole('presentation')).getByRole(
      'listbox',
    )
    userEvent.selectOptions(
      visitTypeList,
      within(visitTypeList).getByRole('option', { name: VisitType.Urgent }),
    )
    expect(selectVisitType.textContent).toBe('URGENT')

    // change appointment date to 06/17/2022
    const appointmentDate = await within(presentation).findByRole('textbox', {
      name: /select date/i,
    })
    userEvent.clear(appointmentDate)
    userEvent.type(appointmentDate, '06172022')

    expect(appointmentDate).toHaveValue('06/17/2022')

    const submitButton = await screen.findByRole('button', {
      name: /save changes/i,
    })

    // change appointment note
    const appointmentNote = screen.getByPlaceholderText('stomach ache')
    userEvent.type(appointmentNote, 'stomach ache and vomiting blood')

    expect(appointmentNote.textContent).toBe('stomach ache and vomiting blood')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      appointmentDate: '06/17/2022',
      appointmentTime: '10:30',
      note: 'stomach ache and vomiting blood',
      visitType: VisitType.Urgent,
    })
  })

  it('should keep all current data when no changes are made', async () => {
    const submitButton = await screen.findByRole('button', {
      name: /save changes/i,
    })

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(2)
    })

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      appointmentDate: '06/17/2022',
      appointmentTime: '10:30',
      note: 'stomach ache and vomiting blood',
      visitType: VisitType.Urgent,
    })
  })
})
