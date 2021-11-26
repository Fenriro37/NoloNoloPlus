import Vue from "vue";
import Router from "vue-router";
//import App from "./App.vue"
import createArticle from "./components/createArticle.vue";
import createReservation from "./components/createReservation.vue";
import article from "./components/article.vue";
import client from "./components/client.vue"
import reservation from "./components/reservation.vue"
import articleCatalog from "./components/articleCatalog.vue";
import clientCatalog from "./components/clientCatalog.vue";
import reservationCatalog from "./components/reservationCatalog.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
   /* {
      path: "/",
      name: "Home",
      component: App
    }, */
    {
      path: "/createArticle",
      component: createArticle
    },
    {
      path: "/createReservation",
      component: createReservation
    },
    {
      path: "/article",
      component: article
    },
    {
      path: "/client/:id",
      component: client,
    },
    {
      path: "/reservation",
      component: reservation
    },
    {
      path: "/articleCatalog",
      component: articleCatalog
    },
    {
      path: "/clientCatalog",
      component: clientCatalog
    },
    {
      path: "/reservationCatalog",
      component: reservationCatalog
    }
  ]
});