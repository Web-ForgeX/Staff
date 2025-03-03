import { BrowserRouter as PKRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// Components and Layout
import Layout from "@/layout";
import Signin from "@/pages/auth/signin";
import Not_Found from "@/pages/404";
import StaffDashboard from "@/pages/home";

// Providers

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
    document.title = title ? `ForgeX Staff | ${title}` : "ForgeX Staff";
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

// Route configurations
const ROUTES: RouteConfig[] = [
  // Auth Routes
  { path: "/auth/signin", title: "Sign In", element: Signin },

  // Pages
  { path: "/", title: "Dashboard", element: StaffDashboard },

  // 404 Route - Keep last
  { path: "*", title: "Page Not Found", element: Not_Found },
];

const Router: React.FC = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default Router;
