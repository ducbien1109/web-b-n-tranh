import { createBrowserRouter } from "react-router-dom";
import LayoutLv from "../LayoutLv";
import AddProduct from "../admin/AddProduct";
import path from "./path";
import Admin from "../admin/Admin";
import DetailProduct from "../main/DetailProduct";
import Cart from "../main/Cart";
import Oders from "../admin/Oders";
import Intro from "../main/Intro";
import SearchResult from "../header/SearchResult";
import Login from "../admin/Login";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <LayoutLv />,
    children: [],
  },
  {
    path: path.addProducts,
    element: <AddProduct />,
  },
  {
    path: path.admin,
    element: <Admin />,
  },
  {
    path: path.detailContentProduct,
    element: <DetailProduct />,
  },
  {
    path: path.edit,
    element: <AddProduct />,
  },
  {
    path: path.cart,
    element: <Cart />,
  },
  {
    path: path.order,
    element: <Oders />,
  },
  {
    path: path.introduce,
    element: <Intro />,
  },
  {
    path: path.Search,
    element: <SearchResult />,
  },
  {
    path: path.LoginAdmin,
    element: <Login />,
  },
]);
export default routers;
