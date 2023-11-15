import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {
  const { userLogged } = useContext(GlobalContext)
  const { updateUserLogged } = useContext(GlobalContext)

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const authUser = () => {

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {

        signInWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateUserLogged(user);
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
      {typeof userLogged === 'string' ? <h1>User not logged</h1> : <h1>User is logged</h1>}
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