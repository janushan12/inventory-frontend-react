import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const ProductForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    status: "Active",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.precentDefault();

    axios
      .post("/products", form)
      .then(() => {
        alert("Product added successfully");
        setForm({
          name: "",
          description: "",
          price: "",
          quantity: "",
          category_id: "",
          status: "Active",
        });
        onAdded();
      })
      .catch((error) => {
        console.error(error);
        alert("Error adding product");
      });
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Add Product</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
                <input
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-2">
                <select name="category_id" className="form-control" value={form.category_id} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
          </div>
          <div className="mb-2">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <select
              name="status"
              className="form-control"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button className="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
