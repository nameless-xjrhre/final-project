/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface GlobalState {
  appointmentSearch: string
  setAppointmentSearch: (appointmentSearch: string) => void
  patientSearch: string
  setPatientSearch: (patientSearch: string) => void
  billsSearch: string
  setBillsSearch: (billSearch: string) => void
}

const useState = create<GlobalState>()(
  immer((set) => ({
    appointmentSearch: '',
    setAppointmentSearch: (appointmentSearch) =>
      set((state) => {
        state.appointmentSearch = appointmentSearch
      }),
    patientSearch: '',
    setPatientSearch: (patientSearch) =>
      set((state) => {
        state.patientSearch = patientSearch
      }),
    billsSearch: '',
    setBillsSearch: (billsSearch) =>
      set((state) => {
        state.billsSearch = billsSearch
      }),
  })),
)

export default useState
