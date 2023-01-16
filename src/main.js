import { createApp } from 'vue';
import App from './App.vue';
import "normalize.css";
import router from './router';
import ChachItem from './components/ChachItem.vue';
import UserVideos from './components/UserVideos.vue'


createApp(App)
    .component('ChachItem', ChachItem)
    .component('UserVideos', UserVideos)
    .use(router).mount('#app');