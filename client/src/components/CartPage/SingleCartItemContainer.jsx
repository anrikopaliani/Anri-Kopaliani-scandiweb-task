import React, { PureComponent } from "react";
import { storeContext } from "../../context/StoreContext";
import SingleCartItemPresentation from "./SingleCartItemPresentation";

class SingleCartItemContainer extends PureComponent {
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
    this.setState((prevState) =>
      this.state.imageIndex === 0
        ? { imageIndex: product.gallery.length - 1 }
        : { imageIndex: prevState.imageIndex - 1 }
    );
  };

  render() {
    const { product } = this.props;
    const { increaseProductAmount, decreaseProductAmount, selectedCurrency } =
      this.context;
    const price = product?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency
    );

    return (
      <SingleCartItemPresentation
        product={product}
        price={price}
        increaseProductAmount={increaseProductAmount}
        decreaseProductAmount={decreaseProductAmount}
        imageIndex={this.state.imageIndex}
        previousImage={this.previousImage}
        nextImage={this.nextImage}
      />
    );
  }
}

SingleCartItemContainer.contextType = storeContext;

export default SingleCartItemContainer;
