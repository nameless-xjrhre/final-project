import {
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import React, { useState } from 'react'
import { useMutation, gql, useQuery } from 'urql'
import CustomForm from '../CustomForm'
import { MedicalRecordFormProps } from '../CustomFormProps'
import { FormInputSelectMedStaff, FormInputText } from './FormInputField'
import { MutationCreateMedicalRecordArgs } from '../../graphql/generated'
import { showFailAlert, showSuccessAlert } from '../../utils'
import {
  MedicalStaffQueryData,
  medicalStaffQueryDocument,
} from './FormInputProps'

const createMedicalRecordSchema = object().shape({
  medicalStaff: string().required('Select consultant'),
  diagnosis: string().required('Please provide diagnosis.'),
  prescription: string().required('Please provide prescription.'),
})

const CreateMedicalRecord = gql`
  mutation CreateMedicalRecord($data: CreateMedicalRecordInput!) {
    createMedicalRecord(data: $data) {
      id
      date
      diagnosis
      prescription
      patient {
        id
      }
      medStaff {
        id
      }
    }
  }
`

export default function CreateMedicalRecordForm({
  handleClose,
  open,
  medicalRecord,
  patientId,
  toUpdate,
}: MedicalRecordFormProps) {
  const [, createMedicalRecord] = useMutation(CreateMedicalRecord)
  // const [, updateMedicalRecord] = useMutation(UpdateMedicalRecord)
  const [complete, setComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleComplete = () => setComplete(true)
  const handleSubmitting = () => setIsSubmitting(true)

  const [medicalStaff] = useQuery<MedicalStaffQueryData>({
    query: medicalStaffQueryDocument,
  })

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
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createMedicalRecordSchema),
  })

  const handleCreateRecord = handleSubmit((data) => {
    handleSubmitting()
    if (!toUpdate) {
      const createInput: MutationCreateMedicalRecordArgs = {
        data: {
          date: new Date(),
          diagnosis: data.diagnosis,
          prescription: data.prescription,
          patientId: patientId!,
          medStaffId: parseInt(data.medicalStaff, 10),
        },
      }
      createMedicalRecord(createInput)
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
    }
    // else {
    // const updateInput = {
    //   id: medicalRecord!.id,
    //   data: {
    //     diagnosis: data.diagnosis || medicalRecord!.diagnosis ,
    //     prescription: data.prescription || medicalRecord!.prescription,
    //   },
    // }
    // updateMdicalRecord(updateInput)
    //   .then((result) => {
    //     if (result.error) {
    //       handleClose(handleComplete)
    //       showFailAlert('Data has not been saved.')
    //     } else {
    //       handleClose(handleComplete)
    //       showSuccessAlert('Data has been saved.')
    //     }
    //   })
    //   .catch((err) => console.error(err))
    // }
  })

  const handleSubmitForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    handleCreateRecord()
  }

  return (
    <CustomForm open={open}>
      <Grid container>
        <Typography variant="h6" color="GrayText">
          {toUpdate ? 'Edit Record' : 'Create Record'}
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
      <Grid mt={3} container>
        <FormInputSelectMedStaff
          name="medicalStaff"
          label="Select Doctor"
          data={medicalStaff.data!}
          onSavedValue={medicalRecord?.medStaff.id.toString()}
          control={control}
          register={register}
          errors={errors}
        />
      </Grid>
      <Grid container>
        <FormInputText
          id="diagnosis"
          name="diagnosis"
          label="Diagnosis"
          placeholder={medicalRecord?.diagnosis}
          register={register}
          errors={errors}
        />
        <FormInputText
          id="prescriprion"
          name="prescription"
          label="Prescription"
          placeholder={medicalRecord?.prescription}
          register={register}
          errors={errors}
        />
      </Grid>
      <Button
        type="submit"
        onClick={(e) => handleSubmitForm(e)}
        variant="contained"
        disabled={isSubmitting}
        sx={buttonSx}
      >
        {toUpdate ? 'Save Changes' : 'Create Record'}
      </Button>
      {isSubmitting && (
        <CircularProgress
          size={17}
          sx={{
            color: 'blue',
            position: 'absolute',
            marginTop: -3.5,
            marginLeft: 59,
          }}
        />
      )}
    </CustomForm>
  )
}
