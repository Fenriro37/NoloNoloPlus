import Vue from "vue";
import Router from "vue-router";
//import App from "./App.vue"
import createArticle from "./components/createArticle.vue";
import createReservation from "./components/createReservation.vue";
import article from "./components/article.vue";
import client from "./components/client.vue"
import reservation from "./components/reservation.vue"
import chart from "./components/chart.vue"

import articleCatalog from "./components/articleCatalog.vue";
import clientCatalog from "./components/clientCatalog.vue";
import reservationCatalog from "./components/reservationCatalog.vue";


Vue.use(Router);
let ur = "http://localhost:8081/manager"
let url = "http://localhost:8081/manager/index.html";

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/createArticle",
      name: "createArticle",
      component: createArticle
    },
    {
      path: "/createReservation:id",
      name: "createReservation",
      component: createReservation
    },
    {
      path: "/article:id",
      name: "article",
      component: article
    },
    {
      path: "/client:id",
      name: "client",
      component: client,
    },
    {
      path: "/client1:email",
      name: "client1",
      component: client,
    },
    {
      path: "/reservation:id",
      name: "reservation",
      component: reservation
    },
    {
      path: "/chart",
      name: "chart",
      component: chart
    }
  ]
});