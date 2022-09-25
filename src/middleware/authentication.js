export default function (next, store) {
	if (!store.state.activeEmployee) {
		next('/Login')
	} else {
		next()
	}
}
