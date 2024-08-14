import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Employee from "./Admin/Employee";
import { isAuthenticated } from "./auth";
import { Customer } from "./Admin/Customer";
import { ProductList } from "./Admin/Product";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
      path: "/admin",
      element: <Admin/>,
      children: [
        {
          path: "employee",
          element: <Employee/>
        },
        {
          path: "customer",
          element: <Customer/>
        },
        {
          path: "products",
          element: <ProductList/>
        }
      ],
      loader: async () => {
        if (!isAuthenticated()) {
          // Redirect to login if the user is not authenticated
          throw redirect('/login');
        }
        return null;
      },
    }
]);

export default router;