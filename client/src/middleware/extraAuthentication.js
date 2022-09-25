export default function (next, store) {
	if (!store.state.activeEmployee) {
		next('/403')
	} else {
		if (store.state.allEmployees.find((employee) => employee._id == store.state.activeEmployeeID).role == 'employee') {
			next('/403')
		} else {
			next()
		}
	}
}
