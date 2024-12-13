import styles from './ProductCard.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [sortOrder, setSortOrder] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')


    const handleSortChange = (event: SelectChangeEvent<string>) => {
      setSortOrder(event.target.value)
    }


    // const handleSortChange = (order: string) => {
    //     setSortOrder(order)
    // }

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
      setSelectedCategory(event.target.value)
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

    const sortedAndFilteredProducts = cards
      .filter((card) => {
        if(selectedCategory === 'all') return true;
        return card.category === selectedCategory
      })
      .sort((a, b) => {
        if(sortOrder === 'asc') return a.price - b.price;
        return b.price - a.price
      });


    if (loading) {
        return (
          <div>
            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress size={80}/>
            </Box>
          </div>
        );
    }

  return (
    <div className={styles.productCard}>
      <div className={styles.selectWrap}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Price</InputLabel>
            <Select
              label="Price"
              labelId="demo-simple-select-label"
              value={sortOrder}
              onChange={handleSortChange}
            >
              Price
              <MenuItem value="asc">To ascending</MenuItem>
              <MenuItem value="desc">To escending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              onChange={handleCategoryChange}
              value={selectedCategory}
              label="Category"
              labelId="demo-simple-select-label"
            >
              Category
              <MenuItem value="all">All category</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="jewelery">Jewelery</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <ul>
        {sortedAndFilteredProducts.map((card) => (
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