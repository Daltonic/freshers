import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useGlobalState, setGlobalState, latestPrice } from './store'
import { auth, onAuthStateChanged } from './firebase'
import Product from './views/Product'
import Home from './views/Home'
import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import AuthGuard from './AuthGuard'
import EditProduct from './views/EditProduct'
import AddProduct from './views/AddProduct'
import Cart from './views/Cart'
import Chat from './views/Chat'
import ChatList from './views/ChatList'
import { loadWeb3 } from './shared/Freshers'

function App() {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [alert] = useGlobalState('alert')

  useEffect(() => {
    loadWeb3()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setGlobalState('isLoggedIn', true)
      } else {
        setUser(null)
        setGlobalState('isLoggedIn', false)
      }
      setIsLoaded(true)
    })
    latestPrice()
  }, [])

  return (
    <div className="App">
      {isLoaded ? (
        <>
          {alert.show ? (
            <div
              className={`text-white px-6 py-2 border-0 rounded relative bg-${alert.color}-500`}
            >
              <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell" />
              </span>
              <span className="inline-block align-middle mx-4">
                <b className="capitalize">Alert!</b> {alert.msg}!
              </span>
              <button
                onClick={() =>
                  setGlobalState('alert', { show: false, msg: '' })
                }
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
              >
                <span>×</span>
              </button>
            </div>
          ) : null}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route
              path="product/edit/:id"
              element={
                <AuthGuard user={user}>
                  <EditProduct />
                </AuthGuard>
              }
            />
            <Route
              path="product/add"
              element={
                <AuthGuard user={user}>
                  <AddProduct />
                </AuthGuard>
              }
            />
            <Route
              path="chat/:receiverID"
              element={
                <AuthGuard user={user}>
                  <Chat />
                </AuthGuard>
              }
            />
            <Route
              path="customers"
              element={
                <AuthGuard user={user}>
                  <ChatList />
                </AuthGuard>
              }
            />
            <Route path="cart" element={<Cart />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </>
      ) : null}
    </div>
  )
}

export default App
