import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logInWithEmailAndPassword } from '../firebase'
import { loginWithCometChat } from '../cometChat'
import { setAlert } from '../store'
import Button from '@material-tailwind/react/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email == '' || password == '') return
    logInWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        loginWithCometChat(user.uid).then(() => {
          resetForm()
          setAlert('Logged in successfully')
          navigate('/')
        })
      }
    })
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="mt-10 ">
        <form
          onSubmit={handleLogin}
          className="relative flex w-full flex-wrap items-stretch w-96 px-8"
        >
          <h4 className="font-semibold text-xl my-4">Login</h4>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="email"
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="password"
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative flex w-full flex-wrap items-stretch justify-between items-center">
            <Link className="text-green-500" to="/signup">
              New user sign up
            </Link>
            <Button color="green" ripple="light" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
