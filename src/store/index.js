import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
	state() {
		return {
			allFiles: {
				uploadedFiles: [],
				requestedFiles: [],
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			},
			vacationRequests: [
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			],
			monthlyHours: 40,
			activeUser: null,
			allHours: [
				{
					year: new Date().getFullYear(),
					month: new Date().getMonth(),
					hours: 40,
				},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			],
			allEmployees: [
				{
					ID: 1,
					username: 'SuperAdmin',
					password: 'SuperAdmin',
					firstName: 'SuperAdminFirstName',
					lastName: 'SuperAdminLastName',
					role: 'SuperAdmin',
					status: 'active',
					yearlyVacation: 21,
					hireDate: new Date().toLocaleDateString(),
					attendance: [],
				},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
			],
		}
	},

	mutations: {
		init(state) {
			if (new Date().getDate() == 1 && new Date().getMonth() == 1 && new Date().getFullYear() >= new Date().getFullYear()) {
				state.allEmployees.forEach((employee) => {
					employee.yearlyVacation = 21
				})
			}
			if (!state.allHours.find((element) => element.month == new Date().getMonth() && element.year == new Date().getFullYear())) {
				state.allHours.push({
					year: new Date().getFullYear(),
					month: new Date().getMonth(),
					hours: state.monthlyHours,
				})
			}
		},
		setAllEmployees(state, payload) {
			state.allEmployees = payload
		},
		setAllFiles(state, payload) {
			state.allFiles[payload.fileType].push(payload.file)
		},
		deleteFile(state, payload) {
			state.allFiles[payload.fileType] = state.allFiles[payload.fileType].filter((file) => file.ID != payload.fileID)
		},
		changeFileRequestStatus(state, payload) {
			state.allFiles.requestedFiles = state.allFiles.requestedFiles.map((request) =>
				request.ID === payload.requestID
					? {
							ID: request.ID,
							userID: request.userID,
							handledBy: payload.handler,
							handleDate: new Date().toLocaleDateString(),
							requestedFile: payload.requestedFile,
							requestDate: request.requestDate,
							documentType: request.documentType,
							status: payload.status,
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: request
			)
		},
		setVacationRequests(state, payload) {
			state.vacationRequests = payload
		},
		changeVacationRequestStatus(state, payload) {
			state.vacationRequests = state.vacationRequests.map((request) =>
				request.ID === payload.requestID
					? {
							ID: request.ID,
							requestedBy: request.requestedBy,
							handledBy: payload.handler,
							from: request.from,
							till: request.till,
							duration: request.duration,
							status: payload.status,
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: request
			)
		},
		cancelVacationRequest(state, payload) {
			state.vacationRequests = state.vacationRequests.filter((request) => request.ID != payload)
		},
		setActiveUser(state, payload) {
			state.activeUser = payload
		},
		setMonthlyHours(state, payload) {
			state.monthlyHours = payload
		},
		setAllHours(state, payload) {
			state.allHours = payload
		},
		replaceUser(state, payload) {
			state.allEmployees = state.allEmployees.map((user) => (user.ID === payload.userID ? payload.updatedUser : user))
		},
	},
	plugins: [createPersistedState()],
})
export default store
