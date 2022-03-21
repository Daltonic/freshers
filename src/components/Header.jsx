import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAlert, useGlobalState } from '../store'
import { logout } from '../firebase'
import { logOutWithCometChat } from '../cometChat'
import { connectWallet } from '../shared/Freshers'
import Navbar from '@material-tailwind/react/Navbar'
import NavbarContainer from '@material-tailwind/react/NavbarContainer'
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper'
import NavbarBrand from '@material-tailwind/react/NavbarBrand'
import NavbarToggler from '@material-tailwind/react/NavbarToggler'
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse'
import Nav from '@material-tailwind/react/Nav'
import NavItem from '@material-tailwind/react/NavItem'

const Header = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const [cart] = useGlobalState('cart')
  const [isLoggedIn] = useGlobalState('isLoggedIn')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout().then(() => {
      logOutWithCometChat().then(() => {
        setAlert('Logged out successfully')
        navigate('/signin')
      })
    })
  }

  return (
    <Navbar color="green" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <Link to="/">
            <NavbarBrand>Freshers</NavbarBrand>
          </Link>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="white"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          {isLoggedIn ? (
            <Nav leftSide>
              <NavItem ripple="light">
                <Link to="/customers">customers</Link>
              </NavItem>
              <NavItem ripple="light">
                <Link to="/product/add">Add Product</Link>
              </NavItem>
            </Nav>
          ) : (
            <></>
          )}
          <Nav rightSide>
            {isLoggedIn ? (
              <>
                {connectedAccount ? null : (
                  <NavItem
                    onClick={connectWallet}
                    active="light"
                    ripple="light"
                  >
                    <span className="cursor-pointer">Connect Wallet</span>
                  </NavItem>
                )}
                <NavItem onClick={handleSignOut} ripple="light">
                  <span className="cursor-pointer">Logout</span>
                </NavItem>
              </>
            ) : (
              <NavItem ripple="light">
                <Link to="/signin" className="cursor-pointer">
                  Login
                </Link>
              </NavItem>
            )}

            <NavItem ripple="light">
              <Link to="/cart">{cart.length} Cart</Link>
            </NavItem>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  )
}

export default Header
