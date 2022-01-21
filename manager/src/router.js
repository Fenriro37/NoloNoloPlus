import Vue from "vue";
import Router from "vue-router";
//import App from "./App.vue"
import createArticle from "./components/createArticle.vue";
import createReservation from "./components/createReservation.vue";
import article from "./components/article.vue";
import client from "./components/client.vue"
import reservation from "./components/reservation.vue"
import clientChart from "./components/clientChart.vue"



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
      path: "/client:email",
      name: "client",
      component: client,
    },
    {
      path: "/reservation:id",
      name: "reservation",
      component: reservation
    },
    {
      path: "/chartClient",
      name: "clientChart",
      component: clientChart
    }
  ]
});