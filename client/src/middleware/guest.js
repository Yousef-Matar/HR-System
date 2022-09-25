export default function (next, store) {
	if (!store.state.activeEmployee) {
		next()
	} else {
		next('/')
	}
}
