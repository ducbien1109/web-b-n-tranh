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
import ProtectedRoute from "../admin/ProtectedRoute"; // thêm dòng này

const routers = createBrowserRouter([
  {
    path: "/",
    element: <LayoutLv />,
    children: [],
  },
  {
    path: path.detailContentProduct,
    element: <DetailProduct />,
  },
  {
    path: path.cart,
    element: <Cart />,
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

  // Các route cần bảo vệ (chỉ admin đăng nhập mới vào được)
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: path.addProducts,
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: path.edit,
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: path.order,
    element: (
      <ProtectedRoute>
        <Oders />
      </ProtectedRoute>
    ),
  },
]);

export default routers;
