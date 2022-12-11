import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import CartPagePresentation from "./CartPagePresentation";

class CartPage extends PureComponent {
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
      <CartPagePresentation
        cart={cart}
        selectedCurrency={selectedCurrency}
        tax={tax}
        quantity={quantity}
        price={price}
      />
    );
  }
}

CartPage.contextType = storeContext;

export default CartPage;
