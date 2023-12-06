import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/GET",
    name: "get",
    component: () => import("../views/GET_View.vue"),
  },
  {
    path: "/PUSH",
    name: "push",
    component: () => import("../views/POST_View.vue"),
  },
  {
    path: "/PUT",
    name: "put",
    component: () => import("../views/PUT_View.vue"),
  },
  {
    path: "/DELETE",
    name: "delete",
    component: () => import("../views/DELETE_View.vue"),
  },
  {
    path: "/SEARCH",
    name: "search",
    component: () => import("../views/SEARCH_View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
