import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../components/navigation/NotFound";
import Login from "../components/auth/Login";
import UsersList from "../components/users/UsersList";
import Profile from "../components/profile/Profile";
import Register from "../components/auth/Register";
import NotesList from "../components/notes/NotesList";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    meta: { publicAuth: true },
    component: Login
  },
  {
    path: "/notes",
    name: "notesList",
    meta: { needsAuth: true },
    component: NotesList
  },
  {
    path: "/users",
    name: "usersList",
    meta: { needsAuth: true },
    component: UsersList
  },
  {
    path: "/profile",
    name: "profile",
    meta: { needsAuth: true },
    component: Profile
  },
  {
    path: "/home",
    name: "home",
    meta: { publicAuth: true },
    component: Home
  },
  {
    path: "/register",
    name: "register",
    meta: { publicAuth: true },
    component: Register
  },
  { path: "/:notFound(.*)", component: NotFound }
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
