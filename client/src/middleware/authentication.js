export default function (next, store) {
	if (!store.state.activeEmployeeID) {
		next('/Login')
	} else {
		next()
	}
}
