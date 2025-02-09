// Packages
import { BrowserRouter as PKRouter, Route, Routes } from "react-router-dom";

// Components
import Layout from "@/layout";

// Functions

// Pages
import HomePage from "@/pages/home";

export default function Router() {
  return (
    <PKRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </PKRouter>
  );
}
