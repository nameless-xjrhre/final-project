// src/mocks/handlers.js
import { graphql } from 'msw'
import type {
  DashboardDetailsQuery,
  DashboardDetailsQueryVariables,
} from '../graphql/generated'

export const handlers = [
  graphql.query<DashboardDetailsQuery, DashboardDetailsQueryVariables>(
    'DashboardDetails',
    (req, res, ctx) =>
      res(
        ctx.data({
          totalAppointments: 10,
          totalPatients: 10,
          totalDoneAppointments: 10,
          totalBillPaid: 10,
        }),
      ),
  ),
]
