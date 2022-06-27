import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { deleteInvoice, addInvoice } from "../../actions/invoiceAppActions";
import "./invoiceList.scss";
import deleteImg from "../../icons/delete.png";

const InvoiceList = () => {
  const [nameValue, setNameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [deleteConfirm, setDeleteConfirm] = useState("hidden");
  const [deleteId, setDeleteId] = useState("");
  const [invoiceForDelete, setInvoiceForDelete] = useState({
    name: "",
    price: "",
  });
  const invoiceFormVisibility = useSelector(
    (state) => state.invoices.invoiceFormVisibility
  );

  const dispatch = useDispatch();

  const onFormVisible = () => {
    setFormVisibility("visible");
    setBgColor("#4e4e4ea7");
  };

  const onFormClosed = () => {
    setFormVisibility("hidden");
    setNameValue("");
    setPriceValue("");
    setDiscountValue("");
    setBgColor("#fff");
  };

  const OnDeleteConfirm = () => {
    dispatch(deleteInvoice(deleteId));
    onDeleteCancel();
  };
  const onDeleteCancel = () => {
    setDeleteConfirm("hidden");
    setBgColor("#fff");
    setInvoiceForDelete({ name: "", price: "" });
  };
  const onDelete = (id, name, price) => {
    setDeleteId(id);
    setInvoiceForDelete({ name, price });
    setBgColor("#4e4e4ea7");
    setDeleteConfirm("visible");
  };

  const onAddInvoice = (e) => {
    e.preventDefault();
    dispatch(
      addInvoice(
        uuidv4(),
        e.target.name.value,
        e.target.price.value,
        e.target.discount.value
      )
    );
    onFormClosed();
  };

  const invoicesList = useSelector((state) => state.invoices.invoices).map(
    (item, i) => {
      return (
        <>
          <tr className="invoices-title">
            <td>{i + 1}</td>
            <td>{item.customer}</td>
            <td>{item.descount + "%"}</td>
            <td>{item.price + " $"}</td>
            <td onClick={() => onDelete(item.id, item.customer, item.price)}>
              <img src={deleteImg} alt="delete" className="delete-img" />
            </td>
          </tr>
        </>
      );
    }
  );

  return (
    <div className="invoice-list" style={{ backgroundColor: bgColor }}>
      <div className="invoice-list__container">
        <div
          className="invoice-list__modal"
          style={{ visibility: formVisibility }}
        >
          <h3 className="invoice-list__modal__title">Create new invoice</h3>
          <form onSubmit={onAddInvoice}>
            <div className="invoice-list__modal__input">
              <label htmlFor="name">Customer name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="customer name"
                required="requared"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div className="invoice-list__modal__input">
              <label htmlFor="price">Total price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="price"
                required="requared"
                value={priceValue}
                min={0}
                onChange={(e) => setPriceValue(e.target.value)}
              />
            </div>
            <div className="invoice-list__modal__input">
              <label htmlFor="price">Discount</label>
              <input
                type="number"
                name="discount"
                id="discount"
                placeholder="price"
                required="requared"
                value={discountValue}
                min={0}
                max={100}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </div>
            <div className="invoice-list__modal__btns">
              <button>Submit</button>
              <button type="reset" onClick={onFormClosed}>
                Close
              </button>
            </div>
          </form>
        </div>
        <div className="invoice-list__header">
          <div className="invoice-list__subheader">
            <h2>Invoices list</h2>
          </div>
          <div className="invoice-list__create-btn" onClick={onFormVisible}>
            <div className="create-text">Create</div>
          </div>
        </div>
        <table>
          <tr className="invoices-title">
            <th>#</th>
            <th>Name</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
          {invoicesList}
        </table>
        <div
          className="delete-confirmation"
          style={{ visibility: deleteConfirm }}
        >
          <h4>Confirm Deleting</h4>
          <span>
            {invoiceForDelete.name} : {invoiceForDelete.price}${" "}
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
export default InvoiceList;
