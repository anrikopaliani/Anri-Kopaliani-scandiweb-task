import React, { PureComponent } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import { storeContext } from "./context/StoreContext";
import Products from "./components/Products/Products";
import ProductContainer from "./components/Product/ProductContainer";
import CartOverlayContainer from "./components/CartOverlay/CartOverlayContainer";
import CartPageContainer from "./components/CartPage/CartPageContainer";
import { getData } from "./components/util";

class App extends PureComponent {
  state = {
    showCartOverlay: false,
  };

  componentDidMount() {
    const { updateGlobalState } = this.context;
    getData(updateGlobalState);
  }

  showOverlay = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showCartOverlay: !this.state.showCartOverlay,
      };
    });
  };

  closeOverlay = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showCartOverlay: false,
      };
    });
  };

  render() {
    const { showCartOverlay } = this.state;

    return (
      <>
        <NavbarContainer
          showOverlay={this.showOverlay}
          closeOverlay={this.closeOverlay}
          showCartOverlay={showCartOverlay}
        />
        {showCartOverlay && (
          <CartOverlayContainer closeOverlay={this.closeOverlay} />
        )}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductContainer />} />
          <Route path="/cart" element={<CartPageContainer />} />
        </Routes>
      </>
    );
  }
}

App.contextType = storeContext;

export default App;
