import { createWebHistory, createRouter } from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  //   {
  //     path: "/register",
  //     name: "register",
  //     component: Register,
  //   },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/add",
    name: "add",
    component: Add,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: Edit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
