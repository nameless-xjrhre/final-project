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

export const getDueDate = (paymentTerm: string) => {
  const today = new Date()
  const day = parseInt(paymentTerm.split(' ')[0], 10)

  return new Date(today.setDate(today.getDate() + day))
}

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

// text: 'Data has been saved.',
// text: 'Data has not been saved.',
