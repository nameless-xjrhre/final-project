import swal from 'sweetalert'

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

export const getDueDate = (
  paymentTerm: string,
  toUpdate: boolean,
  date: Date,
) => {
  const today = new Date()
  const day = parseInt(paymentTerm.split(' ')[0], 10)

  if (toUpdate && !Number.isNaN(day)) {
    return new Date(new Date(date).setDate(new Date(date).getDate() + day))
  }

  return new Date(today.setDate(today.getDate() + day))
}

export const isValidDate = (
  date: Date,
  paymentTerm: string,
  toUpdate: boolean,
) => !Number.isNaN(getDueDate(paymentTerm, toUpdate, date).getTime())

export const getDeadlineDate = (
  date: Date,
  paymentTerm: string,
  toUpdate: boolean,
  deadlineDate: Date,
) =>
  isValidDate(date, paymentTerm, toUpdate)
    ? getDueDate(paymentTerm, toUpdate, date)
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

export const getCompleteDate = (date: Date, time: string) => {
  const hour = new Date(time).getHours()
  const min = new Date(time).getMinutes()
  const intHour = parseInt(time.split(':')[0], 10)
  const intMin = parseInt(time.split(':')[1], 10)

  // if staff did not select date and time; only typed as string
  if (Number.isNaN(hour) && Number.isNaN(min)) {
    return new Date(new Date(date).setHours(intHour, intMin))
  }

  return new Date(date).setHours(hour, min)
}
