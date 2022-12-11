import { PureComponent } from "react";
import styles from "./CartProduct.module.css";
import CartProductAttributes from "./CartProductAttributes";
import ColorAttributes from "./ColorAttributes";

class CartProductPresentation extends PureComponent {
  render() {
    const {
      product,
      price,
      selectedAttributes,
      decreaseAmount,
      increaseAmount,
      amount,
    } = this.props;
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
            <button onClick={() => increaseAmount(product.id)}>+</button>
            <h1 style={{ textAlign: "center" }}>{amount}</h1>
            <button onClick={() => decreaseAmount(product.id)}>-</button>
          </div>
          <img src={product.gallery[0]} alt="" />
        </div>
      </div>
    );
  }
}

export default CartProductPresentation;
