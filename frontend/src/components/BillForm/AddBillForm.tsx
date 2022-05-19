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
import CustomFormProps from './FormInputProps'
import {
  BillStatus,
  MutationCreateHospitalBillArgs,
} from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'

export const terms = [
  '0 days',
  '7 days',
  '15 days',
  '30 days',
  '45 days',
  '60 days',
]

const billSchema = object().shape({
  amount: string().required('Amount is required.'),
  paymentTerm: string().nullable().required('Select payment terms.'),
})

const CreateBill = gql`
  mutation CreateBill($data: CreateHospitalBillInput!) {
    createHospitalBill(data: $data) {
      id
      date
      amount
      status
      patient {
        id
      }
    }
  }
`

export default function AddBillForm({
  handleClose,
  open,
  apppointment,
}: CustomFormProps) {
  const [, createBill] = useMutation(CreateBill)
  const [complete, setComplete] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)
  const { patient } = apppointment

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
    resolver: yupResolver(billSchema),
  })

  const handleCreateBill = handleSubmit((data) => {
    const input: MutationCreateHospitalBillArgs = {
      data: {
        amount: parseFloat(data.amount),
        date: new Date(),
        patientId: patient.id,
        status: BillStatus.Unpaid,
      },
      // visitType,
      // medStaff: fullName,
      // dueDate: getDueDate(data.paymentTerm),
    }
    handleSubmitting()
    createBill(input)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert()
        } else {
          console.log(result)
          handleClose(handleComplete)
          showSuccessAlert()
        }
      })
      .catch((err) => console.error(err))
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleCreateBill(e)
  }

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          Add Bill
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
      <Grid container mt={2}>
        <FormInputText
          id="amount"
          name="amount"
          label="Amount"
          control={control}
          register={register}
          errors={errors}
        />
        <FormInputSelect
          name="paymentTerm"
          label="Payment Terms"
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
        Add Bill
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 62.5,
          }}
        />
      )}
    </CustomForm>
  )
}
