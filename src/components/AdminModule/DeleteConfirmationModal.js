/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({ show, onCancel, onDelete, product }) => {
  const handleDeleteProduct = async () => {
    try {
      
      await fetch(`http://localhost:5000/api/admin/products/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

     
      onDelete();

      onCancel();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
