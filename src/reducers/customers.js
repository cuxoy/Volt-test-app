const initialState = {
  customers: [],
  customersLoadingStatus: "idle"
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case "CUSTOMERS_FETCHING":
      return {
        ...state,
        customersLoadingStatus: "loading",
      };
    case "CUSTOMERS_FETCHED":
      return {
        ...state,
        customers: action.payload,
        customersLoadingStatus: "idle",
      };
    case "CUSTOMER_DELETED":
      return {
        ...state,
        customers: state.customers.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    case "CUSTOMERS_ERROR":
      return {
        ...state,
        customersLoadingStatus: "error",
      };
    case "CUSTOMER_ADDED":
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    default:
      return state;
  }
};

export default customers;
