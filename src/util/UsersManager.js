import store from '@/store/index'

var UsersManager = {
	getAllUsers() {
		return store.state.allEmployees
	},
	getActiveUser() {
		return store.state.activeUser
	},
	getUser(userUsername) {
		return this.getAllUsers().find((user) => user.username === userUsername)
	},
	getSuperAdmin() {
		return this.getAllUsers().find((user) => user.role === 'SuperAdmin')
	},
	logout() {
		store.commit('setActiveUser', null)
	},
	setAllUsers() {
		store.commit('setAllEmployees', this.getAllUsers())
	},
	setActiveUser(currentUser) {
		store.commit('setActiveUser', currentUser)
	},
	addUser(user) {
		store.commit('setAllEmployees', this.getAllUsers().concat([user]))
	},
	replaceUser(oldUser, updatedUser) {
		store.commit('replaceUser', {username:oldUser.username,updatedUser:updatedUser})
	},
	deleteUser(selectedUser) {
		store.commit(
			'setAllEmployees',
			this.getAllUsers().filter((user) => user.username !== selectedUser.username)
		)
	},
}
export default UsersManager
