import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueCesium from 'vue-cesium'
import router from './router'; // 引入路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vue-cesium/dist/index.css'
import  './style/element.css'

const app = createApp(App)
app.use(VueCesium) 
app.use(router); // 使用路由
app.use(ElementPlus)
app.mount('#app')