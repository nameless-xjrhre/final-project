import { Context } from '../../../context'
import { NexusGenInputs } from '../../../generated/nexus'

export type HospitalBillInputType = NexusGenInputs['CreateHospitalBillInput']

export type EditHospitalBillInputType = NexusGenInputs['EditHospitalBillInput']

export function createHospitalBill(
  hospitalBill: HospitalBillInputType,
  ctx: Context,
) {
  return ctx.prisma.hospitalBill.create({
    data: {
      medStaffId: hospitalBill.medStaffId,
      deadlineDate: hospitalBill.deadlineDate,
      amount: hospitalBill.amount,
      status: hospitalBill.status,
      date: hospitalBill.date,
      patientId: hospitalBill.patientId,
    },
  })
}

export function editHospitalBill(
  hospitalId: number,
  hospitalBill: EditHospitalBillInputType,
  ctx: Context,
) {
  return ctx.prisma.hospitalBill.update({
    where: {
      id: hospitalId,
    },
    data: {
      deadlineDate: hospitalBill.deadlineDate,
      date: hospitalBill.date,
      status: hospitalBill.status ?? undefined,
      amount: hospitalBill.amount ?? undefined,
    },
  })
}
