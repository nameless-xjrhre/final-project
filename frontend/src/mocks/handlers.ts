// src/mocks/handlers.js
import { graphql } from 'msw'
import {
  AppointmentsQuery,
  AppointmentsQueryVariables,
  AppointmentStatus,
  AvailableStaffsQuery,
  AvailableStaffsQueryVariables,
  DashboardDetailsQuery,
  DashboardDetailsQueryVariables,
  PatientFullNameQuery,
  PatientFullNameQueryVariables,
  ScheduleStatus,
  VisitType,
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
  graphql.query<AppointmentsQuery, AppointmentsQueryVariables>(
    'AppointmentsList',
    (req, res, ctx) =>
      res(
        ctx.data({
          appointmentsRange: [
            {
              id: 1,
              visitType: VisitType.Routine,
              date: new Date(2020, 1, 1),
              status: AppointmentStatus.Canceled,
              patient: {
                id: 1,
                fullName: 'John Doe',
              },
              medStaff: {
                id: 1,
                fullName: 'Joseph Doe',
              },
            },
          ],
          totalAppointments: 1,
        }),
      ),
  ),
  graphql.query<PatientFullNameQuery, PatientFullNameQueryVariables>(
    'PatientFullName',
    (req, res, ctx) =>
      res(
        ctx.data({
          patients: [
            {
              id: 1004,
              fullName: 'James Reid',
            },
          ],
        }),
      ),
  ),
  graphql.query<AvailableStaffsQuery, AvailableStaffsQueryVariables>(
    'AvailableStaffs',
    (req, res, ctx) =>
      res(
        ctx.data({
          availableStaffs: [
            {
              id: 7,
              firstName: 'Idell',
              lastName: 'Huels',
              address: "957 D'Amore Grove",
              contactNum: '1-856-390-9309',
              schedules: [
                {
                  id: 15,
                  startTime: '2022-06-01T02:30:28.225Z',
                  endTime: '2022-06-01T04:00:28.226Z',
                  status: ScheduleStatus.Open,
                  medStaff: {
                    id: 7,
                  },
                },
                {
                  id: 20,
                  startTime: '2022-06-03T02:30:39.904Z',
                  endTime: '2022-06-03T04:00:39.904Z',
                  status: ScheduleStatus.Open,
                  medStaff: {
                    id: 7,
                  },
                },
              ],
            },
          ],
        }),
      ),
  ),
]
