import React, { Component } from "react";
import { request } from "graphql-request";
import { withParams } from "../withParams";
import styles from "./Product.module.css";
import Attributes from "./Attributes";
import { storeContext } from "../../context/StoreContext";
import { query } from "../queries/singleProductQuery";
import { v4 as uuidv4 } from "uuid";

class Product extends Component {
  state = {
    product: {},
    image: "",
    description: "",
    requiredAttributes: [],
  };

  componentDidMount() {
    let { id } = this.props.params;
    request("http://localhost:4000", query, { id }).then((data) => {
      const attributeNamesArr = data.product.attributes.map(
        (item) => item.name
      );

      this.setState((prevState) => ({
        ...prevState,
        product: data.product,
        description: data.product.description,
        requiredAttributes: attributeNamesArr.map((item) => {
          return { name: item, selected: "" };
        }),
      }));
    });
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

    return (
      <div className={styles.product}>
        <div className={styles.images}>
          {product?.gallery?.map((img) => {
            return (
              <img
                onClick={() => this.handleImageChange(img)}
                key={img}
                src={img}
                alt=""
              />
            );
          })}
        </div>
        <div>
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
          <form onSubmit={this.handleSubmit}>
            {product?.attributes?.map((attribute) => {
              return (
                <Attributes
                  attributeChange={this.attributeChange}
                  key={attribute.id}
                  attribute={attribute}
                />
              );
            })}

            <h4 className={styles.price}>PRICE: </h4>
            <h2>
              {price?.currency.symbol} {price?.amount}
            </h2>
            <button
              disabled={!product.inStock}
              className={styles.submitBtn}
              type="submit"
            >
              ADD TO CART
            </button>
          </form>
          {/* descriptions provided in html format is parsed and presented as html */}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    );
  }
}

Product.contextType = storeContext;

export default withParams(Product);
