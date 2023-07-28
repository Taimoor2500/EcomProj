import React, { useState } from "react";
import ProductListComponent from "./productTable";
import Footer from "../main/footer";



const SidebarComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);
  
  const handlePageChange = (page) => {
    setPageNumber(page);
  };
  return (
    <div className="container-fluid">
      <div className="row">
       
        <div className="col-3 bg-light min-vh-100">
         
          <div className="py-3">
            <h5 className="mb-3">Products</h5>
          </div>
          <div className="py-3">
            <h5 className="mb-3">Orders</h5>
           
          </div>
        </div>
        
     


    
         <ProductListComponent  page={pageNumber}/>

         <Footer onPageChange={handlePageChange} /> 
      </div>


      


    </div>
  );
};

export default SidebarComponent;
