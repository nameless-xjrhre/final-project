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

export const showSuccessAlert = () =>
  swal({
    title: 'Success!',
    text: 'Data has been saved.',
    icon: 'success',
  })

export const showFailAlert = () =>
  swal({
    title: 'Failed!',
    text: 'Data has not been saved.',
    icon: 'warning',
  })
