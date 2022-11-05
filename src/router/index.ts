import { createRouter, createWebHistory } from "vue-router";
import BeersView from "../views/Beers/BeersView.vue";
import BeerDetails from "../views/Beers/BeerDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "beers",
      component: BeersView,
    },
    {
      path: "/:id",
      name: "beerDetails",
      component: BeerDetails,
      props: (route) => {
        const id = +route.params.id;
        return { id };
      },
    },
  ],
});

export default router;
