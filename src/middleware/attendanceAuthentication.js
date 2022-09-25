export default function (next, store, to) {
	if (!store.state.activeEmployee) {
		next('/403')
	} else {
		if (store.state.activeEmployee._id != to.params.ID) {
			next('/403')
		} else {
			next()
		}
	}
}
