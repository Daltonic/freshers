import { useState } from 'react'
import Card from '@material-tailwind/react/Card'
import CardStatusFooter from '@material-tailwind/react/CardStatusFooter'
import { Link } from 'react-router-dom'
import { Image, Button } from '@material-tailwind/react'
import { setGlobalState, useGlobalState } from '../store'

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty)
  const [cart] = useGlobalState('cart')

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  const increaseQty = () => {
    let cartItems = [...cart]
    const newItem = { ...item, qty: (item.qty += 1), stock: (item.stock -= 1) }
    cartItems[item] = newItem
    setGlobalState('cart', cartItems)
    setQty(newItem.qty)
  }

  const decreaseQty = () => {
    let cartItems = [...cart]
    if (qty == 1) {
      const index = cartItems.indexOf(item)
      cartItems.splice(index, 1)
    } else {
      const newItem = {
        ...item,
        qty: (item.qty -= 1),
        stock: (item.stock += 1),
      }
      cartItems[item] = newItem
      setQty(newItem.qty)
    }
    setGlobalState('cart', cartItems)
  }

  return (
    <Card className="flex flex-row justify-between items-end my-4">
      <Link
        to={'/product/' + item.id}
        className="h-12 w-12 object-contain mr-4"
      >
        <Image
          src={item.imgURL}
          alt={item.name}
          rounded={false}
          raised={true}
        />
      </Link>

      <CardStatusFooter
        color="green"
        amount={toCurrency(item.price)}
        date={item.name}
      >
        <div className="flex flex-row justify-center items-center mx-4">
          <Button
            color="green"
            buttonType="filled"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={decreaseQty}
          >
            -
          </Button>
          <span className="mx-4">{qty}</span>
          <Button
            color="green"
            buttonType="filled"
            size="sm"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            onClick={increaseQty}
            disabled={item.stock == 0}
          >
            +
          </Button>
        </div>
      </CardStatusFooter>

      <span className="text-sm text-gray-500">
        Sub Total: {toCurrency(item.price * qty)}
      </span>
    </Card>
  )
}

export default CartItem
