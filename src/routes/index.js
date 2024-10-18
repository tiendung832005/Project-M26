import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./users";
import adminRoutes from "./admin";
import authRoutes from "./auth";

const routes = [...userRoutes, ...adminRoutes, ...authRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
