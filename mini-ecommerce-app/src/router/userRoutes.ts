const userRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user/LoginPage.vue"),
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/user/SignUp.vue"),
    meta: {
      title: "Signup",
      requiresAuth: false,
    },
  },
];

export default userRoutes;
