import Vue from "vue";
import Router from "vue-router";
//import App from "./App.vue";
import createArticle from "./components/createArticle.vue";
import createReservation from "./components/createReservation.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
/*     {
      path: "/",
      name: "Home",
      component: App
    }, */
    {
      path: "/createArticle",
      name: "create-article",
      component: createArticle
    },
    {
      path: "/createReservation",
      name: "createReservation",
      component: createReservation
    }
  ]
});