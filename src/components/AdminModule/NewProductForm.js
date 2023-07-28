/* eslint-disable react/prop-types */
import React, { useState } from "react";

const NewProductForm = ({ show, onHide }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const handleSaveProduct = async () => {
    try {
      if (!title || !price || !stock) {
        setError("Title, Price, and Stock are required.");
        return;
      }

      setError("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("color", color);
      formData.append("stock", stock);
      formData.append("image", imageFile);

      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product.");
      }

      onHide();
    } catch (error) {
      console.error("Error creating product:", error);
      setError("An error occurred while creating the product.");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className={`offcanvas offcanvas-end ${show ? "show" : ""}`} tabIndex="-1" role="dialog">
      <div className="offcanvas-dialog">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">New Product</h5>
          <button type="button" className="btn-close text-reset" onClick={onHide}></button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Product Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
              />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type="button" className="btn btn-primary" onClick={handleSaveProduct}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;
