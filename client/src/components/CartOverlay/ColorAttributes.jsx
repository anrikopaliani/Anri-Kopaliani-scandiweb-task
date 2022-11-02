import React, { Component } from "react";
import styles from "./ColorAttributes.module.css";

class ColorAttributes extends Component {
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
              key={color.id}
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
