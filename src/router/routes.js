const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HistoryPage.vue"),
      },
      {
        path: "/products",
        component: () => import("pages/products/index.vue"),
      },
      {
        path: "/products/:id",
        component: () => import("pages/products/single-product/_id.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
