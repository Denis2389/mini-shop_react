import { useNavigate } from "react-router-dom";
import styles from './Basket.module.css'
import { IoReturnDownBack } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface CartItem {
    id: number,
    title: string,
    price: number,
    image: string,
}

interface BasketProps {
    cart: CartItem[]
}

const Basket = ({ cart, setCart }: BasketProps) => {
    const navigate  = useNavigate()

    const handleDeleteItem = (id: number) => {
      const updatedCart = cart.filter((list) => list.id !== id);
      setCart(updatedCart)
    }
    
    return (
      <div>
        <div className={styles.btnItemContainer}>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            <IoReturnDownBack size={32} />
          </button>
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
                <div className={styles.delBtn}>
                  <p>{item.price}$</p>
                  <button onClick={() => handleDeleteItem(item.id)} className={styles.deleteBtn}>
                    <MdDelete size={23}/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Basket