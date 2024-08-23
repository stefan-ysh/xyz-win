import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
import router from "@/router/index.ts";

//   引入font awesome图标
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faPlay, faPause, faArrowLeft, faForward, faBackward, faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

// 局部引入图标
/* add icons to the library */
library.add(faPlay, faPause, faArrowLeft, faForward, faBackward, faVolumeDown, faVolumeUp);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);
app.use(router);
app.mount("#app");
