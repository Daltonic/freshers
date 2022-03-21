import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addProduct } from '../firebase'
import { setAlert } from '../store'
import { useGlobalState } from '../store'
import Button from '@material-tailwind/react/Button'
import Header from '../components/Header'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [description, setDescription] = useState('')
  const [account] = useGlobalState('connectedAccount')
  const navigate = useNavigate()

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!account) {
      setAlert('Please connect your metamask account!', 'red')
      return
    }

    if (name == '' || price == '' || imgURL == '' || description == '') return
    addProduct({ name, price, imgURL, description, account }).then(() => {
      setAlert('Product created successfully')
      navigate('/')
    })
  }

  return (
    <div className="addProduct">
      <Header />
      <div className="relative flex flex-col justify-center items-center">
        <div className="mt-10 ">
          <form
            onSubmit={handleAddProduct}
            className="relative flex w-full flex-wrap items-stretch w-96 px-8"
          >
            <h4 className="font-semibold text-xl my-4">Add Product</h4>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <input
                type="number"
                min={1}
                step={0.01}
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <input
                type="url"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
                placeholder="Product Image URL"
                value={imgURL}
                onChange={(e) => setImgURL(e.target.value)}
                required
              />
            </div>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="relative flex w-full flex-wrap items-stretch justify-between items-center">
              <Link className="text-green-500" to="/">
                Back to Home
              </Link>
              <Button color="green" ripple="light" type="submit">
                Save Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
