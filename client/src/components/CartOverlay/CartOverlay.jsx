import React, { Component } from "react";
import styles from "./CartOverlay.module.css";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContext";
import CartProduct from "./CartProduct";

class CartOverlay extends Component {
  render() {
    const { closeOverlay } = this.props;
    const { cart, selectedCurrency } = this.context;
    // get the amount of products in the cart
    const amount = cart.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);

    // calculate the total price
    const price = cart.reduce((prev, curr) => {
      const smth = curr.prices.find(
        (price) => price.currency.symbol === selectedCurrency
      );
      return prev + curr.amount * smth.amount;
    }, 0);

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
                  <CartProduct
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

CartOverlay.contextType = storeContext;

export default CartOverlay;
