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

// Resource Pages
import Resource_Create from "@/pages/resources/create";

// Info Pages
import Not_Found from "@/pages/404";
import TOS from "@/pages/tos";
import Privacy from "@/pages/privacy";

// Auth Pages
import Signin from "@/pages/auth/signin";
import Signup from "@/pages/auth/signup";

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

const ResourceCreateWrapper = () => {
  usePageTitle("Create A Resource");
  return <Resource_Create />;
};

const NotFoundWrapper = () => {
  usePageTitle("Page Not Found");
  return <Not_Found />;
};

const TOSWrapper = () => {
  usePageTitle("Terms Of Service");
  return <TOS />;
};

const PrivacyWrapper = () => {
  usePageTitle("Privacy");
  return <Privacy />;
};

const SignupWrapper = () => {
  usePageTitle("Sign Up");
  return <Signup />;
};

const SigninWrapper = () => {
  usePageTitle("Sign In");
  return <Signin />;
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

              {/* Store Routes */}
              <Route
                path="/resources/create"
                element={<ResourceCreateWrapper />}
              />

              {/* Info Routes */}
              <Route path="*" element={<NotFoundWrapper />} />
              <Route path="/tos" element={<TOSWrapper />} />
              <Route path="/privacy" element={<PrivacyWrapper />} />

              {/* Auth Routes */}
              <Route path="/auth/signup" element={<SignupWrapper />} />
              <Route path="/auth/signin" element={<SigninWrapper />} />
            </Routes>
          </Layout>
        </PKRouter>
      </DeleteModalProvider>
    </InboxProvider>
  );
}
