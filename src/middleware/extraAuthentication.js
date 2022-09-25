export default function (next, store) {
	if (!store.state.activeEmployee) {
		next('/403')
	} else {
		if (store.state.activeEmployee.role == 'employee') {
			next('/403')
		} else {
			next()
		}
	}
}
