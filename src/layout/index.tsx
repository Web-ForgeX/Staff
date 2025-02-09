import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation(); // Get current route

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="z-0"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Layout;
