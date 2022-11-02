import React, { Component } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { request } from "graphql-request";
import Navbar from "./components/Navbar/Navbar";
import { storeContext } from "./context/StoreContext";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import CartOverlay from "./components/CartOverlay/CartOverlay";
import CartPage from "./components/CartPage/CartPage";
import { query } from "./components/queries/categoriesQuery";

class App extends Component {
  state = {
    showCartOverlay: false,
  };

  componentDidMount() {
    const { updateGlobalState } = this.context;
    request("http://localhost:4000", query).then((data) => {
      updateGlobalState({
        categories: data.categories.map((item) => item.name),
        products: data.categories,
        currencies: data.currencies,
      });
    });
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
        <Navbar
          showOverlay={this.showOverlay}
          closeOverlay={this.closeOverlay}
          showCartOverlay={showCartOverlay}
        />
        {showCartOverlay && <CartOverlay closeOverlay={this.closeOverlay} />}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }
}

App.contextType = storeContext;

export default App;
