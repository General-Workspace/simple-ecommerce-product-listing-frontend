import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

import baseRoutes from "./baseRoutes";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";

const routes: Array<RouteRecordRaw> = [...baseRoutes, ...userRoutes, ...productRoutes];

const router = createRouter({
  linkActiveClass: "active-link",
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  try {
    const authStore = useAuthStore();
    authStore.loadTokenFromStorage();
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in router.beforeEach: ", error);
    next(false);
  }
});

router.onError((error) => {
  console.error("Error in router.onError: ", error);
});

router.afterEach((to) => {
  document.title = `Ecommerce - ${(to.meta.title as string) ?? ""}`;
});

export default router;
