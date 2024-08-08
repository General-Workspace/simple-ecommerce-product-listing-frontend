import LandingPage from "../views/base/LandingPage.vue";

const baseRoutes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
    meta: {
      title: "Landing",
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/base/NotFound.vue"),
    meta: {
      title: "Not Found",
      requiresAuth: false,
    },
  },
];

export default baseRoutes;
