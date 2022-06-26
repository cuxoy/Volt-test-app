import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/productList/ProductList";
import CustomersList from "./components/customersList/CustomersList";
import InvoiceApp from "./components/invoiceApp/InvoiceApp";
import "./App.css";

function App() {
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
            path="/products"
            element={
              <>
                <ProductList />
              </>
            }
          />
          />
          <Route
            path="/invoiceApp"
            element={
              <>
                <InvoiceApp/>
              </>
            }
          />
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
