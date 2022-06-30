export const customersFetching = () => {
  return {
    type: "CUSTOMERS_FETCHING",
  };
};

export const customersFetched = (customers) => {
  return {
    type: "CUSTOMERS_FETCHED",
    payload: customers,
  };
};

export const customerDeleted = (id) => {
  return {
    type: "CUSTOMER_DELETED",
    payload: id,
  };
};

export const customerAdded = (customer) => {
  return {
    type: "CUSTOMER_ADDED",
    payload: customer,
  };
};
