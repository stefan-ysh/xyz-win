import { createRouter, createWebHashHistory } from "vue-router";

import Login from "@/views/login.vue";
import Index from "@/views/index.vue";
import EpisodeList from "@/views/episodeList.vue";
import EpisodeDetail from "@/views/episodeDetail.vue";
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
