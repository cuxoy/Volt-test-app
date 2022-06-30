import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/productList/ProductList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import CustomersList from "./components/customersList/CustomersList";
import InvoiceApp from "./components/invoiceApp/InvoiceApp";
import InvoiceList from "./components/invoiceList/InvoiceList";
import { fetchProducts } from "./middlewares/productsMiddlewares";
import { fetchInvoices } from "./middlewares/invoicesMiddlewares";
import { fetchCustomers } from "./middlewares/castomersMiddlewares";
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
                <Helmet>
                  <title>Customer list</title>
                  <meta name="description" content="Helmet application" />
                </Helmet>
                <CustomersList />
              </>
            }
          />
          <Route
            path="/invoiceList"
            element={
              <>
                <Helmet>
                  <title>Invoive list</title>
                  <meta name="description" content="Helmet application" />
                </Helmet>
                <InvoiceList />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Helmet>
                  <title>Procuct List</title>
                  <meta name="description" content="Helmet application" />
                </Helmet>
                <ProductList />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Invoice App</title>
                  <meta name="description" content="Helmet application" />
                </Helmet>
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
