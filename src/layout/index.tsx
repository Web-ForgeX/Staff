import React, { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="z-0">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
