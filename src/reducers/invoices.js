const initialState = {
  invoices: [],
  invoicesLoadingStatus: "idle",
};

const invoices = (state = initialState, action) => {
  switch (action.type) {
    case "INVOICES_FETCHING":
      return {
        ...state,
        invoicesLoadingStatus: "loading",
      };
    case "INVOICES_FETCHED":
      return { 
        ...state,
        invoices: action.payload,
        invoicesLoadingStatus: "idle",
      };
    case "INVOICE_ADDED":
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
      case "INVOICE_DELETED":
      return {
        ...state,
        invoices: state.invoices.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};

export default invoices;
