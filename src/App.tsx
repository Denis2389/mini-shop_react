import './App.css'
import Main from './pages/Main/Main';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Basket from './components/Basket/Basket';

interface Cart {
  id: number,
  title: string,
  price: number,
  image: string,
  description: string,
  category: string,
}

function App() {

  const [cartItems, setCartItems] = useState<Cart[]>([])

  const addToCart = (product: Cart) => {
    setCartItems((prevCart) => [...prevCart, product])
  }

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/product/:id' element={<ProductDetail addToCart={addToCart} cart={cartItems}/>} />
          <Route path='/basket' element={<Basket cart={cartItems}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
