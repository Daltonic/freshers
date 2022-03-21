import { useState } from 'react'
import Button from '@material-tailwind/react/Button'
import { Link, useNavigate } from 'react-router-dom'
import { registerWithEmailAndPassword, logout } from '../firebase'
import { signInWithCometChat } from '../cometChat'
import { setAlert } from '../store'

const Register = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (
      email == '' ||
      password == '' ||
      fullname == '' ||
      phone == '' ||
      address == ''
    )
      return
    registerWithEmailAndPassword(
      email,
      password,
      fullname,
      phone,
      address
    ).then((user) => {
      logout().then(() => {
        signInWithCometChat(user.uid, fullname).then(() => {
          resetForm()
          setAlert('Registeration in successfully')
          navigate('/signin')
        })
      })
    })
  }

  const resetForm = () => {
    setFullname('')
    setEmail('')
    setPassword('')
    setPhone('')
    setAddress('')
  }

  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="mt-10 ">
        <form
          onSubmit={handleRegister}
          className="relative flex w-full flex-wrap items-stretch w-96 px-8"
        >
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="text"
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
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
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="number"
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
              placeholder="081 056 8262"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="text"
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="relative flex w-full flex-wrap items-stretch justify-between items-center">
            <Link className="text-green-500" to="/signin">
              Already a member? sign in
            </Link>
            <Button color="green" ripple="light" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
