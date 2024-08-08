const productRoutes = [
  {
    path: "/products",
    name: "products",
    component: () => import("../views/products/ProductsPage.vue"),
    meta: {
      requiresAuth: true,
      title: "Products",
    },
  },
  {
    path: "/add-product",
    name: "add-product",
    component: () => import("../views/products/AddProduct.vue"),
    meta: {
      requiresAuth: true,
      title: "Add Product",
    },
  },
];

export default productRoutes;
 