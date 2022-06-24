// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

export const fetchProducts = () => async (next) => {
  next(productsFetching())
  const response = await fetch("http://localhost:3001/products");
  const data = await response.json();
  console.log(data);
};

const productsFetching = () => {
  return {
    type: "PRODUCTS_FETCHING",
  };
};
