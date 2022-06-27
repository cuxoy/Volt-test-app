import { NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__container">
        <ul className="header__links-list">
          <li>
            <NavLink to="/">Invoice App</NavLink>
          </li>
          <li>
            <NavLink to="/invoiceList">Invoices</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/customers">Customers</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
