/* eslint-disable no-undef */
// Pages
import EmployeesCRUD from '@/pages/employees/AllEmployees'
import AttendancePage from '@/pages/employees/attendance/AttendancePage'
import DocumentPage from '@/pages/employees/documents/DocumentPage'
import VacationsCRUD from '@/pages/employees/vacations/AllVacations'
import MyVacations from '@/pages/employees/vacations/MyVacations'
import RequestVacation from '@/pages/employees/vacations/RequestVacation'
import AccessDenied from '@/pages/error/403Error'
import PageNotFound from '@/pages/error/404Error'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import RegisterPage from '@/pages/register/RegisterPage'
import WorkingHoursPage from '@/pages/workingHours/WorkingHoursPage'
// Store
import store from '@/store/index'
// Router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: HomePage,
		meta: { middleware: 'authentication' },
	},
	{
		path: '/Login',
		component: LoginPage,
		meta: { middleware: 'guest' },
	},
	{
		path: '/Register',
		component: RegisterPage,
		meta: { middleware: 'guest' },
	},
	{
		path: '/Hours',
		component: WorkingHoursPage,
		meta: { middleware: 'extraAuthentication' },
	},
	{
		path: '/Employees',
		component: EmployeesCRUD,
		meta: { middleware: 'extraAuthentication' },
	},
	{
		path: '/Documents',
		component: DocumentPage,
		meta: { middleware: 'authentication' },
	},
	{
		path: '/Attendance',
		component: AttendancePage,
		meta: { middleware: 'extraAuthentication' },
	},
	{
		path: '/Attendance/:ID',
		name: 'Attendance',
		component: AttendancePage,
		meta: { middleware: 'attendanceAuthentication' },
		props: true,
	},
	{
		path: '/Vacations',
		component: RequestVacation,
		meta: { middleware: 'authentication' },
	},
	{
		path: '/VacationRequests',
		component: MyVacations,
		meta: { middleware: 'authentication' },
	},
	{
		path: '/VacationApproval',
		component: VacationsCRUD,
		meta: { middleware: 'extraAuthentication' },
	},
	{
		path: '/403',
		component: AccessDenied,
	},
	{
		path: '/404',
		component: PageNotFound,
	},
	{
		path: '/:catchAll(.*)',
		component: PageNotFound,
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
router.beforeEach((to, _, next) => {
	if (to.meta.middleware) {
		const middleware = require(`./middleware/${to.meta.middleware}`)
		if (middleware) {
			middleware.default(next, store, to)
		} else {
			next()
		}
	} else {
		next()
	}
})
export default router
