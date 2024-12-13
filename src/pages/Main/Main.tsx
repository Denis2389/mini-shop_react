import styles from './Main.module.css'
import ProductCard from "../../components/Main/Card/ProductCard"


const Main = () => {
    return (
      <div className={styles.container}>
        <ProductCard />
      </div>
    );
}

export default Main