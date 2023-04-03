/*Vue*/
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

/*Vuetify*/
import "./assets/scss/fonts.scss"
import './main.scss'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    icons: {
        iconfont: 'mdi'
    },
    components,
    directives,
})

/*Pinia*/
import {createPinia} from "pinia";

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
