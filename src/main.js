// Application
import App from '@/App.vue'
// Styles
import '@/assets/css/form.css'
import '@/assets/css/tailwind.css'
// Router
import router from '@/router'
// Store
import store from '@/store/index'
// import the fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// import specific icons
import { faCaretDown, faCaretUp, faCheck, faClose, faExclamationTriangle, faSortDown, faSortUp, faUser } from '@fortawesome/free-solid-svg-icons'
// import font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'

// Global Atoms
import AppButton from '@/components/util/AppButton'

// add icons to the library
library.add(faCheck, faCaretDown, faCaretUp, faExclamationTriangle, faUser, faSortUp, faSortDown, faClose)
const app = createApp(App)
app.use(router)
app.use(store)
// Global Components
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('VButton', AppButton)

app.mount('#app')
