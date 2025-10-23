import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error.tsx";
import NotFoundError from "./pages/errors/not-found-error.tsx";
import MaintenanceError from "./pages/errors/maintenance-error.tsx";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/app-shell.tsx");
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/index.tsx")).default,
        }),
      },
      {
        path: "dashboard",
        lazy: async () => ({
          Component: (await import("./pages/dashboard/index.tsx")).default,
        }),
      },
      {
        path: "transactions",
        lazy: async () => ({
          Component: (await import("./pages/transactions/index.tsx")).default,
        }),
      },
      {
        path: "enforcement",
        lazy: async () => ({
          Component: (await import("./pages/enforcement/index.tsx")).default,
        }),
      },
      {
        path: "locations",
        lazy: async () => ({
          Component: (await import("./pages/locations/index.tsx")).default,
        }),
      },
      {
        path: "permits",
        lazy: async () => ({
          Component: (await import("./pages/permits/index.tsx")).default,
        }),
      },
      {
        path: "reservations",
        lazy: async () => ({
          Component: (await import("./pages/reservations/index.tsx")).default,
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
