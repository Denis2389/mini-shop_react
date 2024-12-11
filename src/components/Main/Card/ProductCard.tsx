import styles from './ProductCard.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

interface Card {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
}

function ProductCard() {

    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [sortOrder, setSortOrder] = useState('asc')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const handleSortChange = (order: string) => {
        setSortOrder(order)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                const response = await axios.get('https://fakestoreapi.com/products')
                setCards(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    // cards.filter((card) => {
    //     if ()
    // }) //////// Next add filter to asc and all products !!!! /////////

    if (loading) {
        return <div>Loading web site...</div>
    }

  return (
    <div className={styles.productCard}>
      <select onChange={(e) => handleSortChange(e.target.value)}>
        Price
        <option value="asc">Ascending</option>
        <option value="desc">Escending</option>
      </select>

      <select onChange={(e) => handleCategoryChange(e.target.value)}>
        Category
        <option value="all">All category</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
      </select>

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <div className={styles.photo}>
              <img src={card.image} alt={card.title} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.price}$</p>
            {/* <p>{card.description}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCard