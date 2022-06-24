import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__container">
        <ul className="header__links-list">
          <li>Invoice app</li>
          <li>Invoices</li>
          <li>Products</li>
          <li>Customers</li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
