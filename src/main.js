import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store/index";
import "@/assets/css/form.css";
import "@/assets/css/tailwind.css";
// Global Atoms
import AppButton from "@/components/util/AppButton";

const app = createApp(App);
app.use(router);
app.use(store);
// Global Components
app.component("v-button", AppButton);

app.mount("#app");
