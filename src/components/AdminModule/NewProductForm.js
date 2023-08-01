/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";

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
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>New Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
            />
          </Form.Group>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <Button type="button" variant="primary" onClick={handleSaveProduct}>
            Save
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};


export default NewProductForm;
