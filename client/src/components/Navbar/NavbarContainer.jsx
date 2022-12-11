import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import NavbarPresentation from "./NavbarPresentation";

class Navbar extends PureComponent {
  state = {
    value: "$",
  };

  render() {
    const { categories, currencies, cart } = this.context;
    const { showOverlay, showCartOverlay } = this.props;
    const amount = cart.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
    return (
      <NavbarPresentation
        showCartOverlay={showCartOverlay}
        showOverlay={showOverlay}
        categories={categories}
        currencies={currencies}
        amount={amount}
      />
    );
  }
}

Navbar.contextType = storeContext;
export default Navbar;
