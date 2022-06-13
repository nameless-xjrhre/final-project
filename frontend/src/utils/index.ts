import swal from 'sweetalert'
import { AvailableStaff } from '../components/AppointmentForm/AppointmentQueries'
import { Schedule } from '../components/CustomFormProps'
import { ScheduleStatus } from '../graphql/generated'

export function getDateOfLastMonday(currentDate: Date) {
  const today = currentDate
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(today.setDate(diff))
  return new Date(monday.setHours(0, 0, 0, 0))
}

export function getDateOfNextSunday(currentDate: Date) {
  const today = currentDate
  const day = today.getDay()
  const diff = today.getDate() + (7 - day)
  const sunday = new Date(today.setDate(diff))
  return new Date(sunday.setHours(23, 59, 59, 0))
}

export const getDueDate = (paymentTerm: string, date: Date) => {
  const day = parseInt(paymentTerm.split(' ')[0], 10)

  return new Date(new Date(date).setDate(new Date(date).getDate() + day))
}

export const isValidDueDate = (date: Date, paymentTerm: string) =>
  !Number.isNaN(getDueDate(paymentTerm, date).getTime())

export const getDueDateAfterUpdate = (
  date: Date,
  paymentTerm: string,
  deadlineDate: Date,
) =>
  isValidDueDate(date, paymentTerm)
    ? getDueDate(paymentTerm, date)
    : new Date(deadlineDate)

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const showSuccessAlert = (message: string) =>
  swal({
    title: 'Success!',
    text: message,
    icon: 'success',
  })

export const showFailAlert = (message: string) =>
  swal({
    title: 'Failed!',
    text: message,
    icon: 'warning',
  })

export const isNotSelectedTime = (hour: number, min: number) =>
  Number.isNaN(hour) && Number.isNaN(min)

export const getCompleteDate = (date: Date, time: string) => {
  const hour = new Date(time).getHours()
  const min = new Date(time).getMinutes()

  // if staff did not select date and time; only typed as string
  if (isNotSelectedTime(hour, min)) {
    const intHour = parseInt(time.split(':')[0], 10)
    const intMin = parseInt(time.split(':')[1], 10)

    return new Date(date).setHours(intHour, intMin)
  }

  return new Date(date).setHours(hour, min)
}

export const getDaysWithSchedule = (schedules: Schedule[]) =>
  schedules
    .filter(
      (schedule: Schedule) =>
        schedule.status === ScheduleStatus.Open ||
        schedule.status === ScheduleStatus.Closed ||
        schedule.status === ScheduleStatus.NotAvailable,
    )
    .map((sched: Schedule) => new Date(sched.startTime).getDay())

export const getDaysWithNoSchedule = (days: number[], schedules: Schedule[]) =>
  days.filter((day) => !getDaysWithSchedule(schedules).includes(day))

export const getSelectedStaffSchedules = (
  id: number,
  availableStaffs: AvailableStaff[],
) => availableStaffs.find((staff) => staff.id === id)!.schedules

export const disableNoScheduleDays = (
  date: Date,
  schedules: Schedule[],
  days: number[],
) => getDaysWithNoSchedule(days, schedules).includes(date.getDay())
