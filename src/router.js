import { createRouter, createWebHistory } from "vue-router";

// Pages
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import AccessDenied from "@/pages/error/403Error";
import PageNotFound from "@/pages/error/404Error";
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/Login",
    component: LoginPage,
  },
  {
    path: "/403",
    component: AccessDenied,
  },
  {
    path: "/404",
    component: PageNotFound,
  },
  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
