// Application
import App from '@/App'
// Styles
import '@/assets/css/form.css'
import '@/assets/css/general.css'
import '@/assets/css/scrollbar.css'
import '@/assets/css/sweetAlert.css'
import '@/assets/css/tailwind.css'
// Router
import router from '@/router'
// Store
import store from '@/store/index'
// import the fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// import specific icons
import { faBars, faBell, faCalendarAlt, faClock, faExclamationCircle, faExclamationTriangle, faFileArrowDown, faFileArrowUp, faFileContract, faHome, faMinus, faMultiply, faPlus, faSignIn, faSignOut, faSortDown, faSortUp, faUser, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
// import font awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Sweet Alerts
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

// Global Atoms
import NavigationAccordion from '@/components/navigation/util/NavigationAccordion'
import AppButton from '@/components/util/AppButton'
import AppDate from '@/components/util/AppDate'
import AppDropzone from '@/components/util/AppDropzone'
import AppFileDescription from '@/components/util/AppFileDescription'
import AppFileStatus from '@/components/util/AppFileStatus'
import AppInput from '@/components/util/AppInput'
import AppNotification from '@/components/util/AppNotification'
import AppSelect from '@/components/util/AppSelect'
import AppTable from '@/components/util/AppTable'
import AppTextarea from '@/components/util/AppTextarea'
import FormErrors from '@/components/util/FormErrors'
import ReusableModal from '@/components/util/ReusableModal'

// add icons to the library
library.add(
	// Notification
	faExclamationCircle,
	faBell,
	// Side Navigation
	faBars,
	// Remove File
	faMultiply,
	// Uploads
	faFileArrowUp,
	// HR Document
	faFileContract,
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
	// File Export
	faFileArrowDown,
	// Table Sorting
	faSortUp,
	faSortDown,
	// Error
	faExclamationTriangle,
	// Profile
	faUser
)
const app = createApp(App)
app.use(router)
app.use(store)
// SweetAlert Config
const options = {
	confirmButtonColor: '#18ffff',
	cancelButtonColor: '#ef4444',
	background: '#060b23',
	color: '#fff',
	cancelButtonTextColor: '#000',
}
app.use(VueSweetalert2, options)
// Global Components
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('NAccordion', NavigationAccordion)
app.component('VButton', AppButton)
app.component('VInput', AppInput)
app.component('VDate', AppDate)
app.component('VSelect', AppSelect)
app.component('VModal', ReusableModal)
app.component('VTable', AppTable)
app.component('FormErrors', FormErrors)
app.component('VTextarea', AppTextarea)
app.component('VDropzone', AppDropzone)
app.component('VFileDescription', AppFileDescription)
app.component('VNotification', AppNotification)
app.component('VFileStatus', AppFileStatus)

app.mount('#app')
