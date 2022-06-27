import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCustomers,
  deleteCustomer,
  addCustomer,
  changeCustomer,
} from "../../actions/customersActions";
import { v4 as uuidv4 } from "uuid";
import "./customersList.scss";
import deleteImg from "../../icons/delete.png";

const CustomersList = () => {
  const [nameValue, setNameValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [telValue, setTelValue] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [deleteConfirm, setDeleteConfirm] = useState("hidden");
  const [deleteId, setDeleteId] = useState("");
  const [customerForDelete, setCustomerForDelete] = useState("");

  const dispatch = useDispatch();

  const onFormVisible = () => {
    setFormVisibility("visible");
    setBgColor("#4e4e4ea7");
  };

  const onFormClosed = () => {
    setFormVisibility("hidden");
    setNameValue("");
    setAddressValue("");
    setTelValue("");
    setBgColor("#fff");
  };

  const OnDeleteConfirm = () => {
    dispatch(deleteCustomer(deleteId));
    onDeleteCancel();
  };
  const onDeleteCancel = () => {
    setDeleteConfirm("hidden");
    setBgColor("#fff");
    setCustomerForDelete("");
  };
  const onDelete = (id, name) => {
    setDeleteId(id);
    setCustomerForDelete(name);
    setBgColor("#4e4e4ea7");
    setDeleteConfirm("visible");
  };

  const onAddCustomer = (e) => {
    e.preventDefault();
    dispatch(
      addCustomer(
        uuidv4(),
        e.target.name.value,
        e.target.address.value,
        e.target.tel.value
      )
    );
    onFormClosed();
  };

  const customersList = useSelector((state) => state.customers.customers).map(
    (item, i) => {
      return (
        <>
          <tr className="customers-title">
            <td>{i + 1}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td onClick={() => onDelete(item.id, item.name)}>
              <img src={deleteImg} alt="delete" className="delete-img" />
            </td>
          </tr>
        </>
      );
    }
  );

  return (
    <div className="customer-list" style={{ backgroundColor: bgColor }}>
      <div className="customer-list__container">
        <div className="customer-list__header">
          <div className="customer-list__subheader">
            <h2>Customer list</h2>
          </div>
          <div className="customer-list__create-btn" onClick={onFormVisible}>
            <div className="create-text">Create</div>
          </div>
        </div>
        <table>
          <tr className="customers-title">
            <th>#</th>
            <th>Name</th>
            <th>Adress</th>
            <th>Phone number</th>
          </tr>
          {customersList}
        </table>
        <div
          className="delete-confirmation"
          style={{ visibility: deleteConfirm }}
        >
          <h4>Confirm Deleting</h4>
          <span>{customerForDelete}</span>
          <div className="delete-btns">
            <button onClick={OnDeleteConfirm}>Confirm</button>
            <button onClick={onDeleteCancel}>Cancel</button>
          </div>
        </div>
        <div
          className="customer-list__modal"
          style={{ visibility: formVisibility }}
        >
          <h3 className="customer-list__modal__title">Create new customer</h3>
          <form onSubmit={onAddCustomer}>
            <div className="customer-list__modal__input">
              <label htmlFor="name">New customer name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="enter the name"
                required="requared"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div className="customer-list__modal__input">
              <label htmlFor="address">New customer address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="enter the address"
                required="requared"
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
              />
            </div>
            <div className="customer-list__modal__input">
              <label htmlFor="tel">New phone number</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="enter phone number"
                required="requared"
                value={telValue}
                onChange={(e) => setTelValue(e.target.value)}
              />
            </div>
            <div className="customer-list__modal__btns">
              <button type="submit">Submit</button>
              <button type="reset" onClick={onFormClosed}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CustomersList;
