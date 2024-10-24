import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import App from "@/App";
import RootLayout from "./Layouts/RootLayout";
import PersistLogin from "./context/PersistLogin";
import RequireAuth from "./context/RequireAuth";
import Home from "./pages/Home";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import DashboardLayout from "./Layouts/DashboardLayout";
import Menus from "./pages/Menus";
import Orders from "./pages/Orders";
import Roles from "./pages/Roles";
import Users from "./pages/Users";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import AddAdmin from "./pages/AddAdmin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element="Not Found" />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="order_history" element={<OrderHistory />} />
          </Route>
        </Route>
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/order" element={<Order />} />

          <Route path="/dashboard" element={<RegisterRestaurant />} />
          <Route path="/add_admin" element={<AddAdmin />} />

          <Route path="/dashboard/layout" element={<DashboardLayout />}>
            <Route path="order" element={<Orders />} />
            {/* <Route index path="orders" element={<Orders />} /> */}
            <Route path="menu" element={<Menus />} />
            <Route path="role" element={<Roles />} />
            <Route path="user" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
