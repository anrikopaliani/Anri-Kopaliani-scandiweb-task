import React, { Component } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContext";
import styles from "./IndividualCategory.module.css";

class IndividualCategory extends Component {
  render() {
    const { selectedCategory, changeCategory } = this.context;
    const { category, closeOverlay } = this.props;

    return (
      <Link
        className={styles.linkStyle}
        to="/"
        onClick={() => changeCategory(category)}
        style={
          selectedCategory === category
            ? { color: "#5ECE7B", borderBottom: "2px solid #5ECE7B" }
            : null
        }
      >
        {category}
      </Link>
    );
  }
}

IndividualCategory.contextType = storeContext;

export default IndividualCategory;
