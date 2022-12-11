import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";

import CartProductPresentation from "./CartProductPresentation";

class CartProductContainer extends PureComponent {
  state = {
    amount: this.props.product.amount,
  };

  increaseAmount = (id) => {
    const { increaseProductAmount } = this.context;
    increaseProductAmount(id);
    this.setState((prevState) => {
      return {
        ...prevState,
        amount: prevState.amount + 1,
      };
    });
  };

  decreaseAmount = (id) => {
    const { decreaseProductAmount } = this.context;
    decreaseProductAmount(id);
    this.setState((prevState) => {
      return {
        ...prevState,
        amount: prevState.amount - 1,
      };
    });
  };

  render() {
    const { selectedAttributes, product } = this.props;
    const { amount } = this.state;
    const { selectedCurrency } = this.context;

    const price = product?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency
    );

    return (
      <CartProductPresentation
        product={product}
        price={price}
        selectedAttributes={selectedAttributes}
        amount={amount}
        decreaseAmount={this.decreaseAmount}
        increaseAmount={this.increaseAmount}
      />
    );
  }
}

CartProductContainer.contextType = storeContext;

export default CartProductContainer;
