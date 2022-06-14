import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentForm from './AppointmentForm'
import { testRenderer } from '../../utils/test-util'
import { VisitType } from '../../graphql/generated'

const onSubmit = vi.fn()
beforeEach(() => {
  render(
    <AppointmentForm
      open
      handleClose={() => false}
      isNewAppointment={false}
      toUpdate={false}
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

describe('AppointmentForm - Create Appointment', () => {
  it('should render default state', async () => {
    // should display create appointment heading
    const formHeading = screen.getByRole('heading', { level: 6 })
    expect(formHeading.textContent).toBe('Create Appointment')

    // should display disabled date field
    const dateField = screen.getByRole('textbox', {
      name: /choose date/i,
    })
    expect(dateField).toBeDisabled()

    // should display disabled time field
    const timeField = screen.getByRole('textbox', {
      name: /choose time/i,
    })
    expect(timeField).toBeDisabled()

    // should display select doctor first helper text
    const selectDoctorFirstHelperText = screen.getByText(
      /please select doctor first./i,
    )
    expect(selectDoctorFirstHelperText).toBeInTheDocument()

    // should display book now button
    const submitButton = await screen.findByRole('button', {
      name: /book now/i,
    })
    expect(submitButton.textContent).toBe('Book Now')
  })

  it('should display all error messages when all fields have no value', async () => {
    // user click book now button with all forms empty
    const submitButton = screen.getByRole('button', { name: /book now/i })
    userEvent.click(submitButton)

    // should display select patient text
    const selectPatientHelperText = await screen.findByText(/select patient./i)
    expect(selectPatientHelperText).toBeInTheDocument()

    // should display select patient text
    const selectVisitTypeHelperText = await screen.findByText(
      /select type of visit./i,
    )
    expect(selectVisitTypeHelperText).toBeInTheDocument()

    // should display select dcotor text
    const selectDoctorHelperText = await screen.findByText(
      /select preferred doctor./i,
    )
    expect(selectDoctorHelperText).toBeInTheDocument()

    // should display provide reason text
    const appointmentNoteHelperText = await screen.findByText(
      /provide reason for appointment./i,
    )
    expect(appointmentNoteHelperText).toBeInTheDocument()

    // should display select appointment date text
    const selectAppointmentDateText = await screen.findByText(
      /select appointment date\./i,
    )
    expect(selectAppointmentDateText).toBeInTheDocument()

    // should display select doctor first text
    const selectDoctorFirstHelperText = await screen.findByText(
      /please select doctor first./i,
    )
    expect(selectDoctorFirstHelperText).toBeInTheDocument()
  })

  const renderForm = testRenderer(
    <AppointmentForm
      open
      handleClose={() => false}
      isNewAppointment={false}
      toUpdate={false}
      onSubmit={onSubmit}
    />,
  )

  it('should not submit data if fields are incomplete', async () => {
    renderForm()

    // select patient
    const patient = /select patient/i
    const selectPatient = within(
      screen.getByRole('combobox', { name: patient }),
    ).getByRole('button')

    userEvent.click(selectPatient)

    const patientList = await within(
      screen.getByRole('presentation'),
    ).findByRole('listbox')

    userEvent.selectOptions(
      patientList,
      await within(patientList).findByRole('option', {
        name: 'James Reid',
        hidden: true,
      }),
    )

    expect(selectPatient.textContent).toBe('James Reid')

    // select visit type
    const visitType = /visit type/i
    const selectVisitType = await within(
      screen.getByRole('combobox', { name: visitType }),
    ).findByRole('button')

    userEvent.click(selectVisitType)
    const visitTypeList = await within(
      screen.getByRole('presentation'),
    ).findByRole('listbox')

    userEvent.selectOptions(
      visitTypeList,
      await within(visitTypeList).findByRole('option', {
        name: VisitType.Routine,
      }),
    )

    expect(selectVisitType.textContent).toBe('ROUTINE')

    // select doctor
    const doctor = /select doctor/i
    const selectDoctor = await within(
      screen.getByRole('combobox', { name: doctor }),
    ).findByRole('button')

    userEvent.click(selectDoctor)
    const doctorList = await within(
      screen.getByRole('presentation'),
    ).findByRole('listbox')

    userEvent.selectOptions(
      doctorList,
      await within(doctorList).findByRole('option', { name: 'Dr. Huels' }),
    )
    expect(selectDoctor.textContent).toBe('Dr. Huels')

    const submitButton = screen.getByRole('button', { name: /book now/i })
    userEvent.click(submitButton)

    // onsubmit was not called
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))

    // display error messages
    const selectTimeHelperText = await screen.findByText(
      /select appointment time./i,
    )
    expect(selectTimeHelperText).toBeInTheDocument()

    const appointmentNoteHelperText = await screen.findByText(
      /provide reason for appointment./i,
    )
    expect(appointmentNoteHelperText).toBeInTheDocument()
  })

  it('should submit data if all inputs are valid', async () => {
    renderForm()

    // select patient
    const patient = /select patient/i
    const selectPatient = await within(
      screen.getByRole('combobox', { name: patient }),
    ).findByRole('button')

    userEvent.click(selectPatient)

    const patientList = await within(
      screen.getByRole('presentation'),
    ).findByRole('listbox')

    userEvent.selectOptions(
      patientList,
      await within(patientList).findByRole('option', {
        name: 'James Reid',
        hidden: true,
      }),
    )
    expect(selectPatient.textContent).toBe('James Reid')

    // select visit type
    const visitType = /visit type/i
    const selectVisitType = await within(
      screen.getByRole('combobox', { name: visitType }),
    ).findByRole('button')

    userEvent.click(selectVisitType)
    const visitTypeList = await within(
      screen.getByRole('presentation'),
    ).findByRole('listbox')

    userEvent.selectOptions(
      visitTypeList,
      await within(visitTypeList).findByRole('option', {
        name: VisitType.Routine,
      }),
    )

    // select doctor
    const doctor = /select doctor/i
    const selectDoctor = await within(
      screen.getByRole('combobox', { name: doctor }),
    ).findByRole('button')

    userEvent.click(selectDoctor)
    const doctorList = await within(
      screen.getByRole('presentation'),
    ).findByRole('listbox')

    userEvent.selectOptions(
      doctorList,
      await within(doctorList).findByRole('option', { name: 'Dr. Huels' }),
    )

    // select appointment date
    const appointmentDate = screen.getByRole('textbox', {
      name: /select date/i,
    })
    userEvent.type(appointmentDate, '09212022')
    expect(appointmentDate).toHaveValue('09/21/2022')

    // select appointment time
    const appointmentTime = screen.getByRole('textbox', {
      name: /select time/i,
    })
    userEvent.type(appointmentTime, '0930')

    // input note
    const note = screen.getByRole('textbox', {
      name: /brief reason for appointment/i,
    })

    userEvent.type(note, 'headache')

    // // click submit button
    const submitButton = screen.getByRole('button', { name: /book now/i })
    userEvent.click(submitButton)

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      appointmentDate: '09/21/2022',
      appointmentTime: '09:30',
      medicalStaff: '7',
      note: 'headache',
      patient: '1004',
      visitType: 'ROUTINE',
    })
  })
})
