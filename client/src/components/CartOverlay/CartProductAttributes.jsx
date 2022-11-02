import React, { Component } from "react";
import styles from "./CartProductAttributes.module.css";

class CartProductAttributes extends Component {
  render() {
    const { items, selected } = this.props;
    const selectedAttributeStyle = { background: "black", color: "white" };
    return (
      <div className={styles.container}>
        {items.map((item) => {
          return (
            <div
              style={item.value === selected ? selectedAttributeStyle : null}
              key={item.id}
              className={styles.attribute}
            >
              {item.value.startsWith("#") ? "" : item.value}
            </div>
          );
        })}
      </div>
    );
  }
}

export default CartProductAttributes;
