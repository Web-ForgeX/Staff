import React, { ReactNode } from "react";
import Navbar from "./components/navbar";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="z-0">{children}</main>
      
    </>
  );
};

export default Layout;