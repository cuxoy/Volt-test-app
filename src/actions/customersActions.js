export const fetchCustomers = () => async (next) => {
  next(customersFetching());
  const response = await fetch("http://localhost:3001/customers");
  const data = await response.json();
  next(customersFetched(data));
};

export const deleteCustomer = (id) => async (next) => {
  const response = await fetch(`http://localhost:3001/customers/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  next(customerDeleted(id));
};

export const editCustomer = (id, name, address, tel) => async (next) => {
  const newCustomer = { id: id, name: name, address: address, phone: tel };
  const res = await fetch(`http://localhost:3001/customers/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  next(customerDeleted(id));
  const response = await fetch(`http://localhost:3001/customers`, {
    method: "POST",
    body: JSON.stringify(newCustomer),
    headers: { "Content-Type": "application/json" },
  });
  next(customerAdded(newCustomer));
};

export const addCustomer = (id, name, address, tel) => async (next) => {
  const newCustomer = { id: id, name: name, address: address, phone: tel };
  const response = await fetch(`http://localhost:3001/customers`, {
    method: "POST",
    body: JSON.stringify(newCustomer),
    headers: { "Content-Type": "application/json" },
  });
  next(customerAdded(newCustomer));
};

const customersFetching = () => {
  return {
    type: "CUSTOMERS_FETCHING",
  };
};

const customersFetched = (customers) => {
  return {
    type: "CUSTOMERS_FETCHED",
    payload: customers,
  };
};

const customerDeleted = (id) => {
  return {
    type: "CUSTOMER_DELETED",
    payload: id,
  };
};

const customerAdded = (customer) => {
  return {
    type: "CUSTOMER_ADDED",
    payload: customer,
  };
};
