// import Login from "./Components/Login/Login";
// import Register from "./Components/Register/Register";
import Home from "./src/Home";
import Login from "./src/Login";
import Register from "./src/Register";
// import Home from "./Components/Home/Home";
// import AddEdit from "./Components/AddEdit/AddEdit";
// import Order from "./Components/order/Order";
// import OTPValidate from "./Components/Login/OTPValidation";
// import ForgotPswd from "./Components/ForgotPswd/ForgotPswd"

// import DataProvider from "./Components/context/DataProvider";
// import Home from "./Components/codepen/Home";

// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/codepen",
    element: (
      <div>
        <Home/>
      </div>
    ),
  },

]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;