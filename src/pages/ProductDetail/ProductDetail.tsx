import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styles from './ProductDetail.module.css'
import Loading from "../../components/Loading/Loading";
import { Toaster, toast } from "react-hot-toast";
import { FaShoppingBasket } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
// import Basket from "../../components/Basket/Basket";

interface Card {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
}

const ProductDetail = ({ addToCart, cart }) => {

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
        <Toaster position="top-right" reverseOrder={false} />
        <div className={styles.backSvgWrapper}>
          <button className={styles.backIcons} onClick={() => navigate("/")}>
            <IoReturnDownBack size={32} />
          </button>
          <button
            onClick={() => navigate("/basket")}
            className={styles.iconButton}
          >
            <FaShoppingBasket size={27}/>
            {cart.length}
          </button>
        </div>

        <div className={styles.productTitleWrapper}>
          <img src={product.image} alt={product.title} />
          <div>
            <h1>{product.title}</h1>
            <div className={styles.priceBtnWrapper}>
              <h3 className={styles.price}>
                Price: <span>{product.price}$</span>
              </h3>
              <button
              className={styles.btnAdd}
                onClick={() => {
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  });
                  toast.success("Successfully added to basket");
                }}
              >
                Click to add<IoIosAddCircleOutline size={32} />
              </button>
            </div>
          </div>
        </div>
        <p className={styles.overview}>
          <span>Overview: </span>
          {product.description}
        </p>
      </div>
    );
}

export default ProductDetail