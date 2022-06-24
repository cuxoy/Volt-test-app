import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/actions";
import "./productList.scss";

const ProductList = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="product-list__container">
      <div className="product-list__header">
        <div className="product-list__subheader">
          <h2>Product list</h2>
        </div>
        <div className="product-list__create-btn">
          <div className="create-text">Create</div>
        </div>
      </div>
      <table>
        <tr className="products-title">
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
        <tr className="products-title">
          <td>1</td>
          <td>Mercedes-Benz</td>
          <td>12 $</td>
        </tr>
        <tr className="products-title">
          <td>1</td>
          <td>Mercedes-Benz</td>
          <td>12 $</td>
        </tr>
      </table>
      <ul className="products"></ul>
    </div>
  );
};
export default ProductList;
