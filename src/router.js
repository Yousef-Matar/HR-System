/* eslint-disable no-undef */
import store from '@/store/index'
import { createRouter, createWebHistory } from 'vue-router'
// Pages
import AccessDenied from '@/pages/error/403Error'
import PageNotFound from '@/pages/error/404Error'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import RegisterPage from '@/pages/register/RegisterPage'
const routes = [
	{
		path: '/',
		component: HomePage,
	},
	{
		path: '/Login',
		component: LoginPage,
	},
	{
		path: '/Register',
		component: RegisterPage,
	},
	{
		path: '/403',
		component: AccessDenied,
		// meta: { middleware: "authentication" },
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
			middleware.default(next, store)
		} else {
			next()
		}
	} else {
		next()
	}
})
export default router
