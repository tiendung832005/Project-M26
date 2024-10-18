import "./assets/main.css";
import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store.js";
// Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Add Font Awesome icons to the library
library.add(fas, far);

// Import Bootstrap Icons CSS
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./routes";

const app = createApp(App);

// Register FontAwesomeIcon globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Sử dụng router và store riêng biệt
app.use(router);
app.use(store);
app.mount("#app");
