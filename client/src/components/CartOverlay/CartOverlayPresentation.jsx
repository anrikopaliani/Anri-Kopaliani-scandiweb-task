import { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./CartOverlay.module.css";
import CartProductContainer from "./CartProductContainer";

class CartOverlayPresentation extends PureComponent {
  render() {
    const { closeOverlay, amount, cart, selectedCurrency, price } = this.props;
    return (
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={closeOverlay}></div>
        <div className={styles.content}>
          <div className={styles.productDetails}>
            <p className={styles.title}>
              <span>My Bag</span>, {amount} items
            </p>
            <div>
              <div>
                {cart.map((product) => (
                  <CartProductContainer
                    selectedAttributes={product.selectedAttributes}
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.totalContainer}>
            <div className={styles.total}>
              <p>Total: </p>
              <p>
                {selectedCurrency} {price.toFixed(2)}
              </p>
            </div>
            <div className={styles.buttons}>
              <Link to="/cart" onClick={closeOverlay} className={styles.bagBtn}>
                VIEW BAG
              </Link>
              <button className={styles.checkOutBtn} onClick={this.checkOut}>
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlayPresentation;
