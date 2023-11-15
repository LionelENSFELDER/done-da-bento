import { getAuth, updateProfile } from "firebase/auth"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const AccountPage = () => {
  const auth = getAuth();

  const updateUserProfile = () => {
    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, {
        displayName: "Liam 1", photoURL: "https://placehold.co/80"
      }).then(() => {
        // TODO: reload page to display changes
        console.log('account page reload')
      }).catch((error) => {
        console.log('error: ', error)
      });
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

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Account</h1>
      <DisplayUserInformations />
      <Button variant="text" onClick={() => updateUserProfile()}>Update profile</Button>
    </>
  )
}

export default AccountPage