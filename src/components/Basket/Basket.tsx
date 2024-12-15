import { useNavigate } from "react-router-dom";
import styles from './Basket.module.css'
import { IoReturnDownBack } from "react-icons/io5";

interface CartItem {
    id: number,
    title: string,
    price: number,
    image: string,
}

interface BasketProps {
    cart: CartItem[]
}

const Basket = ({ cart }: BasketProps) => {
    const navigate  = useNavigate()
    
    return (
      <div>
        <div className={styles.btnItemContainer}>
          <button className={styles.backBtn} onClick={() => navigate("/")}><IoReturnDownBack size={32}/></button>
          <h2>Items in basket: {cart.length}</h2>
        </div>
        <div className={styles.container}>
          <ul className={styles.list}>
            {cart.map((item) => (
              <li key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "150px" }}
                />
                <h3>{item.title}</h3>
                <p>{item.price}$</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Basket