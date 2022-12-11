import { PureComponent } from "react";
import ColorAttributes from "../CartOverlay/ColorAttributes";
import CartProductAttributes from "../CartOverlay/CartProductAttributes";
import styles from "./SingleCartItem.module.css";
import arrowLeft from "../../images/arrowLeft.png";
import arrowRight from "../../images/arrowRight.png";

class SingleCartItemPresentation extends PureComponent {
  render() {
    const {
      product,
      price,
      decreaseProductAmount,
      increaseProductAmount,
      imageIndex,
      previousImage,
      nextImage,
    } = this.props;
    return (
      <>
        <section className={styles.container}>
          <div>
            <h3>{product.brand}</h3>
            <p>{product.name}</p>
            <p style={{ fontWeight: "bold" }}>
              {price?.currency.symbol} {price?.amount}
            </p>
            <div>
              {product.attributes.map((attribute, index) => {
                const attr = product.selectedAttributes.find(
                  (item) => item.name === attribute.name
                );
                return attribute.name === "Color" ? (
                  <div key={attribute.id}>
                    <p style={{ fontWeight: "bold" }}>{attribute.name}:</p>
                    <ColorAttributes
                      selected={attr && attr.selected}
                      items={attribute.items}
                    />
                  </div>
                ) : (
                  <div key={attribute.id}>
                    <p style={{ fontWeight: "bold" }}>{attribute.name}:</p>
                    <CartProductAttributes
                      selected={attr && attr.selected}
                      items={attribute.items}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.imgContainer}>
            <div className={styles.buttons}>
              <button onClick={() => increaseProductAmount(product.id)}>
                +
              </button>
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {product.amount}
              </span>
              <button onClick={() => decreaseProductAmount(product.id)}>
                -
              </button>
            </div>
            <div className={styles.slider}>
              <img
                className={styles.img}
                src={product.gallery[imageIndex]}
                alt=""
              />
              {product.gallery.length > 1 && (
                <div className={styles.sliderButtonContainer}>
                  <button onClick={previousImage}>
                    <img src={arrowLeft} alt="" />
                  </button>
                  <button onClick={nextImage}>
                    <img src={arrowRight} alt="" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <div className={styles.horizontalLine}></div>
      </>
    );
  }
}

export default SingleCartItemPresentation;
