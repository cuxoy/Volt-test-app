const initialState = {
  products: [],
  productsLoadingStatus: "idle",
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_FETCHING":
      return {
        ...state,
        productsLoadingStatus: "loading",
      };
    case "PRODUCTS_FETCHED":
      return {
        ...state,
        products: action.payload,
        productsLoadingStatus: "idle",
      };
    case "PRODUCTS_ERROR":
      return {
        ...state,
        productsLoadingStatus: "error",
      };
  }
  return state;
};

export default products;
