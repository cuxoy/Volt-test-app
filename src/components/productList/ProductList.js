import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  addProduct,
  productFormVisible,
  productFormHidden,
} from "../../actions/actions";
import { v4 as uuidv4 } from "uuid";
import "./productList.scss";
import deleteImg from "../../icons/delete.png";

const ProductList = () => {
  const [ nameValue, setNameValue ] = useState("");
  const [ priceValue, setPriceValue ] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productFormVisibility = useSelector(
    (state) => state.products.productFormVisibility
  );

  const onFormVisible = () => {
    dispatch(productFormVisible());
  };

  const onFormClosed = () => {
    dispatch(productFormHidden());
    setNameValue("");
    setPriceValue("");
  };

  const onDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const onAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(uuidv4(), e.target.name.value, e.target.price.value));
    onFormClosed();
    console.log(e.target.name.value);
  };


  const productsList = useSelector((state) => state.products.products).map(
    (item, i) => {
      return (
        <tr className="products-title">
          <td>{i + 1}</td>
          <td>{item.name}</td>
          <td>{item.price + " $"}</td>
          <td onClick={() => onDelete(item.id)}>
            <img src={deleteImg} alt="delete" className="delete-img" />
          </td>
        </tr>
      );
    }
  );

  return (
    <div className="product-list">
      <div className="product-list__container">
        <div
          className="product-list__modal"
          style={{ visibility: productFormVisibility }}
        >
          <h3 className="product-list__modal__title">Create new product</h3>
          <form onSubmit={onAddProduct}>
            <div className="product-list__modal__input">
              <label htmlFor="name">New product name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="product name"
                required="requared"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div className="product-list__modal__input">
              <label htmlFor="price">New product price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="price"
                required="requared"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
              />
            </div>
            <div className="product-list__modal__btns">
              <button>Submit</button>
              <button type="reset" onClick={onFormClosed}>
                Close
              </button>
            </div>
          </form>
        </div>
        <div className="product-list__header">
          <div className="product-list__subheader">
            <h2>Product list</h2>
          </div>
          <div className="product-list__create-btn">
            <div className="create-text" onClick={onFormVisible}>
              Create
            </div>
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
    </div>
  );
};
export default ProductList;
