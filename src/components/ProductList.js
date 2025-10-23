import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category_id: "",
    status: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [reload]);

  const fetchProducts = () => {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.category_id) params.category_id = filters.category_id;
    if (filters.status) params.status = filters.status;

    axios
      .get("/products", { params })
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  };

  const fetchCategories = () => {
    axios
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`/products/${id}`)
        .then(() => {
          alert("Deleted successfully!");
          setReload(!reload);
        })
        .catch((err) => {
          console.error(err);
          alert("Delete failed!");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Product Inventory</h2>

      <ProductForm onAdded={() => setReload(!reload)} />

      <div className="card mt-4">
        <div className="card-body">
          <h5>Filters</h5>
          <div className="row">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-4 mb-2">
              <select
                className="form-control"
                value={filters.category_id}
                onChange={(e) =>
                  setFilters({ ...filters, category_id: e.target.value })
                }
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-2">
              <select
                className="form-control"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className="btn btn-secondary mt-2" onClick={fetchProducts}>
            Apply Filters
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5>Product List</h5>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.category?.name}</td>
                    <td>{p.status}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
