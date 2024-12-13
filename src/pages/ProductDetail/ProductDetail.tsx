import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styles from './ProductDetail.module.css'
import Loading from "../../components/Loading/Loading";

interface Card {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
}

const ProductDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Card | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <Loading />
        )
    }

    if (!product) {
        return <p>Product not found</p>
    }

    return (
      <div className={styles.wrapper}>
        <button onClick={() => navigate('/')}>Back</button>
        <div className={styles.productTitleWrapper}>
          <img src={product.image} alt={product.title} />
          <div>
            <h1>{product.title}</h1>
            <h3 className={styles.price}>Price: <span>{product.price}$</span></h3>
          </div>
        </div>
        <p className={styles.overview}><span>Overview: </span>{product.description}</p>
      </div>
    );
}

export default ProductDetail