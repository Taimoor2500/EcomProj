/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPages } from "../../redux/reducers/paginationSlice";
import NewProductForm from "./NewProductForm";

const ProductListComponent = ({ page }) => {
  const [products, setProducts] = useState([]);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async () => {
    console.log(page);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/products?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      console.log(data.count);
      const productsPerPage = 8;
      const totalPages = Math.ceil(data.count / productsPerPage);

      dispatch(setTotalPages(totalPages));

      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const getProductImage = (product) => {
    const filename = product.image.substring(
      product.image.lastIndexOf("/") + 1
    );
    return require(`../../images/${filename}`);
  };

  return (
    <div className="col-9">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowNewProductForm(true)}
        >
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
                <MdEdit className="text-primary" />
                <MdDelete className="text-danger" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      < NewProductForm
        show={showNewProductForm}
        onHide={() => setShowNewProductForm(false)}
      />
    </div>
  );
};

export default ProductListComponent;
