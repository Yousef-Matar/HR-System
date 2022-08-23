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
import { faCalendarAlt, faCaretDown, faCaretUp, faCheck, faClock, faClose, faExclamationTriangle, faHome, faMinus, faPlus, faSignIn, faSignOut, faSortDown, faSortUp, faUser, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
// import font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'

// Global Atoms
import NavigationAccordion from '@/components/navigation/util/NavigationAccordion'
import AppButton from '@/components/util/AppButton'
import AppInput from '@/components/util/AppInput'
import AppSelect from '@/components/util/AppSelect'
import AppTable from '@/components/util/AppTable'
import ReusableModal from '@/components/util/ReusableModal'

// add icons to the library
library.add(
	// Attendance
	faCalendarAlt,
	// Hours
	faClock,
	// All Employees
	faUsers,
	// Home
	faHome,
	// Add Employee & Register
	faUserPlus,
	// Sign In
	faSignIn,
	// Sign Out
	faSignOut,
	// Number Input Buttons
	faMinus,
	faPlus,
	// Dunno
	faCheck,
	// Dunno
	faCaretDown,
	// Dunno
	faCaretUp,
	// Error
	faExclamationTriangle,
	// Profile
	faUser,
	// Dunno
	faSortUp,
	// Dunno
	faSortDown,
	// Dunno
	faClose
)
const app = createApp(App)
app.use(router)
app.use(store)
// Global Components
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('NAccordion', NavigationAccordion)
app.component('VButton', AppButton)
app.component('VInput', AppInput)
app.component('VSelect', AppSelect)
app.component('VModal', ReusableModal)
app.component('VTable', AppTable)

app.mount('#app')
