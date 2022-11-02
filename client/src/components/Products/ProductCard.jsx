import React, { Component } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContext";
import styles from "./ProductCard.module.css";
import cartLogo from "../../images/cartlogo.png";

class ProductCard extends Component {
  state = {
    showCartLogo: false,
  };

  showCart = () => {
    this.setState((prevState) => ({ showCartLogo: true }));
  };

  closeCart = () => {
    this.setState((prevState) => ({ showCartLogo: false }));
  };

  handleAddToCart = () => {
    const { addToCart, cart } = this.context;
    const { product } = this.props;
    // Add a product to the cart with first selected attributes as defaults
    const selectedAttibutes = product.attributes.map((item) => {
      return { name: item.name, selected: item.items[0].value };
    });

    addToCart(product, selectedAttibutes);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  render() {
    const { gallery, name, prices, inStock, id, brand } = this.props;
    const { selectedCurrency } = this.context;
    const price = prices.find(
      (item) => item.currency.symbol === selectedCurrency
    );
    return (
      <div
        onMouseEnter={this.showCart}
        onMouseLeave={this.closeCart}
        className={styles.container}
      >
        <div className={styles.imgContainer}>
          <Link
            to={`/product/${id}`}
            style={!inStock ? { opacity: 0.5 } : null}
            className={styles.card}
          >
            <img className={styles.img} src={gallery[0]} alt="" />
          </Link>
          {!inStock && <h1 className={styles.header}>OUT OF STOCK</h1>}
          {this.state.showCartLogo && inStock && (
            <div onClick={this.handleAddToCart} className={styles.addToCart}>
              <img src={cartLogo} alt="" />
            </div>
          )}
        </div>
        <Link
          to={`/product/${id}`}
          style={!inStock ? { opacity: 0.5 } : null}
          className={styles.card}
        >
          <div className={styles.details}>
            <p>
              {brand} {name}
            </p>
            <p className={styles.price}>
              {selectedCurrency} {price.amount}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

ProductCard.contextType = storeContext;

export default ProductCard;
