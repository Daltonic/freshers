import React from 'react'
import Card from '@material-tailwind/react/Card'
import CardImage from '@material-tailwind/react/CardImage'
import CardBody from '@material-tailwind/react/CardBody'
import CardFooter from '@material-tailwind/react/CardFooter'
import H6 from '@material-tailwind/react/Heading6'
import Paragraph from '@material-tailwind/react/Paragraph'
import Button from '@material-tailwind/react/Button'
import { setAlert, setGlobalState, useGlobalState } from '../store'
import { Link } from 'react-router-dom'

const Food = ({ item }) => {
  const [cart] = useGlobalState('cart')

  const addToCart = (item) => {
    item.added = true
    let cartItems = [...cart]
    const newItem = { ...item, qty: (item.qty += 1), stock: (item.stock -= 1) }
    if (cart.find((_item) => _item.id == item.id)) {
      cartItems[item] = newItem
      setGlobalState('cart', [...cartItems])
    } else {
      setGlobalState('cart', [...cartItems, newItem])
    }
    setAlert(`${item.name} added to cart!`)
  }

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

  return (
    <div className="mx-4 my-6 w-64">
      <Card>
        <Link to={`/product/` + item.id}>
          <CardImage src={item.imgURL} alt={item.name} />
        </Link>

        <CardBody>
          <Link to={`/product/` + item.id}>
            <H6 color="gray">{item.name}</H6>
          </Link>

          <Paragraph color="gray">
            Don't be scared of the truth because we need to...
          </Paragraph>

          <div
            color="black"
            className="flex flex-row justify-between items-center"
          >
            <span className="font-semibold text-green-500">
              {toCurrency(item.price)}
            </span>
            <span className="text-xs text-black">{item.stock} in stock</span>
          </div>
        </CardBody>

        <CardFooter>
          {item.stock > 0 ? (
            <Button
              onClick={() => addToCart(item)}
              color="green"
              size="md"
              ripple="light"
              disabled={item.stock == 0}
            >
              Add To Cart
            </Button>
          ) : (
            <Button
              color="green"
              size="md"
              buttonType="outline"
              ripple="light"
              disabled
            >
              Out of Stock
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default Food
