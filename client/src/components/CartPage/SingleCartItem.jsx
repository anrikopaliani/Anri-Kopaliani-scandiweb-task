import React, { Component } from "react";
import ColorAttributes from "../CartOverlay/ColorAttributes";
import CardProductAttributes from "../CartOverlay/CartProductAttributes";
import { storeContext } from "../../context/StoreContext";
import styles from "./SingleCartItem.module.css";
import arrowLeft from "../../images/arrowLeft.png";
import arrowRight from "../../images/arrowRight.png";

class SingleCartItem extends Component {
  state = {
    imageIndex: 0,
  };

  nextImage = () => {
    const { product } = this.props;
    this.setState((prevState) => {
      return {
        imageIndex: prevState.imageIndex + 1,
      };
    });
    if (this.state.imageIndex > product.gallery.length - 2) {
      this.setState({ imageIndex: 0 });
    }
  };

  previousImage = () => {
    const { product } = this.props;
    if (this.state.imageIndex === 0) {
      this.setState({ imageIndex: product.gallery.length - 1 });
    } else {
      this.setState((prevState) => ({ imageIndex: prevState.imageIndex - 1 }));
    }
  };

  render() {
    const { product } = this.props;
    const { increaseProductAmount, decreaseProductAmount, selectedCurrency } =
      this.context;
    const price = product?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency
    );

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
                    <CardProductAttributes
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
                src={product.gallery[this.state.imageIndex]}
                alt=""
              />
              {product.gallery.length > 1 && (
                <div className={styles.sliderButtonContainer}>
                  <button onClick={this.previousImage}>
                    <img src={arrowLeft} alt="" />
                  </button>
                  <button onClick={this.nextImage}>
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

SingleCartItem.contextType = storeContext;

export default SingleCartItem;
