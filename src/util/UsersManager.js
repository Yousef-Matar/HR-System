import store from '@/store/index'
var UsersManager = {
	getAllUsers() {
		return store.getters.getAllEmployees()
	},
	getActiveUser() {
		return store.getters.getActiveUser()
	},
	getUser(userUsername) {
		return this.getAllUsers().find((user) => user.username === userUsername)
	},
	logout() {
		store.commit('setActiveUser', null)
	},
	setActiveUser(currentUser) {
		store.commit('setActiveUser', currentUser)
	},
	addUser(user) {
		store.commit('setAllEmployees', this.getAllUsers().concat([user]))
	},
	replaceUser(oldUser, updatedUser) {
		store.commit(
			'setAllEmployees',
			this.getAllUsers().map((user) => {
				user.username === oldUser.username ? updatedUser : user
			})
		)
	},
	deleteUser(selectedUser) {
		store.commit(
			'setAllEmployees',
			this.getAllUsers().filter((user) => user.username !== selectedUser.username)
		)
	},
}
export default UsersManager
