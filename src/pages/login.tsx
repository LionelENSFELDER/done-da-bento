import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth();
  const navigate = useNavigate()

  const authUser = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user !== null) {
              navigate('/')
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error: ', errorCode, errorMessage)
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error: ', errorCode, errorMessage)
      });
  }
  return (
    <>
      <Link to="/">Home</Link>
      {auth.currentUser && auth.currentUser !== null ? <h1>User is logged</h1> : <h1>User not logged</h1>}
      <Box
        component="form"
        sx={{
          backgroundColor: '#fff',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={mail}
          id="outlined-basic"
          label="Mail"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setMail(event.target.value) }}
        />
        <TextField
          value={password}
          id="outlined-basic"
          label="Mot de passe"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }}
        />
        <Button variant="text" onClick={() => authUser()}>Text</Button>
      </Box>
    </>
  )
}

export default LoginPage