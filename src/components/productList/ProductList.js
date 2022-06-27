import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, addProduct } from "../../actions/productsActions";
import { v4 as uuidv4 } from "uuid";
import "./productList.scss";
import deleteImg from "../../icons/delete.png";

const ProductList = () => {
  const [nameValue, setNameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [deleteConfirm, setDeleteConfirm] = useState("hidden");
  const [deleteId, setDeleteId] = useState("");
  const [productForDelete, setProductForDelete] = useState({
    name: "",
    price: "",
  });

  const dispatch = useDispatch();

  const onFormVisible = () => {
    setFormVisibility("visible");
    setBgColor("#4e4e4ea7");
  };

  const onFormClosed = () => {
    setFormVisibility("hidden");
    setNameValue("");
    setPriceValue("");
    setBgColor("#fff");
  };

  const OnDeleteConfirm = () => {
    dispatch(deleteProduct(deleteId));
    onDeleteCancel();
  };
  const onDeleteCancel = () => {
    setDeleteConfirm("hidden");
    setBgColor("#fff");
    setProductForDelete({ name: "", price: "" });
  };
  const onDelete = (id, name, price) => {
    setDeleteId(id);
    setProductForDelete({ name, price });
    setBgColor("#4e4e4ea7");
    setDeleteConfirm("visible");
  };

  const onAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(uuidv4(), e.target.name.value, e.target.price.value));
    onFormClosed();
  };

  const productsList = useSelector((state) => state.products.products).map(
    (item, i) => {
      return (
        <>
          <tr className="products-title">
            <td>{i + 1}</td>
            <td>{item.name}</td>
            <td>{item.price + " $"}</td>
            <td onClick={() => onDelete(item.id, item.name, item.price)}>
              <img src={deleteImg} alt="delete" className="delete-img" />
            </td>
          </tr>
        </>
      );
    }
  );

  return (
    <div className="product-list" style={{ backgroundColor: bgColor }}>
      <div className="product-list__container">
        <div
          className="product-list__modal"
          style={{ visibility: formVisibility }}
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
          <div className="product-list__create-btn" onClick={onFormVisible}>
            <div className="create-text">Create</div>
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
        <div
          className="delete-confirmation"
          style={{ visibility: deleteConfirm }}
        >
          <h4>Confirm Deleting</h4>
          <span>
            {productForDelete.name} : {productForDelete.price}${" "}
          </span>
          <div className="delete-btns">
            <button onClick={OnDeleteConfirm}>Confirm</button>
            <button onClick={onDeleteCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
