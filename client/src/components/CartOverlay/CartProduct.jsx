import React, { Component } from "react";
import { storeContext } from "../../context/StoreContext";
import styles from "./CartProduct.module.css";
import CartProductAttributes from "./CartProductAttributes";
import ColorAttributes from "./ColorAttributes";

class CardProduct extends Component {
  state = {
    amount: this.props.product.amount,
  };

  increaseAmount = (id) => {
    const { increaseProductAmount } = this.context;
    increaseProductAmount(id);
    this.setState((prevState) => {
      return {
        ...prevState,
        amount: prevState.amount + 1,
      };
    });
  };

  decreaseAmount = (id) => {
    const { decreaseProductAmount } = this.context;
    decreaseProductAmount(id);
    this.setState((prevState) => {
      return {
        ...prevState,
        amount: prevState.amount - 1,
      };
    });
  };

  render() {
    const { selectedAttributes, product } = this.props;
    const { amount } = this.state;
    const { selectedCurrency } = this.context;

    const price = product?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency
    );

    return (
      <div className={styles.cartProductContainer}>
        <div className={styles.productDetails}>
          <div className={styles.attributes}>
            <p>{product.brand}</p>
            <p>{product.name}</p>
            <p style={{ fontWeight: "bold" }}>
              {price.currency.symbol} {price.amount}
            </p>
            {product.attributes.map((attribute) => {
              const attr = selectedAttributes.find(
                (item) => item.name === attribute.name
              );
              return (
                <div key={attribute.id}>
                  <p>{attribute.name}:</p>
                  {attribute.name !== "Color" ? (
                    <CartProductAttributes
                      selected={attr && attr.selected}
                      items={attribute.items}
                    />
                  ) : (
                    <ColorAttributes
                      selected={attr && attr.selected}
                      items={attribute.items}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.amount}>
            <button onClick={() => this.increaseAmount(product.id)}>+</button>
            <h1 style={{ textAlign: "center" }}>{amount}</h1>
            <button onClick={() => this.decreaseAmount(product.id)}>-</button>
          </div>
          <img src={product.gallery[0]} alt="" />
        </div>
      </div>
    );
  }
}

CardProduct.contextType = storeContext;

export default CardProduct;
