import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: () => import("./pages/MyRecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/FavoriteRecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyRecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/familyRecipe/:recipeId",
    name: "fullFamily",
    component: () => import("./pages/FamilyRecipeViewPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
