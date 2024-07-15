import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, createRoute, createRouter, Outlet } from "@tanstack/react-router";

import { Toaster } from "./components/ui/toaster";
import Customer from "./pages/Customers/Customer";
import Customers from "./pages/Customers/Customers";
import Home from "./pages/Home";
import HomeLayout from "./pages/Layouts/HomeLayout";
import CustomersLayout from "./pages/Layouts/CustomersLayout";

const queryClient = new QueryClient();

const rootRoute = createRootRouteWithContext()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  ),

  notFoundComponent: () => <div>Nie znaleziono</div>,
});

const homeLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "home-layout",
  component: HomeLayout,
});

export const homePage = createRoute({
  getParentRoute: () => homeLayoutRoute,
  path: "/",
  component: Home,
});

const customersLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "customers-layout",
  component: CustomersLayout,
});

export const customersPage = createRoute({
  getParentRoute: () => customersLayoutRoute,
  path: "customers",
  component: Customers,
});

export const customerPage = createRoute({
  getParentRoute: () => customersLayoutRoute,
  path: "customers/$id",
  component: Customer,
});

const routeTree = rootRoute.addChildren([
  homeLayoutRoute.addChildren([homePage]),
  customersLayoutRoute.addChildren([customersPage, customerPage]),
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
