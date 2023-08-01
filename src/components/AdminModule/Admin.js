import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../main/Navbar";
import SidebarComponent from "./sidebar";

const Admin = () => {
  const navigate = useNavigate(); 
  const token = useSelector((state) => state.session.token);

  useEffect(() => {
   
    if (token === "") {
      navigate("/login"); 
    }
  }, [token, navigate]);

  return (
    <div>
      <Navbar />
      <SidebarComponent />
    </div>
  );
};

export default Admin;
