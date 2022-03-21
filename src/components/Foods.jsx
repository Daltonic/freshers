import Food from './Food'

const Foods = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center items-center space-x-3 space-y-3 mt-12 overflow-x-hidden">
      {products.map((item, i) => (
        <Food item={item} key={i} />
      ))}
    </div>
  )
}

export default Foods
