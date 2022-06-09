import React from 'react'
import { useQuery } from 'urql'
import { getDashboardDetails, DashboardDetailsProps } from './DashboardQueries'

function SampleDashboard() {
  const [dashboardDetails] = useQuery<DashboardDetailsProps>({
    query: getDashboardDetails,
  })

  const { data, fetching } = dashboardDetails

  if (fetching) {
    return <div data-testid="loading">Loading...</div>
  }

  return <div data-testid="total-appointments">{data?.totalAppointments}</div>
}

export default SampleDashboard
