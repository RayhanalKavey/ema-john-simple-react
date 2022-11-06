import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Inventory from "./components/Inventory/Inventory";
import { productAndCardLoader } from "./components/loaders/productAndCardLoader";
import Login from "./components/login/Login/Login";
import Registration from "./components/login/Registration/Registration";
import Orders from "./components/Orders/Orders";
import Shipping from "./components/Shipping/Shipping";
import Shop from "./components/Shop/Shop";
import Main from "./layouts/Main";
import PrivateRoute from "./routes/PrivateRoute";
function App() {
  const router = createBrowserRouter([
    //----------
    {
      path: "/",
      element: <Main></Main>,
      children: [
        //---

        {
          path: "/shop",

          element: <Shop></Shop>,
        },
        {
          path: "/orders",
          loader: productAndCardLoader,
          element: (
            <PrivateRoute>
              {" "}
              <Orders></Orders>
            </PrivateRoute>
          ),
        },
        { path: "/inventory", element: <Inventory></Inventory> },
        { path: "/about", element: <About></About> },
        { path: "/login", element: <Login></Login> },
        { path: "/registration", element: <Registration></Registration> },
        { path: "/shipping", element: <Shipping></Shipping> },
        //---
      ],
    },
    //----------
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
