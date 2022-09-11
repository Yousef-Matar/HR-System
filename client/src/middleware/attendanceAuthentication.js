export default function (next, store, to) {
	if (!store.state.activeUser) {
		next('/403')
	} else {
		if (store.state.activeUser.username !== to.params.username) {
			console.log(store.state.activeUser.username)
			console.log(to.params.username)
			next('/403')
		} else {
			next()
		}
	}
}
