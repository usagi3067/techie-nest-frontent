import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "@/access";
import "bytemd/dist/index.css";
import VueCookies from "vue3-cookies";
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import ElementPlus from "element-plus"; //全局引入
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "element-plus/dist/index.css";

createApp(App)
  .use(ArcoVue)
  .use(VueCookies)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .use(VueVideoPlayer)
  .use(ElementPlus)
  .mount("#app");
