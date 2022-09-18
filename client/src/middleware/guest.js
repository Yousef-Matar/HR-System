export default function (next, store) {
	if (!store.state.activeUser) {
		next()
	} else {
		next('/')
	}
}
