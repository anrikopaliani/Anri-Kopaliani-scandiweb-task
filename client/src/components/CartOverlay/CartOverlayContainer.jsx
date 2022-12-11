import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import CartOverlayPresentation from "./CartOverlayPresentation";

class CartOverlayContainer extends PureComponent {
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
      <CartOverlayPresentation
        closeOverlay={closeOverlay}
        amount={amount}
        cart={cart}
        selectedCurrency={selectedCurrency}
        price={price}
      />
    );
  }
}

CartOverlayContainer.contextType = storeContext;

export default CartOverlayContainer;
