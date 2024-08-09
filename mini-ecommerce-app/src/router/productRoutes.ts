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
  {
    path: "/product/:id",
    name: "product",
    component: () => import("../views/products/SingleProduct.vue"),
    meta: {
      requiresAuth: true,
      title: "Product",
    },
  },
  {
    path: "/edit-product/:id",
    name: "edit-product",
    component: () => import("../views/products/EditProduct.vue"),
    meta: {
      requiresAuth: true,
      title: "Edit Product",
    },
  },
];

export default productRoutes;
