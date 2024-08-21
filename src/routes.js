import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Employee from "./Admin/Employee/Employee";
import { isAuthenticated } from "./auth";
import { Customer } from "./Admin/Customer";
import { ProductList } from "./Admin/Product";
import Loan from "./Admin/Loan";
import { LoanDetail } from "./Admin/Loan/LoanDetail";
import Group from "./Admin/Group";
import { CustomerDetail } from "./Admin/Customer/CustomerDetail";
import { Suspense } from "react";
import { AddCustomer } from "./Admin/Customer/AddCustomer";
import Calendar from "./Admin/Calendar/DueCalendar";
import { PageNotFound } from "./common/PageNotFound";
import { AddEmployee } from "./Admin/Employee/AddEmployee/AddEmployee";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Login />,
  //   breadcrumb: 'Home',
  // },
  {
    path: '/login',
    element: <Login />,
    breadcrumb: 'Login',
  },
  {
    path: "/",
    element: (
       isAuthenticated ? <Admin /> : <Login/>
    ),
    breadcrumb: 'Admin',
    children: [
      {
        path: "employee",
        element: <Employee />,
        breadcrumb: 'Employee',
        children:[
          {
            path: 'add-employee',
            element: <AddEmployee/>,
            breadcrumb: 'Add Employee'
          },
          {
            path: 'detail/:id',
            element: <AddEmployee />,
            breadcrumb: 'Employee Detail'
          },
          {
            path: '*',
            element: <PageNotFound/>,
            breadcrumb: '404 Not Found'
          }
        ]
      },
      {
        path: "group",
        element: <Group />,
        breadcrumb: 'Group',
      },
      {
        path: "customer",
        element: <Customer />,
        breadcrumb: 'Customer',
        children: [
          {
            path: 'detail/:id',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <CustomerDetail />
              </Suspense>
            ),
            breadcrumb: 'Detail'
          },
          {
            path: "add-customer",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddCustomer />
              </Suspense>
            ),
            breadcrumb: 'Add Customer'
          }
        ]
      },
      {
        path: "products",
        element: <ProductList />,
        breadcrumb: 'Products',
      },
      {
        path: 'loan',
        element: <Loan />,
        breadcrumb: 'Loan',
        children: [
          {
            path: ':id/detail',
            element: <LoanDetail />,
            breadcrumb: 'Detail',
          }
        ]
      },
      {
        path: 'calendar',
        element: <Suspense fallback={`Loading. Please Wait`}>
          <Calendar />
        </Suspense>, 
        breadcrumb: 'Calendar',
      }

    ],
    loader: async () => {
      if (!isAuthenticated()) {
        // Redirect to login if the user is not authenticated
        throw redirect('/login');
      }
      return null;
    },
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]);

export default router;