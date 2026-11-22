import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Common Header */}
      <Header />

      {/* Main content injected by Router */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
