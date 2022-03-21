import CartItem from '../components/CartItem'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { addToOrders } from '../firebase'
import { setAlert, setGlobalState, useGlobalState } from '../store'

const Cart = () => {
  const [cart] = useGlobalState('cart')
  const [isLoggedIn] = useGlobalState('isLoggedIn')
  const [total, setTotal] = useState(0)

  const getTotal = () => {
    let total = 0
    cart.forEach((item) => (total += item.qty * item.price))
    setTotal(total)
  }

  const placeOrder = () => {
    if (!isLoggedIn) return

    addToOrders(cart).then((data) => {
      setGlobalState('cart', [])
      setAlert(`Order Placed with Id: ${data.order}`)
    })
  }

  const clearCart = () => {
    setGlobalState('cart', [])
  }

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  useEffect(() => getTotal(), [cart])

  return (
    <div className="addProduct">
      <Header />
      <div className="relative flex flex-col justify-center items-center">
        {cart.length > 0 ? (
          <div className="mt-10 ">
            <div className="relative flex w-full flex-wrap items-stretch px-8">
              <div className="flex flex-wrap justify-center items-center h-64 overflow-y-scroll">
                {cart.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center my-4 px-8">
              <h4>Grand Total:</h4>
              <span className="text-sm text-green-500">
                {toCurrency(total)}
              </span>
            </div>
            <div className="flex flex-row justify-between items-center my-4 px-8">
              <Button
                onClick={clearCart}
                color="red"
                ripple="light"
                type="submit"
              >
                Clear Cart
              </Button>
              {isLoggedIn ? (
                <Button
                  onClick={placeOrder}
                  color="green"
                  ripple="light"
                  type="submit"
                >
                  Place Order
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-10 text-center">
            <h4 className="mb-4">Cart empty, add some items to your cart</h4>
            <Link to="/" className="text-green-500">
              Choose Product
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
