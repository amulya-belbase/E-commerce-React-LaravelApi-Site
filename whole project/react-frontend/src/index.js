import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/login';
import Registration from './components/registration';
import AddProduct from './components/addproduct';
import AllProducts from './components/allproducts';
import Update from './components/update';
import MyProducts from './components/myproducts';
import reportWebVitals from './reportWebVitals';
import Cart from './components/cart';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/myproducts",
    element: <MyProducts />,
  },
  {
    path: "myproducts/update/:id",
    element: <Update />,
  },{
    path: "/cart",
    element: <Cart />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
