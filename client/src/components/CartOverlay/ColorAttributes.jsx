import React, { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ColorAttributes.module.css";

class ColorAttributes extends PureComponent {
  render() {
    const { items, selected } = this.props;
    return (
      <div className={styles.container}>
        {items.map((color) => {
          return (
            <div
              style={
                color.value === selected
                  ? { border: "1px solid #5ECE7B", padding: "1px" }
                  : null
              }
              className={styles.colorContainer}
              key={uuidv4()}
            >
              <div
                style={{
                  background: color.value,
                  width: "30px",
                  height: "30px",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ColorAttributes;
