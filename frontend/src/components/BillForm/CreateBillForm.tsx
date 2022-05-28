import React from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { gql, useMutation } from 'urql'
import CustomForm from '../CustomForm'
import { FormInputSelect, FormInputText } from './FormInputFields'
import {
  BillStatus,
  MutationCreateHospitalBillArgs,
  MutationEditHospitalBillArgs,
} from '../../graphql/generated'
import { getDueDate, showFailAlert, showSuccessAlert } from '../../utils'
import { BillFormProps } from '../CustomFormProps'

export const terms = [
  '0 days',
  '7 days',
  '15 days',
  '30 days',
  '45 days',
  '60 days',
]

export const billStatus = [BillStatus.Paid, BillStatus.Unpaid]

const createBillSchema = object().shape({
  amount: string()
    .required('Amount is required.')
    .matches(/^[1-9]\d*(\.\d+)?$/, 'Please provide valid amount.'),
  paymentTerm: string().nullable().required('Select payment terms.'),
})

const updateBillSchema = object().shape({
  amount: string().matches(/^[1-9]\d*(\.\d+)?$|\s$/, {
    excludeEmptyString: true,
  }),
  paymentTerm: string().nullable(),
})

const CreateBill = gql`
  mutation CreateBill($data: CreateHospitalBillInput!, $appointmentId: Int!) {
    createHospitalBill(data: $data, appointmentId: $appointmentId) {
      id
      date
      amount
      status
      deadlineDate
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

const UpdateBill = gql`
  mutation EditHospitallBill($id: Int!, $data: EditHospitalBillInput!) {
    editHospitalBill(id: $id, data: $data) {
      id
      amount
      deadlineDate
    }
  }
`

export default function CreateBillForm({
  handleClose,
  open,
  toUpdate,
  bill,
  appointment,
}: BillFormProps) {
  const [, createBill] = useMutation(CreateBill)
  const [, updateBill] = useMutation(UpdateBill)
  const [complete, setComplete] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)

  const buttonSx = {
    ...(complete && {
      bgcolor: '#336CFB',
      '&:hover': {
        bgcolor: '#336CFB',
      },
    }),
    display: 'block',
    marginTop: 3,
    marginLeft: 'auto',
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: toUpdate
      ? yupResolver(updateBillSchema)
      : yupResolver(createBillSchema),
  })

  const handleBillAction = handleSubmit((data) => {
    handleSubmitting()
    if (toUpdate) {
      const input: MutationEditHospitalBillArgs = {
        id: bill!.id,
        data: {
          amount: parseFloat(data.amount) || bill!.amount,
          date: new Date() || bill!.date,
          deadlineDate: getDueDate(data.paymentTerm) || bill!.deadlineDate,
        },
      }
      updateBill(input)
        .then((result) => {
          if (result.error) {
            console.log(result)
            handleClose(handleComplete)
            showFailAlert('Data has not been saved.')
          } else {
            console.log(result)
            handleClose(handleComplete)
            showSuccessAlert('Data has been saved.')
          }
        })
        .catch((err) => console.error(err))
    } else {
      const input: MutationCreateHospitalBillArgs = {
        data: {
          amount: parseFloat(data.amount),
          date: new Date(),
          deadlineDate: getDueDate(data.paymentTerm),
          patientId: appointment!.patient.id,
          medStaffId: appointment!.medStaff.id,
          status: BillStatus.Unpaid,
        },
        appointmentId: appointment!.id,
      }

      createBill(input)
        .then((result) => {
          if (result.error) {
            console.log(result)
            handleClose(handleComplete)
            showFailAlert('Data has not been saved.')
          } else {
            console.log(result)
            handleClose(handleComplete)
            showSuccessAlert('Data has been saved.')
          }
        })
        .catch((err) => console.error(err))
    }
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleBillAction(e)
  }

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          {toUpdate ? 'Edit Bill' : 'Create Bill'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={(e) => {
            handleClose(e)
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
      {!toUpdate ? (
        <>
          <Grid container mt={2}>
            <Typography variant="body1" color="gray">
              Visit Type
            </Typography>
            <Typography variant="body1" color="gray">
              Consultant
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant="body1" color="lightgray">
              {appointment?.visitType}
            </Typography>
            <Typography variant="body1" color="lightgray">
              Dr.{appointment?.medStaff.fullName}
            </Typography>
          </Grid>
        </>
      ) : (
        ''
      )}
      <Grid container mt={2}>
        <FormInputText
          name="amount"
          label="Amount"
          placeholder={toUpdate ? bill?.amount.toString() : ''}
          control={control}
          register={register}
          errors={errors}
        />
        <FormInputSelect
          name="paymentTerm"
          label="Payment Term"
          control={control}
          register={register}
          errors={errors}
          data={terms}
        />
      </Grid>
      <Button
        onClick={(e) => handleSubmitForm(e)}
        disabled={isSubmitting}
        variant="contained"
        sx={buttonSx}
      >
        {toUpdate ? 'Save Changes' : 'Create Bill'}
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 61.5,
          }}
        />
      )}
    </CustomForm>
  )
}
