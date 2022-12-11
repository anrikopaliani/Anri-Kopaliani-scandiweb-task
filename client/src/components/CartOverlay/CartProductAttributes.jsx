import React, { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./CartProductAttributes.module.css";

class CartProductAttributes extends PureComponent {
  render() {
    const { items, selected } = this.props;
    const selectedAttributeStyle = { background: "black", color: "white" };
    return (
      <div className={styles.container}>
        {items.map((item) => {
          return (
            <div
              style={item.value === selected ? selectedAttributeStyle : null}
              key={uuidv4()}
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
