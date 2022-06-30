export const productsFetching = () => {
  return {
    type: "PRODUCTS_FETCHING",
  };
};

export const productsFetched = (products) => {
  return {
    type: "PRODUCTS_FETCHED",
    payload: products,
  };
};

export const productDeleted = (id) => {
  return {
    type: "PRODUCT_DELETED",
    payload: id,
  };
};

export const productAdded = (product) => {
  return {
    type: "PRODUCT_ADDED",
    payload: product,
  };
};
