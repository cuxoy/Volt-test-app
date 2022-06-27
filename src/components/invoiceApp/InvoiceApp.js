import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addInvoice } from "../../actions/invoiceAppActions";
import { useDispatch, useSelector } from "react-redux";
import deleteImg from "../../icons/delete.png";
import "./invoiceApp.scss";

const InvoiceApp = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [createInvoiceVisibility, setCreateInvoiceVisibility] =
    useState("hidden");
  const [invoiceRequaredMassage, setInvoiceRequaredMassage] =
    useState("hidden");

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const customers = useSelector((state) => state.customers.customers);

  const onAddProductToInvoice = (e) => {
    e.preventDefault();
    const price = products.filter((item) => {
      return item.name == e.target.products.value;
    });
    setSelectedProductsList([
      ...selectedProductsList,
      {
        id: uuidv4(),
        name: e.target.products.value,
        price: (price[0].price * (100 - selectedDiscount)) / 100,
        quantity: 1,
        discount: selectedDiscount,
      },
    ]);
  };
  const onFormVisible = () => {
    setCreateInvoiceVisibility("visible");
    setBgColor("#4e4e4ea7");
  };
  const OnSubmitConfirm = () => {
    onSubmitInvoice();
    onSubmitCancel();
  };
  const onSubmitCancel = () => {
    setCreateInvoiceVisibility("hidden");
    setBgColor("#fff");
  };
  const quantityChange = (e, id) => {
    const newQuantityItem = selectedProductsList.map((item) => {
      if (item.id == id) {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: e.target.value,
          discount: item.discount,
        };
      } else {
        return item;
      }
    });
    setSelectedProductsList(newQuantityItem);
  };
  const total =
    selectedProductsList.length > 0
      ? selectedProductsList
          .map((item) => {
            return +(item.price * item.quantity);
          })
          .reduce((sum, elem) => {
            return sum + elem;
          }, 0)
          .toFixed(2)
      : 0;

  const onDelete = (id) => {
    const deletingProduct = selectedProductsList.filter((item) => {
      return item.id !== id;
    });
    setSelectedProductsList(deletingProduct);
  };

  const invoiceRequared = () => {
    setInvoiceRequaredMassage("visible");
    setTimeout(() => {
      setInvoiceRequaredMassage("hidden");
    }, 3000);
  };

  const onSubmitInvoice = () => {
    const productsForSubmit = selectedProductsList.map((item) => {
      return item.name + ` : ${item.quantity} items`;
    });
    selectedCustomer.length > 0 && productsForSubmit.length > 0
      ? dispatch(
          addInvoice(
            uuidv4(),
            selectedCustomer,
            total,
            selectedDiscount,
            productsForSubmit
          )
        )
      : invoiceRequared();
  };

  const productsTotal = selectedProductsList.map((item, i) => {
    const priceAndQuantity = (item.price * item.quantity).toFixed(1);
    return (
      <tr className="products-list-title">
        <td>{item.name}</td>
        <td>{item.discount}%</td>
        <td>{priceAndQuantity} $</td>
        <td>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => quantityChange(e, item.id)}
            min={0}
          />
        </td>
        <td>
          <img
            src={deleteImg}
            alt="delete"
            className="delete-img"
            onClick={() => onDelete(item.id)}
          />
        </td>
      </tr>
    );
  });

  const productsList = products.map((item) => {
    return <option title={item.price + "$"}>{item.name}</option>;
  });
  const customersList = customers.map((item) => {
    return <option>{item.name}</option>;
  });

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <div className="invoice-app__subheader">
        <h2>Edit invoice</h2>
      </div>
      <form action="" className="invoice-app" onSubmit={onAddProductToInvoice}>
        <div className="invoice-app__wrapper">
          <label htmlFor="discount" className="label">
            Discount(%)
          </label>
          <input
            type="number"
            name="discound"
            id="discount"
            className="input"
            max={99}
            min={0}
            required
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
          />
        </div>
        <div className="invoice-app__wrapper">
          <label htmlFor="customer" className="label">
            Customer
          </label>
          <select
            name="customers"
            id="customers"
            className="input"
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option selected disabled>
              choose the customer
            </option>
            {customersList}
          </select>
        </div>
        <div className="invoice-app__wrapper">
          <label htmlFor="products" className="label">
            Add product
          </label>
          <div className="">
            <select
              name="products"
              id="products"
              className="input"
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option selected disabled>
                choose the product
              </option>
              {productsList}
            </select>
            <button type="submit" className="invoice-app__btn">
              Add
            </button>
            <div className="error-message">
              <p
                className="error-message__text"
                style={{ visibility: invoiceRequaredMassage }}
              >
                Failed! Invoice list is empty
              </p>
            </div>
          </div>
        </div>
      </form>
      <table>
        <tr className="products-list-title">
          <th>Name</th>
          <th>discound</th>
          <th>Price</th>
          <th>Qty</th>
        </tr>
        {productsTotal}
      </table>
      <div className="total">
        <span className="total__text">Total:</span> {total} $
        <button className="create-invoice-btn" onClick={onFormVisible}>
          Create invoice
        </button>
      </div>
      <div
        className="delete-confirmation"
        style={{ visibility: createInvoiceVisibility }}
      >
        <h4>Confirm Submiting</h4>
        <span>
          {selectedCustomer} : {total}${" "}
        </span>
        <div className="delete-btns">
          <button onClick={OnSubmitConfirm}>Confirm</button>
          <button onClick={onSubmitCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default InvoiceApp;
