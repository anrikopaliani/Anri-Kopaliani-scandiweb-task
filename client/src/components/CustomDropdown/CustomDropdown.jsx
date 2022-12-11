import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import DetectOutsideClick from "../DetectOutsideClick";
import styles from "./CustomDropdown.module.css";
import arrowDown from "../../images/arrowDown.png";

class CustomDropdown extends PureComponent {
  state = {
    isDropdownOpen: false,
  };

  openDropdown = () => {
    this.setState((prevState) => ({
      ...prevState,
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  setCurrency = (symbol) => {
    const { selectCurrency } = this.context;
    selectCurrency(symbol);
    this.setState((prevState) => ({ ...prevState, isDropdownOpen: false }));
  };

  render() {
    const { selectedCurrency } = this.context;
    const { currencies } = this.props;

    return (
      <div className={styles.dropdownContainer}>
        <div onClick={this.openDropdown} className={styles.dropdownHeader}>
          {selectedCurrency}
          <img src={arrowDown} alt="" />
        </div>
        {this.state.isDropdownOpen && (
          <DetectOutsideClick openDropdown={this.openDropdown}>
            <ul className={styles.dropdown}>
              {currencies.map((cur) => {
                return (
                  <li
                    onClick={() => this.setCurrency(cur.symbol)}
                    key={cur.symbol}
                  >
                    {cur.symbol} {cur.label}
                  </li>
                );
              })}
            </ul>
          </DetectOutsideClick>
        )}
      </div>
    );
  }
}

CustomDropdown.contextType = storeContext;

export default CustomDropdown;
