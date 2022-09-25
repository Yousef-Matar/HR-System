export default function (next, store, to) {
	if (!store.state.activeUser) {
		next('/403')
	} else {
		if (store.state.activeUser.ID != to.params.ID) {
			next('/403')
		} else {
			next()
		}
	}
}
