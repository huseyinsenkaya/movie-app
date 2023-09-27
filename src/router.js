import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/movie-app/", component: () => import("./views/Home.vue") },
    {
      path: "/movie-app/register",
      component: () => import("./views/Register.vue"),
    },
    { path: "/movie-app/login", component: () => import("./views/Login.vue") },
    {
      path: "/movie-app/search",
      component: () => import("./views/Search.vue"),
    },
    {
      path: "/movie-app/:id",
      name: "movie-details",
      component: () => import("./views/MovieDetails.vue"),
    },
    {
      path: "/movie-app/watchlist",
      component: () => import("./views/Watchlist.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/movie-app/login");
    }
  } else {
    next();
  }
});

export default router;
