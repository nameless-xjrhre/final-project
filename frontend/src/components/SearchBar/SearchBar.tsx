import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

import useStore from '../../store'
import { HeaderType } from '../../types/enums'

interface SearchBarProps {
  type: HeaderType
}

const getSearchHook = (type: HeaderType) => {
  const store = useStore()
  switch (type) {
    case HeaderType.Appointment:
      return store.setAppointmentSearch
    case HeaderType.Patient:
      return store.setPatientSearch
    case HeaderType.Bills:
      return store.setBillsSearch
    default:
      return store.setAppointmentSearch
  }
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}))

export default function SearchAppBar({ type }: SearchBarProps) {
  const searchHook = getSearchHook(type)
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => searchHook(e.target.value)}
      />
    </Search>
  )
}
