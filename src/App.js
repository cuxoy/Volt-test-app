import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/productList/ProductList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomersList from "./components/customersList/CustomersList";
import InvoiceApp from "./components/invoiceApp/InvoiceApp";
import InvoiceList from "./components/invoiceList/InvoiceList";
import { fetchProducts } from "./actions/productsActions";
import { fetchInvoices } from "./actions/invoiceAppActions";
import { fetchCustomers } from "./actions/customersActions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchInvoices());
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/customers"
            element={
              <>
                <CustomersList />
              </>
            }
          />
          <Route
            path="/invoiceList"
            element={
              <>
                <InvoiceList />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <ProductList />
              </>
            }
          />
          <Route
            path="/invoiceApp"
            element={
              <>
                <InvoiceApp />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
