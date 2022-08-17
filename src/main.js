import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store/index";
import "@/assets/css/form.css";
import "@/assets/css/tailwind.css";
// Global Atoms
import AppButton from "@/components/util/AppButton";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faExclamationTriangle,
  faUser,
  faSortUp,
  faSortDown,
  faCaretDown,
  faCaretUp,
  faCheck,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(
  faCheck,
  faCaretDown,
  faCaretUp,
  faExclamationTriangle,
  faUser,
  faSortUp,
  faSortDown,
  faClose
);
const app = createApp(App);
app.use(router);
app.use(store);
// Global Components
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-button", AppButton);

app.mount("#app");
