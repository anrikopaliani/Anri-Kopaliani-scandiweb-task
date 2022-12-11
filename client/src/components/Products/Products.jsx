import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import styles from "./Products.module.css";
import ProductCardContainer from "./ProductCardContainer";

class Products extends PureComponent {
  render() {
    const { products, selectedCategory } = this.context;
    const filteredProduct = products.find(
      (product) => product.name === selectedCategory
    );
    return (
      <div className={styles.productsContainer}>
        <h1 className={styles.title}>{selectedCategory}</h1>
        <div className={styles.center}>
          <div className={styles.products}>
            {filteredProduct?.products?.map((product) => {
              return (
                <ProductCardContainer
                  key={product.id}
                  {...product}
                  product={product}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Products.contextType = storeContext;

export default Products;
