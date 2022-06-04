import * as React from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from 'urql'
import CustomForm from '../CustomForm'
import CustomFormProps from '../CustomFormProps'
import DoctorForm from '.'
import { MutationCreateMedicalStaffArgs } from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'

const doctorSchema = object().shape({
  firstName: string().required('Enter your first name.'),
  lastName: string().required('Enter your last name.'),
  contactNum: string()
    .required('Enter your contact number.')
    .matches(/^(09|\+639)\d{9}$/, 'Please enter a valid contact number.'),
  address: string().required('Enter your address.'),
})

const AddDoctor = gql`
  mutation CreateMedicalStaff($data: CreateMedicalStaffInput!) {
    createMedicalStaff(data: $data) {
      id
      firstName
      lastName
      contactNum
      address
    }
  }
`

export default function AddDoctorForm({ open, handleClose }: CustomFormProps) {
  const [, addDoctor] = useMutation(AddDoctor)
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(doctorSchema),
  })

  const handleAddDoctor = handleSubmit((data) => {
    const input: MutationCreateMedicalStaffArgs = {
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        contactNum: data.contactNum,
      },
    }

    handleSubmitting()
    addDoctor(input)
      .then((result) => {
        if (result.error) {
          handleClose(handleComplete)
          showFailAlert('Data has not been saved.')
        } else {
          handleClose(handleComplete)
          showSuccessAlert('Data has been saved.')
        }
      })
      .catch((err) => console.error(err))
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleAddDoctor()
  }

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          Add Doctor
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
      <DoctorForm register={register} errors={errors} />
      <Button
        onClick={(e) => handleSubmitForm(e)}
        disabled={isSubmitting}
        variant="contained"
        sx={buttonSx}
      >
        Add Doctor
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 60,
          }}
        />
      )}
    </CustomForm>
  )
}
