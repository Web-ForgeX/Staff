import { BrowserRouter as PKRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// Components and Layout
import Layout from "@/layout";
import HomePage from "@/pages/home";
import BrowsePage from "@/pages/browse";
import User_Settings from "@/pages/user/settings";
import User_Content from "@/pages/user/content";
import User_View from "@/pages/user/view";
import User_Resources from "@/pages/user/resources";
import Resource_Create from "@/pages/resources/create";
import Resource_Edit from "@/pages/resources/edit";
import Resource_View from "@/pages/resources/view";
import Not_Found from "@/pages/404";
import TOS from "@/pages/tos";
import Privacy from "@/pages/privacy";
import Signin from "@/pages/auth/signin";
import Signup from "@/pages/auth/signup";

// Providers
import InboxProvider from "@/hooks/inbox";
import DeleteModalProvider from "@/hooks/delete_confirm";
import AuthProvider, { ProtectedRoute } from "@/hooks/user";

// Types
interface RouteConfig {
  path: string;
  title: string;
  element: React.ComponentType | (() => React.ReactElement);
  protected?: boolean;
}

// Custom hook with TypeScript
const usePageTitle = (title: string): void => {
  useEffect(() => {
    document.title = title ? `ForgeX | ${title}` : "ForgeX";
  }, [title]);
};

// Higher-order component to wrap pages with titles
const withPageTitle = (
  WrappedComponent: React.ComponentType,
  title: string,
): React.ReactElement => {
  const WithPageTitleComponent = () => {
    usePageTitle(title);
    return <WrappedComponent />;
  };
  return <WithPageTitleComponent />;
};

// External redirect component
const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
};

// Route configurations
const ROUTES: RouteConfig[] = [
  // Public Routes
  { path: "/", title: "Home", element: HomePage },
  { path: "/browse", title: "Browse", element: BrowsePage },

  // User Routes
  {
    path: "/user/settings",
    title: "My Settings",
    element: User_Settings,
    protected: true,
  },
  {
    path: "/user/content",
    title: "My Content",
    element: User_Content,
    protected: true,
  },
  {
    path: "/user/resources",
    title: "My Resources",
    element: User_Resources,
    protected: true,
  },
  {
    path: "/user/view/:name",
    title: "View User",
    element: User_View,
  },

  // Resource Routes
  {
    path: "/resources/create",
    title: "Create A Resource",
    element: Resource_Create,
    protected: true,
  },
  {
    path: "/resources/edit/:id",
    title: "Edit Resource",
    element: Resource_Edit,
    protected: true,
  },
  {
    path: "/resources/:id",
    title: "Resource Details",
    element: Resource_View,
  },

  // Info Routes
  { path: "/tos", title: "Terms Of Service", element: TOS },
  { path: "/privacy", title: "Privacy", element: Privacy },

  // Auth Routes
  { path: "/auth/signup", title: "Sign Up", element: Signup },
  { path: "/auth/signin", title: "Sign In", element: Signin },

  // Discord Redirect
  {
    path: "/discord",
    title: "Discord",
    element: () => <ExternalRedirect to="https://discord.gg/forgex" />,
  },

  // 404 Route - Keep last
  { path: "*", title: "Page Not Found", element: Not_Found },
];

const Router: React.FC = () => {
  return (
    <AuthProvider>
      <InboxProvider>
        <DeleteModalProvider>
          <PKRouter>
            <Layout>
              <Routes>
                {ROUTES.map(
                  ({
                    path,
                    title,
                    element: Component,
                    protected: isProtected,
                  }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        isProtected ? (
                          <ProtectedRoute>
                            {typeof Component === "function" ? (
                              <Component />
                            ) : (
                              withPageTitle(Component, title)
                            )}
                          </ProtectedRoute>
                        ) : typeof Component === "function" ? (
                          <Component />
                        ) : (
                          withPageTitle(Component, title)
                        )
                      }
                    />
                  ),
                )}
              </Routes>
            </Layout>
          </PKRouter>
        </DeleteModalProvider>
      </InboxProvider>
    </AuthProvider>
  );
};

export default Router;
