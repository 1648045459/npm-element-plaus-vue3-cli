import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./style/index.css"; //全局样式
import vueI18n from './locales/index'
import SvgIcon from './components/SvgIcon/index.vue'// svg component
// 二维码插件
import QrcodeVue from 'qrcode.vue'

const app = createApp(App);

// 全局设置 svg 组件
app.component('svg-icon', SvgIcon)
app.component('qrcode-vue', QrcodeVue)
app.use(ElementPlus)
app.use(vueI18n);
app.use(store).use(router).mount("#app");
