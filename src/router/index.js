import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    meta: { publicAuth: true },
    component: () => import("@/views/Login")
  },
  {
    path: "/notes",
    name: "notesList",
    meta: { needsAuth: true },
    component: () => import("@/views/NotesList")
  },
  {
    path: "/users",
    name: "usersList",
    meta: { needsAuth: true },
    component: () => import("@/views/UsersList")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { needsAuth: true },
    component: () => import("@/views/Profile")
  },
  {
    path: "/home",
    name: "home",
    meta: { publicAuth: true },
    component: () => import("@/views/Home")
  },
  {
    path: "/register",
    name: "register",
    meta: { publicAuth: true },
    component: () => import("@/views/Register")
  },
  { path: "/:notFound(.*)", component: () => import("@/views/NotFound") }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach(function(to, _from, next) {
  if (to.meta.needsAuth) {
    if (localStorage.getItem("token") === null) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach(function(to, _from, next) {
  if (to.meta.publicAuth) {
    if (localStorage.getItem("token") !== null) {
      next({ path: "profile" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
