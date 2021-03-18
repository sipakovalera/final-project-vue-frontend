import { createApp } from "vue";

import router from "./router";
import VuexStore from "./store/index";
import SettingAxios from './plugins/axios';
import App from "./App.vue";
import "./registerServiceWorker";

SettingAxios(VuexStore);

createApp(App)
  .use(router)
  .use(VuexStore)
  .mount("#app");
