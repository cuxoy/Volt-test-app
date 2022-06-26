import { useEffect, useState } from "react";
import { fetchCustomers } from "../../actions/customersActions";
import { fetchProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import "./invoiceApp.scss";

const InvoiceApp = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedProductsList, setSelectedProductsList] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, []);

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
        name: e.target.products.value,
        price: (price[0].price * (100 - selectedDiscount)) / 100,
        quantity: 1,
        discount: selectedDiscount,
      },
    ]);
  };

  const quantityChange = (e, activeItem) => {
    const newQuantityItem = selectedProductsList.map((item) => {
      if (item == activeItem) {
        return {
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
            return +(item.price * item.quantity).toFixed(1);
          })
          .reduce((sum, elem) => {
            return sum + elem;
          }, 0)
      : 0;

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
            onChange={(e) => quantityChange(e, item)}
          />
        </td>
      </tr>
    );
  });

  const productsList = products.map((item) => {
    return <option data-price={item.price}>{item.name}</option>;
  });
  const customersList = customers.map((item) => {
    return <option>{item.name}</option>;
  });

  return (
    <div className="container">
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
              {productsList}
            </select>
            <button type="submit" className="invoice-app__btn">
              Add
            </button>
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
      </div>
    </div>
  );
};
export default InvoiceApp;
