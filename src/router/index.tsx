// Packages
import { BrowserRouter as PKRouter, Route, Routes } from "react-router-dom";

// Components
import Layout from "@/layout";

// Functions

// Pages
import HomePage from "@/pages/home";

// User Pages
import User_Settings from "@/pages/user/settings";

export default function Router() {
  return (
    <PKRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />

          {/* User Routes */}
          <Route path="/user/settings" element={<User_Settings />} />
        </Routes>
      </Layout>
    </PKRouter>
  );
}
