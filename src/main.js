import { createApp } from 'vue'
import App from './App.vue'
import "normalize.css";
import router from './router'
import ChachItem from './components/ChachItem.vue'


createApp(App)
.component('ChachItem', ChachItem)
.use(router).mount('#app');