
import Index from "views/Index.js";
import Manufacturer from "views/examples/Manufacturer";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Vehicles from "views/examples/Vehicles";
import Employee from "views/examples/Employee";
import SoldVehicles from "views/examples/SoldVehicles";
import SellVehicle from "views/examples/SellVehicle";
import Customer from "views/examples/customerPage";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-white",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Manage Employee",
    icon: "ni ni-single-02 text-white",
    component: <Employee />,
    layout: "/admin",
    style: { 'color': 'white' }
  },
  {
    path: "/manufacturer",
    name: "Manufacturer & Model",
    icon: "ni ni-app text-white",
    component: <Manufacturer />,
    layout: "/admin",
  },
  
  {
    path: "/vehicles",
    name: "Vehicles",
    icon: "ni ni-delivery-fast text-white",
    component: <Vehicles />,
    layout: "/admin",
  },
  {
    path: "/soldVehicles",
    name: "Sold Vehicles",
    icon: "fas fa-shopping-cart text-white",
    component: <SoldVehicles />,
    layout: "/admin",
  },
  {
    path: "sellVehicles/:id?",
    name: "Sell Vehicles",
    icon: "fas fa-shopping-cart text-white",
    component: <SellVehicle />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-white",
    component: <Login />,
    layout: "/auth",
    hidden: true
  },
  {
    path: "/register",
    name: "Register",
    style: { color: "white" },
    icon: "ni ni-circle-08 text-white",
    component: <Register />,
    layout: "/auth",
    hidden: true
  },
  {
    path: "/customer",
    name: "Customer",
    style: {color: "white" },
    component: <Customer />,
    layout: "/customer",
    hidden: true,
  }
];
export default routes;
