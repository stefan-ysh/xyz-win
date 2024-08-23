import EpisodeDetail from "@/views/episodeDetail.vue";
import EpisodeList from "@/views/episodeList.vue";
import Index from "@/views/index.vue";
import Login from "@/views/login.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Index },
  { path: "/login", component: Login },
  { path: "/episodeList", component: EpisodeList },
  { path: "/episodeDetail", component: EpisodeDetail },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
