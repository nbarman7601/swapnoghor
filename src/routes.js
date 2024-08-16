import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Employee from "./Admin/Employee";
import { isAuthenticated } from "./auth";
import { Customer } from "./Admin/Customer";
import { ProductList } from "./Admin/Product";
import Loan from "./Admin/Loan";
import { LoanDetail } from "./Admin/Loan/LoanDetail";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
      breadcrumb: 'Home',
    },
    {
        path: '/login',
        element: <Login/>,
        breadcrumb: 'Login',
    },
    {
      path: "/admin",
      element: <Admin/>,
      breadcrumb: 'Admin',
      children: [
        {
          path: "employee",
          element: <Employee/>,
          breadcrumb: 'User',
        },
        {
          path: "customer",
          element: <Customer/>,
          breadcrumb: 'Customer',
        },
        {
          path: "products",
          element: <ProductList/>,
          breadcrumb: 'Products',
        },
        {
          path: 'loan',
          element: <Loan/>,
          breadcrumb: 'Loan',
          children:[
            { 
              path: ':id/detail', 
              element: <LoanDetail /> ,
              breadcrumb: 'Detail',
            }
          ]
        },
       
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