import "./styles/App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Portal from "./Portal";

/* The code is creating a router using the `createBrowserRouter` function from the `react-router-dom`
library. The router is configured with two routes: one for the root path ("/") that renders the
`HomePage` component, and another for the "/map" path that renders the `MapPage` component. */
const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/portal", Component: Portal },
]);

// Usefull in development, allows to quickly use local or remote APIs. !!Clean When Done!!
const UUNetwork = true
if (UUNetwork) {
  window.apiUrl = 'hydeprod.geo.uu.nl'
} else {
  window.apiUrl = 'localhost'
}

// Return App, which has two pages: / (homepage) and /map (actual portal)
export default function App() {
  return <RouterProvider router={router} />;
}
