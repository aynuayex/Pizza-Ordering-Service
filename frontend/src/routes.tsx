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
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Role from "./pages/Role";
import User from "./pages/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/order" element={<Order />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Orders />} />
        {/* <Route index path="orders" element={<Orders />} /> */}
        <Route path="menu" element={<Menu />} />
        <Route path="role" element={<Role />} />
        <Route path="user" element={<User />} />
      </Route>
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="order_history" element={<OrderHistory />} />
        {/* <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          {/* <Route path="/" element={<App />}> */}
        {/* 
            <Route path="books" element={<Books />} />
            <Route path="owners" element={<Owners />} />
            <Route path="book_upload" element={<BookUpload />} />
            <Route path="book_upload" element={<BookUpload2 />} /> */}
        {/* </Route> */}
        {/* </Route>
        </Route> */}
      </Route>
    </Route>
  )
);

export default router;
