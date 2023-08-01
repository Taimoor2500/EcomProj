import React, { useState } from "react";
import ProductListComponent from "./productTable";
import OrdersComponent from "./Order"; 
import Footer from "../main/footer";

const SidebarComponent = () => {
  const [showProducts, setShowProducts] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handleProductClick = () => {
    setShowProducts(true);
  };

  const handleOrderClick = () => {
    setShowProducts(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-light min-vh-100">
          <div className="py-3">
            <h5
              className="mb-3"
              onClick={handleProductClick} 
              style={{ cursor: "pointer" }}
            >
              Products
            </h5>
          </div>
          <div className="py-3">
            <h5
              className="mb-3"
              onClick={handleOrderClick} 
              style={{ cursor: "pointer" }}
            >
              Orders
            </h5>
          </div>
        </div>
       
          {showProducts ? <ProductListComponent page={pageNumber} /> : <OrdersComponent page={pageNumber} />}
        
      </div>
      <Footer  onPageChange={handlePageChange}/>
    </div>
  );
};

export default SidebarComponent;
