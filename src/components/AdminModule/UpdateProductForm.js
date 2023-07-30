/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import axios from "axios";

const UpdateProductForm = ({ show, onHide, product }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [description, setDescription] = useState(product?.description || "");
  const [imageFile, setImageFile] = useState(null); 
  const [color, setColor] = useState(product?.color || ""); 

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(); 

      formData.append("title", title);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("color", color); 
      if (imageFile) {
        formData.append("image", imageFile); 
      }

      
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/${product._id}`,
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to update product.");
      }

      onHide(); 
    } catch (error) {
      console.error("Error updating product:", error);
     
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); 
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
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
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UpdateProductForm;
