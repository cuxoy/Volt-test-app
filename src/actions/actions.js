export const fetchProducts = () => async (next) => {
  next(productsFetching());
  const response = await fetch("http://localhost:3001/products");
  const data = await response.json();
  next(productsFetched(data));
};

export const deleteProduct = (id) => async (next) => {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  next(productDeleted(id));
};

export const addProduct = (id,name,price) => async (next) => {
  const newProduct = { id: id, name: name, price: price };
  const response = await fetch(`http://localhost:3001/products`, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: { "Content-Type": "application/json" },
  });
  next(productAdded(newProduct));
};

const productsFetching = () => {
  return {
    type: "PRODUCTS_FETCHING",
  };
};

const productsFetched = (products) => {
  return {
    type: "PRODUCTS_FETCHED",
    payload: products,
  };
};

const productDeleted = (id) => {
  return {
    type: "PRODUCT_DELETED",
    payload: id,
  };
};

const productAdded = (product) => {
  return {
    type: "PRODUCT_ADDED",
    payload: product,
  };
};

export const productFormVisible = () => {
  return {
    type: "PRODUCT_FORM_VISIBLE"
  };
};

export const productFormHidden = () => {
  return {
    type: "PRODUCT_FORM_HIDDEN"
  };
};


