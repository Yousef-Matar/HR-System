export default function (next, store, to) {
	if (!store.state.activeEmployeeID) {
		next('/403')
	} else {
		if (store.state.activeEmployeeID != to.params.user) {
			next('/403')
		} else {
			next()
		}
	}
}
