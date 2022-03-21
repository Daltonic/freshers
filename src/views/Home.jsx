import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Foods from '../components/Foods'
import { getProducts } from '../firebase'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then((products) => {
      products.filter((item) => {
        item.price = Number(item.price)
        item.qty = 0
      })
      setProducts(products)
    })
  }, [])

  return (
    <div className="home">
      <Header />
      <Foods products={products} />
    </div>
  )
}

export default Home
