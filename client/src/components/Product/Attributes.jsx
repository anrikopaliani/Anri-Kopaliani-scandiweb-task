import React, { Component } from "react";
import styles from "./Attributes.module.css";

class Attributes extends Component {
  state = {
    selected: "",
  };

  handleClick = (e) => {
    const { attributeChange } = this.props;
    attributeChange(e.target.name, e.target.value);
    this.setState({ selected: e.target.value });
  };

  render() {
    const { attribute } = this.props;
    const { selected } = this.state;
    return (
      <>
        <div className={styles.attributes}>
          <h4 className={styles.attributeTitle}>{attribute.name}: </h4>
          <div className={styles.attributesContainer}>
            {attribute?.items.map((item) => {
              return (
                <div
                  className={
                    attribute.type === "swatch" && item.value === selected
                      ? styles.selectedColorBorder
                      : ""
                  }
                  key={item.id}
                  style={
                    attribute.type === "swatch" && item.value === selected
                      ? { border: "1px solid #5ECE7B" }
                      : null
                  }
                >
                  <button
                    type="button"
                    style={
                      attribute.type === "swatch"
                        ? {
                            backgroundColor: item.value,
                            border: "none",
                          }
                        : !item.value.startsWith("#") && item.value === selected
                        ? { backgroundColor: "black", color: "white" }
                        : null
                    }
                    onClick={this.handleClick}
                    name={attribute.name}
                    key={item.id}
                    value={item.value}
                  >
                    {!item.value.startsWith("#") && item.value}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Attributes;
