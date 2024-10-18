import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import AdminCategory from "@/views/admin/AdminCategory.vue";
import AdminLogin from "@/views/admin/AdminLogin.vue";
import AdminOrder from "@/views/admin/AdminOrder.vue";
import AdminProduct from "@/views/admin/AdminProduct.vue";
import AdminCustomer from "@/views/admin/AdminCustomer.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import AdminAddCategory from "@/views/admin/AdminAddCategory.vue";
import CategoryLayout from "@/layouts/admin/CategoryLayout.vue";
import ProductsLayout from "@/layouts/admin/ProductsLayout.vue";
import AdminAddProduct from "@/views/admin/AdminAddProduct.vue";
import AdminEditProduct from "@/views/admin/AdminEditProduct.vue";

const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "login",
        component: AdminLogin,
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: AdminDashboard,
        meta: { requiresAuth: true }, // Yêu cầu xác thực
      },
      {
        path: "products",
        component: ProductsLayout,
        children: [
          {
            path: "",
            name: "products",
            component: AdminProduct,
            meta: { requiresAuth: true }, // Yêu cầu xác thực
          },
          {
            path: "add",
            name: "AddProduct",
            component: AdminAddProduct,
            meta: { requiresAuth: true }, // Yêu cầu xác thực
          },
          {
            path: "edit/:id",
            name: "EditProduct",
            component: AdminEditProduct,
            meta: { requiresAuth: true }, // Yêu cầu xác thực
          },
        ],
      },
      {
        path: "category",
        component: CategoryLayout,
        children: [
          {
            path: "",
            name: "category",
            component: AdminCategory,
            meta: { requiresAuth: true }, // Yêu cầu xác thực
          },
          {
            path: "add",
            name: "AddCategory",
            component: AdminAddCategory,
            meta: { requiresAuth: true }, // Yêu cầu xác thực
          },
        ],
      },
      {
        path: "customer",
        name: "customer",
        component: AdminCustomer,
        meta: { requiresAuth: true }, // Yêu cầu xác thực
      },
      {
        path: "order",
        name: "order",
        component: AdminOrder,
        meta: { requiresAuth: true }, // Yêu cầu xác thực
      },
    ],
  },
];

// // Navigation Guard để kiểm tra đăng nhập
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !Cookies.get("token")) {
//     // Nếu route yêu cầu đăng nhập và không có token, chuyển hướng về trang đăng nhập
//     next({ path: "/admin" }); // Chuyển hướng về trang login
//   } else {
//     next(); // Cho phép truy cập
//   }
// });

export default adminRoutes;
