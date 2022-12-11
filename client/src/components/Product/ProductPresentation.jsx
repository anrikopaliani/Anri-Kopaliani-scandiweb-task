import { PureComponent } from "react";
import { Interweave } from "interweave";
import styles from "./Product.module.css";

class ProductPresentation extends PureComponent {
  render() {
    const {
      renderGallery,
      product,
      image,
      renderAttributes,
      price,
      description,
      disable,
      handleSubmit,
    } = this.props;
    return (
      <div className={styles.product}>
        <div className={styles.images}>{renderGallery()}</div>
        <div className={styles.selectedImage}>
          <img
            className={styles.selectedImage}
            src={image || product?.gallery?.[0]}
            alt=""
          />
        </div>
        <div className={styles.details}>
          <div>
            <h2>{product.brand}</h2>
            <p>{product.name}</p>
          </div>
          <form onSubmit={handleSubmit}>
            {renderAttributes()}
            <h4 className={styles.price}>PRICE: </h4>
            <h2>
              {price?.currency.symbol} {price?.amount}
            </h2>
            <button
              disabled={!product.inStock || disable}
              className={styles.submitBtn}
              type="submit"
            >
              ADD TO CART
            </button>
          </form>
          {/* descriptions provided in html format is parsed and presented as html */}
          <div className={styles.description}>
            <Interweave content={description} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPresentation;
