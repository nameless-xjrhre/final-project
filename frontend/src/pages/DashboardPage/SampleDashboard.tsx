// import React from 'react'
// import { useQuery } from 'urql'
// import { getDashboardDetails, DashboardDetailsProps } from './DashboardQueries'

// function SampleDashboard() {
//   const [dashboardDetails] = useQuery<DashboardDetailsProps>({
//     query: getDashboardDetails,
//   })

//   const { data, fetching } = dashboardDetails

//   if (fetching) {
//     return <div data-testid="loading">Loading...</div>
//   }

//   return <div>{data?.totalAppointments}</div>
// }

// export default SampleDashboard

import React from 'react'

function SampleDashboard() {
  return <div data-testid="dashboard">SampleDashboard</div>
}

export default SampleDashboard
