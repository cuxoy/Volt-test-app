import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  addProduct,
} from "../../actions/actions";
import "./productList.scss";

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const onAddProduct = () => {
    dispatch(addProduct());
  };

  const productsList = useSelector((state) => state.products.products).map(
    (item, i) => {
      return (
        <tr className="products-title">
          <td>{i + 1}</td>
          <td>{item.name}</td>
          <td>{item.price + " $"}</td>
          <td onClick={() => onDelete(item.id)}>delete</td>
        </tr>
      );
    }
  );

  return (
    <div className="product-list__container">
      <div className="product-list__header">
        <div className="product-list__subheader">
          <h2>Product list</h2>
        </div>
        <div className="product-list__create-btn">
          <div className="create-text" onClick={onAddProduct}>Create</div>
        </div>
      </div>
      <table>
        <tr className="products-title">
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {productsList}
      </table>
      <ul className="products"></ul>
    </div>
  );
};
export default ProductList;
