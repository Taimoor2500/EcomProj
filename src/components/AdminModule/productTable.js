/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setTotalPages } from "../../redux/reducers/paginationSlice";
import NewProductForm from "./NewProductForm";
import UpdateProductForm from "./UpdateProductForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Modal, Button } from "react-bootstrap";

const ProductListComponent = ({ page }) => {
  const [products, setProducts] = useState([]);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(page);
  }, [page , updateTrigger]);

  const fetchProducts = async () => {
    console.log(page);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();

      const productsPerPage = 8;
      const totalPages = Math.ceil(data.count / productsPerPage);

      dispatch(setTotalPages(totalPages));

      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductImage = (product) => {
    const filename = product.image.substring(product.image.lastIndexOf("/") + 1);
    return require(`../../images/${filename}`);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };
  const handleDeleteConfirmation = async () => {
    try {
      
      fetchProducts(page);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      
      setShowDeleteConfirmation(false);
    }
  };



  return (
    <div className="col-9">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <button className="btn btn-primary" onClick={() => setShowNewProductForm(true)}>
          New Product
        </button>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={getProductImage(product)}
                    alt={product.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  <span>{product.title}</span>
                </div>
              </td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className="d-flex gap-2">
                <MdEdit className="text-primary" onClick={() => handleEditClick(product)}
                   />
                <MdDelete
                  className="text-danger"
                  onClick={() => {
                    setSelectedProductToDelete(product);
                    setShowDeleteConfirmation(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewProductForm show={showNewProductForm} onHide={() => setShowNewProductForm(false)} />
      <UpdateProductForm show={showUpdateForm} onHide={() => setShowUpdateForm(false)} product={selectedProduct}
      onUpdate={() => setUpdateTrigger(!updateTrigger)} />

      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onDelete={handleDeleteConfirmation}
        product = {selectedProductToDelete}
      />
    </div>
   
  );
};

export default ProductListComponent;
