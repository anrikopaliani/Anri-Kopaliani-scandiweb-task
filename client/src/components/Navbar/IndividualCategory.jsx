import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContext";
import styles from "./IndividualCategory.module.css";

class IndividualCategory extends PureComponent {
  render() {
    const { selectedCategory, changeCategory } = this.context;
    const { category } = this.props;

    return (
      <Link
        className={styles.linkStyle}
        to="/"
        onClick={() => changeCategory(category)}
        style={
          selectedCategory === category
            ? { color: "#5ECE7B", borderBottom: "1px solid #5ECE7B" }
            : { borderBottom: "1px solid white" }
        }
      >
        {category}
      </Link>
    );
  }
}

IndividualCategory.contextType = storeContext;

export default IndividualCategory;
