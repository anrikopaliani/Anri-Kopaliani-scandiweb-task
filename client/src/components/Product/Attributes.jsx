import React, { PureComponent } from "react";
import styles from "./Attributes.module.css";

class Attributes extends PureComponent {
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

    const renderAttributes = () => {
      return attribute?.items.map((item) => (
        <div
          className={styles.selectedColorBorder}
          key={item.id}
          style={
            attribute.type === "swatch" && item.value === selected
              ? { border: "1px solid #5ECE7B" }
              : { border: "1px solid transparent" }
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
      ));
    };

    return (
      <>
        <div className={styles.attributes}>
          <h4 className={styles.attributeTitle}>{attribute.name}: </h4>
          <div className={styles.attributesContainer}>{renderAttributes()}</div>
        </div>
      </>
    );
  }
}

export default Attributes;
