import { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import cartLogo from "../../images/cartlogo.png";

class ProductCardPresentation extends PureComponent {
  render() {
    const {
      price,
      selectedCurrency,
      id,
      inStock,
      gallery,
      name,
      brand,
      handleAddToCart,
      showCartLogo,
      showCart,
      closeCart,
    } = this.props;
    return (
      <div
        onMouseEnter={showCart}
        onMouseLeave={closeCart}
        className={styles.container}
      >
        <div className={styles.imgContainer}>
          <Link
            to={`/product/${id}`}
            style={!inStock ? { opacity: 0.5 } : null}
            className={styles.card}
          >
            <img className={styles.img} src={gallery[0]} alt="" />
          </Link>
          {!inStock && (
            <Link to={`/product/${id}`} className={styles.header}>
              OUT OF STOCK
            </Link>
          )}
          {showCartLogo && inStock && (
            <div onClick={handleAddToCart} className={styles.addToCart}>
              <img src={cartLogo} alt="" />
            </div>
          )}
        </div>
        <Link
          to={`/product/${id}`}
          style={!inStock ? { opacity: 0.5 } : null}
          className={styles.card}
        >
          <div className={styles.details}>
            <p>
              {brand} {name}
            </p>
            <p className={styles.price}>
              {selectedCurrency} {price?.amount}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCardPresentation;
