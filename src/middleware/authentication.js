export default function (next, store) {
	if (!store.state.activeUser) {
		next('/Login')
	} else {
		next()
	}
}
