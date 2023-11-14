import { useState, useContext } from 'react'
import firebaseApp from '../adapters/firebase';
import firebaseAuth from '../adapters/firebase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Button from '@mui/material/Button';
import { GlobalContext } from '../context'

console.log(firebaseApp, firebaseAuth)

function LoginPage() {
  const { userLogged } = useContext(GlobalContext)
  const { updateUserLogged } = useContext(GlobalContext)

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('unknow user')
  const authUser = () => {

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {

        signInWithEmailAndPassword(auth, mail, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateUserLogged(user);
            if (userLogged) {
              setTitle('User mail is ' + user.email + '.')
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
      <h1>{title}</h1>
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