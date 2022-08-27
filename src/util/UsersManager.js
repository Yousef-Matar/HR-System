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
	getUsersBasedOnPermissions(userRole) {
		if (userRole == 'SuperAdmin') {
			return this.getAllUsers()
		} else if (userRole == 'admin') {
			return this.getAllUsers().filter((user) => user.role !== 'SuperAdmin')
		} else if (userRole == 'human resources') {
			return this.getAllUsers().filter((user) => user.role !== 'SuperAdmin' && user.role !== 'admin')
		}
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
	replaceUser(oldUserUsername, updatedUser) {
		store.commit('replaceUser', { username: oldUserUsername, updatedUser: updatedUser })
	},
	deleteUser(username) {
		store.commit(
			'setAllEmployees',
			this.getAllUsers().filter((user) => user.username !== username)
		)
	},
}
export default UsersManager
