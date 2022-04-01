import { createApp } from 'vue'
import router from './router/index.js'
import store from './store/index.js'
import App from './App.vue'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faNoteSticky, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([faNoteSticky, faSquareCheck]);

// css
import "./assets/styles/main.scss";

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app')
