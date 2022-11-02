import React, { createContext } from "react";

export const storeContext = createContext({});

class StoreContextProvider extends React.Component {
  state = {
    selectedCategory: window.localStorage.getItem("category") || "all",
    categories: [],
    products: [],
    currencies: [],
    selectedCurrency: window.localStorage.getItem("currency") || "$",
    cart: JSON.parse(window.localStorage.getItem("cart")) || [],
  };

  componentDidUpdate(prevProps, prevState) {
    // save the cart to local storage
    if (
      JSON.stringify(prevState.cart) !== JSON.stringify(this.state.cart.length)
    ) {
      window.localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
  }

  updateGlobalState = (obj) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        ...obj,
      };
    });
  };

  changeCategory = (category) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedCategory: category,
      };
    });
    // save it to local storage in order to be on the same page after reload
    window.localStorage.setItem("category", category);
  };

  selectCurrency = (symbol) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedCurrency: symbol,
      };
    });
    // save the selected currency to local storage
    window.localStorage.setItem("currency", symbol);
  };
  // add to cart function
  addToCart = (product, selectedAttributes) => {
    // check if the product with the same attributes is in the cart
    const productWithSameAttributes = this.state.cart.find(
      (cartItem) =>
        JSON.stringify(cartItem.selectedAttributes) ===
        JSON.stringify(selectedAttributes)
    );

    // if the product with the same attributes is not in the cart just add it with amount 1

    if (!productWithSameAttributes) {
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: prevState.cart.concat({
            ...product,
            selectedAttributes,
            amount: 1,
          }),
        };
      });
    } else {
      // if there is a product with the same attributes in the cart, increment the amount
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: prevState.cart.map((cartItem) => {
            if (
              JSON.stringify(cartItem.selectedAttributes) ===
              JSON.stringify(selectedAttributes)
            ) {
              return { ...cartItem, amount: cartItem.amount + 1 };
            } else {
              return cartItem;
            }
          }),
        };
      });
    }
  };

  increaseProductAmount = (id) => {
    // get the cart from the localstorage and increase the amount
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    const newCart = cart.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, amount: cartItem.amount + 1 }
        : cartItem
    );

    window.localStorage.setItem("cart", JSON.stringify(newCart));

    this.setState((prevState) => {
      return {
        ...prevState,
        cart: newCart,
      };
    });
  };

  decreaseProductAmount = (id) => {
    const findItem = this.state.cart.find((cartItem) => cartItem.id === id);

    // if item amount is equal to 1, after decreasing it remove it from the cart
    // if not, just decrease the amount of the item by one
    if (findItem.amount === 1) {
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: prevState.cart.filter((cartItem) => cartItem.id !== id),
        };
      });
    } else {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      const newCart = cart.map((cartItem) =>
        cartItem.id === id && cartItem.amount > 1
          ? { ...cartItem, amount: cartItem.amount - 1 }
          : cartItem
      );
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: newCart,
        };
      });
    }
  };

  render() {
    const {
      categories,
      selectedCategory,
      products,
      currencies,
      selectedCurrency,
      cart,
    } = this.state;
    return (
      <storeContext.Provider
        value={{
          updateGlobalState: this.updateGlobalState,
          changeCategory: this.changeCategory,
          selectCurrency: this.selectCurrency,
          addToCart: this.addToCart,
          increaseProductAmount: this.increaseProductAmount,
          decreaseProductAmount: this.decreaseProductAmount,
          selectedCurrency,
          categories,
          selectedCategory,
          products,
          currencies,
          cart,
        }}
      >
        {this.props.children}
      </storeContext.Provider>
    );
  }
}

export default StoreContextProvider;
