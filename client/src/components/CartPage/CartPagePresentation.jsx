import { PureComponent } from "react";
import styles from "./CartPage.module.css";
import SingleCartItemContainer from "./SingleCartItemContainer";

class CartPagePresentation extends PureComponent {
  render() {
    const { cart, selectedCurrency, tax, quantity, price } = this.props;
    return (
      <div className={styles.cartPageContainer}>
        <h1>CART</h1>
        <div className={styles.horizontalLine}></div>
        {cart.map((cartItem) => {
          return (
            <SingleCartItemContainer product={cartItem} key={cartItem.id} />
          );
        })}
        <div className={styles.amountDetail}>
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>
              {selectedCurrency} {tax.toFixed(2)}
            </p>
            <p style={{ fontWeight: "bold" }}>{quantity}</p>
            <p style={{ fontWeight: "bold" }}>
              {selectedCurrency} {price.toFixed(2)}
            </p>
          </div>
        </div>
        <button className={styles.orderButton}>ORDER</button>
      </div>
    );
  }
}

export default CartPagePresentation;
