import React, { Component } from "react";
import { storeContext } from "../../context/StoreContext";
import logo from "../../images/a-logo.png";
import cartLogo from "../../images/Vector.png";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import IndividualCategory from "./IndividualCategory";
import styles from "./Navbar.module.css";

class Navbar extends Component {
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
      <nav
        className={styles.navbar}
        onClick={showCartOverlay ? showOverlay : null}
      >
        <ul className={styles.categories}>
          {categories.map((item) => {
            return <IndividualCategory category={item} key={item} />;
          })}
        </ul>
        <div className={styles.greenLogo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.cartLogoContainer}>
          <CustomDropdown currencies={currencies} />
          <div className={styles.someContainer}>
            <div className={styles.cartAmount}>{amount}</div>
            <img onClick={showOverlay} src={cartLogo} alt="cart" />
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = storeContext;
export default Navbar;
