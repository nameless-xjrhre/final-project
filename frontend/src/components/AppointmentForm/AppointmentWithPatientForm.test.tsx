import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentWithPatientForm from './AppointmentWithPatientForm'
import { testRenderer } from '../../utils/test-util'
import { VisitType } from '../../graphql/generated'

const onSubmit = vi.fn()
beforeEach(() => {
  render(
    <AppointmentWithPatientForm
      open
      handleClose={() => false}
      isNewAppointment
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

describe('AppointFormWithPatient', () => {
  it('should render default state', async () => {
    // should display patient data title
    const patienStepTitle = screen.getByText('Patient Data')
    expect(patienStepTitle).toBeInTheDocument()

    // should display create appointment title
    const createAppointmentTitle = screen.getByText('Create Appointment')
    expect(createAppointmentTitle).toBeInTheDocument()

    // should display next button
    const nextButton = await screen.findByRole('button', {
      name: /next/i,
    })
    expect(nextButton.textContent).toBe('Next')
  })

  it('should display all error messages with empty fields on patient data form', async () => {
    // user clicked next button with all forms empty
    const nextButton = screen.getByRole('button', { name: /next/i })
    userEvent.click(nextButton)

    const firstNameHelperText = await screen.findByText(
      /enter your first name./i,
    )
    expect(firstNameHelperText).toBeInTheDocument()

    const lastNameHelperText = await screen.findByText(/enter your last name./i)
    expect(lastNameHelperText).toBeInTheDocument()

    const genderHelperText = await screen.findByText(/choose your gender./i)
    expect(genderHelperText).toBeInTheDocument()

    const contactHelperText = await screen.findByText(
      /enter your contact number./i,
    )
    expect(contactHelperText).toBeInTheDocument()

    const addressHelperText = await screen.findByText(/enter your address./i)
    expect(addressHelperText).toBeInTheDocument()
  })

  it('should proceed on next form if patient data is valid', async () => {
    const nextButton = screen.getByRole('button', { name: /next/i })

    const firstName = screen.getByRole('textbox', {
      name: /first name/i,
    })

    const gender = screen.getByRole('radio', { name: 'Male' })

    userEvent.click(gender)
    expect(gender).toBeChecked()

    userEvent.type(firstName, 'Renzo')
    expect(firstName).toHaveValue('Renzo')

    const lastName = screen.getByRole('textbox', {
      name: /last name/i,
    })

    userEvent.type(lastName, 'Laporno')
    expect(lastName).toHaveValue('Laporno')

    const contactNum = screen.getByRole('textbox', {
      name: /contact number/i,
    })

    const dateOfBirth = screen.getByRole('textbox', {
      name: /date of birth/i,
    })

    userEvent.clear(dateOfBirth)
    userEvent.type(dateOfBirth, '01012000')
    expect(dateOfBirth).toHaveValue('01/01/2000')

    // test invalid number
    userEvent.type(contactNum, '123189')

    userEvent.click(nextButton)
    const invalidNumberHelperText = await within(
      screen.getByRole('presentation'),
    ).findByText(/please enter a valid contact number\./i)
    expect(invalidNumberHelperText).toBeInTheDocument()

    // enter valid number this time
    userEvent.clear(contactNum)
    userEvent.type(contactNum, '09297557897')
    expect(contactNum).toHaveValue('09297557897')

    const address = screen.getByRole('textbox', {
      name: /address/i,
    })

    userEvent.type(address, 'Iloilo City')
    expect(address).toHaveValue('Iloilo City')

    userEvent.click(nextButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      firstName: 'Renzo',
      lastName: 'Laporno',
      sex: 'MALE',
      contactNum: '09297557897',
      address: 'Iloilo City',
      dateOfBirth: '01/01/2000',
    })

    const checkedIcon = screen.getByTestId('CheckCircleIcon')
    expect(checkedIcon).toBeInTheDocument()

    const backButton = screen.getByRole('button', { name: /back/i })
    expect(backButton).toBeInTheDocument()

    // test back button
    userEvent.click(backButton)
    expect(checkedIcon).not.toBeInTheDocument()
  })

  it('should display all error messages on appointment form on empty fields', async () => {
    // fill up patient data forms first
    const firstName = screen.getByRole('textbox', {
      name: /first name/i,
    })
    userEvent.type(firstName, 'Renzo')

    const gender = screen.getByRole('radio', { name: 'Male' })
    userEvent.click(gender)

    const lastName = screen.getByRole('textbox', {
      name: /last name/i,
    })
    userEvent.type(lastName, 'Laporno')

    const contactNum = screen.getByRole('textbox', {
      name: /contact number/i,
    })
    userEvent.type(contactNum, '09297557897')

    const dateOfBirth = screen.getByRole('textbox', {
      name: /date of birth/i,
    })
    userEvent.clear(dateOfBirth)
    userEvent.type(dateOfBirth, '01012000')

    const address = screen.getByRole('textbox', {
      name: /address/i,
    })
    userEvent.type(address, 'Iloilo City')

    const nextButton = screen.getByRole('button', { name: /next/i })
    userEvent.click(nextButton)

    const bookNowButton = await screen.findByRole('button', {
      name: /book now/i,
    })
    userEvent.click(bookNowButton)

    // show error messages
    const selectVisitTypeHelperText = await screen.findByText(
      /select type of visit./i,
    )
    expect(selectVisitTypeHelperText).toBeInTheDocument()

    const selectDoctorHelperText = await screen.findByText(
      /select preferred doctor./i,
    )
    expect(selectDoctorHelperText).toBeInTheDocument()

    const appointmentNoteHelperText = await screen.findByText(
      /provide reason for appointment./i,
    )
    expect(appointmentNoteHelperText).toBeInTheDocument()

    const selectAppointmentDateText = await screen.findByText(
      /select appointment date\./i,
    )
    expect(selectAppointmentDateText).toBeInTheDocument()

    const selectDoctorFirstHelperText = await screen.findByText(
      /please select doctor first./i,
    )
    expect(selectDoctorFirstHelperText).toBeInTheDocument()
  })

  const renderForm = testRenderer(
    <AppointmentWithPatientForm
      open
      handleClose={() => false}
      isNewAppointment
      toUpdate={false}
      onSubmit={onSubmit}
    />,
  )

  it('should display correct inputs', async () => {
    renderForm()

    // FILL UP PATIENT DATA
    const firstName = screen.getByRole('textbox', {
      name: /first name/i,
    })
    userEvent.type(firstName, 'Renzo')
    expect(firstName).toHaveDisplayValue('Renzo')

    const gender = screen.getByRole('radio', { name: 'Male' })
    userEvent.click(gender)
    expect(gender).toBeChecked()

    const lastName = screen.getByRole('textbox', {
      name: /last name/i,
    })
    userEvent.type(lastName, 'Laporno')
    expect(lastName).toHaveDisplayValue('Laporno')

    const contactNum = screen.getByRole('textbox', {
      name: /contact number/i,
    })
    userEvent.type(contactNum, '09297557897')
    expect(contactNum).toHaveDisplayValue('09297557897')

    const dateOfBirth = screen.getByRole('textbox', {
      name: /date of birth/i,
    })
    userEvent.clear(dateOfBirth)
    userEvent.type(dateOfBirth, '01012000')
    expect(dateOfBirth).toHaveValue('01/01/2000')

    const address = screen.getByRole('textbox', {
      name: /address/i,
    })
    userEvent.type(address, 'Iloilo City')
    expect(address).toHaveDisplayValue('Iloilo City')

    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeInTheDocument()
    userEvent.click(nextButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(3)
    })

    const checkedIcon = screen.getByTestId('CheckCircleIcon')
    expect(checkedIcon).toBeInTheDocument()

    // // FILL UP APPOINTMENT FORMS
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
      await within(visitTypeList).findByRole('option', {
        name: VisitType.Routine,
      }),
    )
    expect(selectVisitType.textContent).toBe('ROUTINE')

    const doctor = /select doctor/i
    const selectDoctor = within(
      screen.getByRole('combobox', { name: doctor }),
    ).getByRole('button')

    userEvent.click(selectDoctor)
    const doctorList = within(screen.getByRole('presentation')).getByRole(
      'listbox',
    )

    userEvent.selectOptions(
      doctorList,
      await within(doctorList).findByRole('option', { name: 'Dr. Huels' }),
    )
    expect(selectDoctor.textContent).toBe('Dr. Huels')

    const appointmentDate = screen.getByRole('textbox', {
      name: /select date/i,
    })
    userEvent.type(appointmentDate, '09212022')
    expect(appointmentDate).toHaveValue('09/21/2022')

    const appointmentTime = screen.getByRole('textbox', {
      name: /select time/i,
    })
    userEvent.type(appointmentTime, '0930')
    expect(appointmentTime).toHaveValue('09:30')

    const note = screen.getByRole('textbox', {
      name: /brief reason for appointment/i,
    })

    userEvent.type(note, 'headache')
    expect(note.textContent).toBe('headache')

    const bookNowButton = screen.getByRole('button', {
      name: /book now/i,
    })
    userEvent.click(bookNowButton)

    // await waitFor(() => expect(onSubmit).toBeCalledTimes(4))
  })
})
