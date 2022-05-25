import { gql } from 'urql'

export const getDashboardDetails = gql`
  query DashboardDetails {
    totalAppointments
    totalPatients
    totalDoneAppointments
    totalBillPaid
  }
`
export interface DashboardDetailsProps {
  totalAppointments: number
  totalPatients: number
  totalDoneAppointments: number
  totalBillPaid: number
}
