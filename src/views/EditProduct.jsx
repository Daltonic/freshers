import Header from '../components/Header'
import Button from '@material-tailwind/react/Button'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { updateProduct, getProduct, auth } from '../firebase'
import { setAlert } from '../store'
import { useGlobalState } from '../store'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [description, setDescription] = useState('')
  const [account] = useGlobalState('connectedAccount')

  useEffect(() => {
    getProduct(id).then((data) => {
      if (auth.currentUser.uid != data.uid) navigate('/')
      setProduct(data)
      setName(data.name)
      setPrice(Number(data.price))
      setImgURL(data.imgURL)
      setDescription(data.description)
    })
  }, [id])

  const handleProductUpdate = (e) => {
    e.preventDefault()
    if (!account) {
      setAlert('Please connect your metamask account!', 'red')
      return
    }

    if (name == '' || price == '' || imgURL == '' || description == '') return
    updateProduct({
      ...product,
      name,
      price,
      imgURL,
      description,
      account,
    }).then(() => {
      setAlert('Product updated successfully')
      navigate('/product/' + product.id)
    })
  }

  return (
    <div className="editProduct">
      <Header />
      <div className="relative flex flex-col justify-center items-center">
        <div className="mt-10 ">
          <form
            onSubmit={handleProductUpdate}
            className="relative flex w-full flex-wrap items-stretch w-96 px-8"
          >
            <h4 className="font-semibold text-xl my-4">Update Product</h4>
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
              <Link className="text-green-500" to={`/product/` + id}>
                Back to product
              </Link>
              <Button color="green" ripple="light" type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
