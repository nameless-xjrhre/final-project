import { Button, Divider, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import CustomForm from '../CustomForm'
import { FormInputSelect, FormInputText } from './FormInputFields'
import CustomFormProps from './FormInputProps'

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

export default function AddBillForm({
  handleClose,
  open,
  apppointment,
}: CustomFormProps) {
  const { visitType, medStaff } = apppointment
  const { fullName } = medStaff

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billSchema),
  })

  const getDueDate = (paymentTerm: string) => {
    const today = new Date()
    const day = parseInt(paymentTerm.split(' ')[0], 10)

    return new Date(today.setDate(today.getDate() + day))
  }

  const handleCreateBill = handleSubmit((data) => {
    const input = {
      paymentDate: new Date(),
      amount: data.amount,
      visitType,
      medStaff: fullName,
      dueDate: getDueDate(data.paymentTerm),
      status: 'UNPAID',
    }
    console.log(input)
  })

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
        onClick={handleCreateBill}
        variant="contained"
        sx={{
          background: '#336CFB',
          display: 'block',
          marginTop: 3,
          marginLeft: 'auto',
        }}
      >
        Add Bill
      </Button>
    </CustomForm>
  )
}
