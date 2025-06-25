import logo from "./logo.svg";
import "./App.css";

import LayoutLv from "./LayoutLv";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      {/* <LayoutLv /> */}
      <RouterProvider router={routers} />
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
