import Header from "./components/header/Header";
import ProductList from "./components/productList/ProductList";
import CustomersList from "./components/customersList/CustomersList";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <CustomersList/>
      {/* <ProductList /> */}
    </div>
  );
}

export default App;
