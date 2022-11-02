import React, { Component } from "react";
import styles from "./CartPage.module.css";
import { storeContext } from "../../context/StoreContext";
import SingleCartItem from "./SingleCartItem";

class CartPage extends Component {
  render() {
    const { cart, selectedCurrency } = this.context;
    const quantity = cart.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);

    const price = cart.reduce((prev, curr) => {
      const smth = curr.prices.find(
        (price) => price.currency.symbol === selectedCurrency
      );
      return prev + curr.amount * smth.amount;
    }, 0);

    const tax = (price * 21) / 100;

    return (
      <div className={styles.cartPageContainer}>
        <h1>CART</h1>
        <div className={styles.horizontalLine}></div>
        {cart.map((cartItem) => {
          return <SingleCartItem product={cartItem} key={cartItem.id} />;
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

CartPage.contextType = storeContext;

export default CartPage;
