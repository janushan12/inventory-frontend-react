import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Inventory Management</span>
        </div>
      </nav>
      <ProductList />
    </div>
  );
}

export default App;
