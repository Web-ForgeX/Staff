// Packages
import { BrowserRouter as PKRouter, Route, Routes } from "react-router-dom";

// Components
import Layout from "@/layout";

// Providers
import InboxProvider from "@/hooks/inbox";

// Pages
import HomePage from "@/pages/home";

// User Pages
import User_Settings from "@/pages/user/settings";
import User_Stores from "@/pages/user/stores";
import User_Content from "@/pages/user/content";

export default function Router() {
  return (
    <InboxProvider>
      <PKRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            {/* User Routes */}
            <Route path="/user/settings" element={<User_Settings />} />
            <Route path="/user/stores" element={<User_Stores />} />
            <Route path="/user/content" element={<User_Content />} />
          </Routes>
        </Layout>
      </PKRouter>
    </InboxProvider>
  );
}
