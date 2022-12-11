import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import ProductCardPresentation from "./ProductCardPresentation";

class ProductCardContainer extends PureComponent {
  state = {
    showCartLogo: false,
  };

  showCart = () => {
    this.setState({ showCartLogo: true });
  };

  closeCart = () => {
    this.setState({ showCartLogo: false });
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
      <ProductCardPresentation
        price={price}
        selectedCurrency={selectedCurrency}
        id={id}
        inStock={inStock}
        gallery={gallery}
        name={name}
        brand={brand}
        handleAddToCart={this.handleAddToCart}
        showCartLogo={this.state.showCartLogo}
        showCart={this.showCart}
        closeCart={this.closeCart}
      />
    );
  }
}

ProductCardContainer.contextType = storeContext;

export default ProductCardContainer;
