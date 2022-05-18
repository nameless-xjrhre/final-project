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
