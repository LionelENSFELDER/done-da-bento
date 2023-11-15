import { getAuth } from "firebase/auth"
import { Link } from 'react-router-dom';
import './App.css'

function App() {
  const auth = getAuth()
  return (
    <>
      {auth.currentUser !== null ? <h1>User is logged</h1> : <h1>User not logged</h1>}
      <Link to="/login">  Login  |</Link>
      <Link to="/account">  Account  |</Link>
      <div>
        <h1>App</h1>
      </div>
    </>
  )
}

export default App
