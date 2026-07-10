// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'

import '@/assets/styles/token.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/utilities.css'
import 'highlight.js/styles/github.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.component('FontAwesomeIcon', FontAwesomeIcon)
library.add(faBars, faXmark, faEnvelope)
