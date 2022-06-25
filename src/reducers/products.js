const initialState = {
  products: [],
  productsLoadingStatus: "idle"
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
    case "PRODUCT_DELETED":
      return {
        ...state,
        products: state.products.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    case "PRODUCTS_ERROR":
      return {
        ...state,
        productsLoadingStatus: "error",
      };
    case "PRODUCT_ADDED":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export default products;
