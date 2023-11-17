import { useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, FormGroup, TextField, Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

const AccountPage = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const [isFormDisabled, setIsFormDisabled] = useState(true)
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')

  const updateUserProfile = () => {
    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, {
        displayName: name,
      }).then(() => {
        navigate('/account')
      }).catch((error) => {
        console.log('updateUserProfile: ', error)
      });
    }
  }

  const signoutUser = () => {
    if (auth.currentUser !== null) {
      auth.signOut()
        .then(() => {
          navigate('/login')
        })
        .catch((error) => {
          console.log('error signout !', error)
        })
    }
  }

  const DisplayUserInformations = () => {
    if (auth.currentUser !== null) {
      return (
        <Box>
          <Box>Name: {auth.currentUser.displayName}</Box>
          <Box>Mail: {auth.currentUser.email}</Box>
          <Box>photoUrl: {auth.currentUser.photoURL}</Box>
        </Box>
      )
    }
  }

  const editInfos = () => {
    switch (isFormDisabled) {
      case true:
        setIsFormDisabled(false)
        break
      case false:
        updateUserProfile()
        setIsFormDisabled(true)
        break
    }
  }

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Account</h1>

      <Avatar
        alt="Remy Sharp"
        src={auth.currentUser ? `${auth.currentUser.photoURL}` : 'https://placehold.co/80'}
        sx={{ width: 80, height: 80 }}
      />

      <Button
        variant="contained"
        startIcon={isFormDisabled ? <EditIcon /> : <DoneIcon />}
        onClick={() => editInfos()}>
        {isFormDisabled ? 'Edit' : 'Send'}
      </Button>

      <FormGroup sx={{ my: 3 }}>
        <TextField
          sx={{ my: 3 }}
          id="name"
          label="Name"
          variant="outlined"
          defaultValue={auth.currentUser ? auth.currentUser.displayName : 'Name'}
          disabled={isFormDisabled}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
        />
        <TextField
          id="mail"
          label="Mail"
          variant="outlined"
          value={auth.currentUser ? auth.currentUser.email : 'email'}
          disabled={isFormDisabled}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value) }}
        />
      </FormGroup>

      <Button variant="text" onClick={() => updateUserProfile()}>Update profile</Button>
      <Button variant="text" onClick={() => signoutUser()}>Signout</Button>
    </>
  )
}

export default AccountPage