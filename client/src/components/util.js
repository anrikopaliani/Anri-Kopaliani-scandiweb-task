import { request } from "graphql-request";
import { query } from "./queries/categoriesQuery";
import { singleProductQuery } from "./queries/singleProductQuery";

export const getData = (updateGlobalState) => {
  request("http://localhost:4000", query).then((data) => {
    updateGlobalState({
      categories: data.categories.map((item) => item.name),
      products: data.categories,
      currencies: data.currencies,
    });
  });
};

export const getProduct = (id, changeState) => {
  request("http://localhost:4000", singleProductQuery, { id }).then((data) => {
    const attributeNamesArr = data.product.attributes.map((item) => item.name);

    changeState(data, attributeNamesArr);
  });
};
