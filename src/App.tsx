import './App.css'
import Main from './pages/Main/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
