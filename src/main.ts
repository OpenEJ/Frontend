import { createApp } from 'vue'
import { Quasar } from 'quasar'

// imports for icons
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
// quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
    plugins: {},
})

myApp.mount('#app')

