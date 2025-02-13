// Packages
import { BrowserRouter as PKRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// Components
import Layout from "@/layout";

// Providers
import InboxProvider from "@/hooks/inbox";
import DeleteModalProvider from "@/hooks/delete_confirm";

// Pages
import HomePage from "@/pages/home";

// User Pages
import User_Settings from "@/pages/user/settings";
import User_Stores from "@/pages/user/stores";
import User_Content from "@/pages/user/content";

// Store Pages
import Store_Create from "@/pages/stores/create";
import Store_View from "@/pages/stores/view";

// Custom hook for managing page title
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `ForgeX | ${title}` : "ForgeX";
  }, [title]);
};

// Wrapper components with titles
const HomeWrapper = () => {
  usePageTitle("Home");
  return <HomePage />;
};

const UserSettingsWrapper = () => {
  usePageTitle("User Settings");
  return <User_Settings />;
};

const UserStoresWrapper = () => {
  usePageTitle("My Stores");
  return <User_Stores />;
};

const UserContentWrapper = () => {
  usePageTitle("My Content");
  return <User_Content />;
};

const StoreCreateWrapper = () => {
  usePageTitle("Create Store");
  return <Store_Create />;
};

const StoreViewWrapper = () => {
  usePageTitle("Store Details");
  return <Store_View />;
};

export default function Router() {
  return (
    <InboxProvider>
      <DeleteModalProvider>
        <PKRouter>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomeWrapper />} />

              {/* User Routes */}
              <Route path="/user/settings" element={<UserSettingsWrapper />} />
              <Route path="/user/stores" element={<UserStoresWrapper />} />
              <Route path="/user/content" element={<UserContentWrapper />} />

              {/* Store Routes */}
              <Route path="/stores/create" element={<StoreCreateWrapper />} />
              <Route path="/stores/view/:name" element={<StoreViewWrapper />} />
            </Routes>
          </Layout>
        </PKRouter>
      </DeleteModalProvider>
    </InboxProvider>
  );
}
