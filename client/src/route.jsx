import { useRoutes } from "react-router";
import { Dashboard, Login, Newrecords } from "./pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/:id/newrecords",
      element: <Newrecords />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
}
