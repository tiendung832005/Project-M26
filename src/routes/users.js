import UsersLayout from "@/layouts/users/UsersLayout.vue";
import Home from "@/views/users/Home.vue";

const userRoutes = [
  {
    path: "/home",
    component: UsersLayout,
    children: [
      {
        path: "",
        name: "HomePage",
        component: Home ,
      },
    ],
  },
];

export default userRoutes;
