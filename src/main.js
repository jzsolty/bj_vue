import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from "@/store";
import FontAwesomeIcon from "@/fontawesome-icons";
import './axios'
import './assets/tailwind.css'


createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')