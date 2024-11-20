import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },
      {
        path: "dashboard",
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },
      {
        path: "transactions",
        lazy: async () => ({
          Component: (await import("./pages/transactions")).default,
        }),
      },
      {
        path: "enforcement",
        lazy: async () => ({
          Component: (await import("./pages/enforcement")).default,
        }),
      },
      {
        path: "locations",
        lazy: async () => ({
          Component: (await import("./pages/locations")).default,
        }),
      },
      {
        path: "permits",
        lazy: async () => ({
          Component: (await import("./pages/permits")).default,
        }),
      },
      {
        path: "reservations",
        lazy: async () => ({
          Component: (await import("./pages/reservations")).default,
        }),
      },
      // {
      //   path: 'users',
      //   lazy: async () => ({
      //     Component: (await import('./pages/users')).default,
      //   }),
      // },
      // {
      //     path: "settings",
      //     lazy: async () => ({
      //         Component: (await import("./pages/settings")).default,
      //     }),
      //     errorElement: <GeneralError />,
      //     children: [
      //         {
      //             path: "account",
      //             lazy: async () => ({
      //                 Component: (
      //                     await import("./pages/settings/account")
      //                 ).default,
      //             }),
      //         },
      //     ],
      // },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
