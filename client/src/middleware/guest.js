export default function (next, store) {
	if (!store.state.activeEmployeeID) {
		next()
	} else {
		next('/')
	}
}
