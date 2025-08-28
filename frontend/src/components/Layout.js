// src/components/Layout.js
import React from "react";
import Header from "./ui/Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
