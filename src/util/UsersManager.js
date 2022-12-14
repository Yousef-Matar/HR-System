import store from '@/store/index'

var UsersManager = {
	getUserID() {
		return this.getAllUsers().length == 0 ? 1 : this.getAllUsers()[this.getAllUsers().length - 1].ID + 1
	},
	getAllUsers() {
		return store.state.allEmployees
	},
	getActiveUser() {
		return store.state.activeUser
	},
	getUserByUsername(userUsername) {
		return this.getAllUsers().find((user) => user.username == userUsername)
	},
	getUserByID(userID) {
		return this.getAllUsers().find((user) => user.ID == userID)
	},
	getSuperAdmin() {
		return this.getAllUsers().find((user) => user.role == 'SuperAdmin')
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
	changeUserYearlyVacations(vacationRequest) {
		var updatedUser = this.getUserByID(vacationRequest.requestedBy)
		if (updatedUser.yearlyVacation - vacationRequest.duration >= 0) {
			updatedUser.yearlyVacation = updatedUser.yearlyVacation - vacationRequest.duration
			this.replaceUser(updatedUser.ID, updatedUser)
			return true
		} else {
			return false
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
	replaceUser(userID, updatedUser) {
		store.commit('replaceUser', { userID: userID, updatedUser: updatedUser })
	},
}
export default UsersManager
