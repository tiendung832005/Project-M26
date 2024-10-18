import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

const authRoutes = [
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/register",
    component: Register,
    name: "register",
  },
];

export default authRoutes;
