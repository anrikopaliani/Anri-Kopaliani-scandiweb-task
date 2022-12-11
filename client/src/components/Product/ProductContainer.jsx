import React, { PureComponent } from "react";
import { withParams } from "../withParams";
import Attributes from "./Attributes";
import { storeContext } from "../../context/StoreContext";
import { v4 as uuidv4 } from "uuid";
import { getProduct } from "../util";
import ProductPresentation from "./ProductPresentation";

class Product extends PureComponent {
  state = {
    product: {},
    image: "",
    description: "",
    requiredAttributes: [],
    disableBtn: true,
  };

  componentDidMount() {
    let { id } = this.props.params;

    const changeState = (data, attributeNamesArr) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          product: data.product,
          description: data.product.description,
          requiredAttributes: attributeNamesArr.map((item) => {
            return { name: item, selected: "" };
          }),
        };
      });
    };

    getProduct(id, changeState);
  }

  handleImageChange = (img) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        image: img,
      };
    });
  };

  //  function to add selected attributes in requiredAttributes state.
  attributeChange = (name, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        requiredAttributes: prevState.requiredAttributes.map((item) => {
          if (item.name === name) {
            return { ...item, selected: value };
          } else {
            return item;
          }
        }),
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addToCart } = this.context;

    const newArr = [];

    this.state.requiredAttributes.forEach((i) => {
      for (const property in i) {
        if (i[property] === "") newArr.push(false);
        else {
          newArr.push(true);
        }
      }
    });

    // check if every attribute is selected
    const check = newArr.every((item) => item === true);

    // send it to cart, if every attribute is selected
    if (check) {
      addToCart(
        { ...this.state.product, id: uuidv4() },
        this.state.requiredAttributes
      );
    }
  };

  render() {
    const { product, image, description } = this.state;
    const { selectedCurrency } = this.context;

    const price = product?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency
    );

    // disable the button if every attribute is not selected
    const disable = this.state.requiredAttributes.some(
      (item) => item.selected === ""
    );

    const renderGallery = () => {
      return product?.gallery?.map((img) => (
        <img
          onClick={() => this.handleImageChange(img)}
          key={img}
          src={img}
          alt=""
        />
      ));
    };

    const renderAttributes = () => {
      return product?.attributes?.map((attribute) => (
        <Attributes
          attributeChange={this.attributeChange}
          key={attribute.id}
          attribute={attribute}
        />
      ));
    };

    return (
      <ProductPresentation
        renderGallery={renderGallery}
        product={product}
        image={image}
        renderAttributes={renderAttributes}
        price={price}
        description={description}
        disable={disable}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Product.contextType = storeContext;

export default withParams(Product);
