import EmployeesService from '@/plugins/services/employeesService'
import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			activeEmployeeID: localStorage.getItem('Active Employee ID') === null ? '' : JSON.parse(localStorage.getItem('Active Employee ID')),
			allEmployees: [],
			/*allFiles:
				localStorage.getItem('All Files') === null
					? {
							uploadedFiles: [],
							requestedFiles: [],
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: JSON.parse(localStorage.getItem('All Files')),
			vacationRequests:
				localStorage.getItem('Vacation Requests') === null
					? [
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('Vacation Requests')),
			monthlyHours: localStorage.getItem('Monthly Hours') === null ? 40 : JSON.parse(localStorage.getItem('Monthly Hours')),
			activeUser: localStorage.getItem('Active User') === null ? null : JSON.parse(localStorage.getItem('Active User')),
			allHours:
				localStorage.getItem('All Hours') === null
					? [
							{
								year: new Date().getFullYear(),
								month: new Date().getMonth(),
								hours: 40,
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('All Hours')),*/
		}
	},

	mutations: {
		init(state) {
			localStorage.setItem('Active Employee ID', JSON.stringify(state.activeEmployeeID))
			EmployeesService.getAll()
		},
		setAllEmployees(state, payload) {
			state.allEmployees = payload
		},
		setActiveEmployeeID(state, payload) {
			state.activeUser = payload
		},
		/*setAllFiles(state, payload) {
			state.allFiles[payload.fileType].push(payload.file)
			localStorage.setItem('All Files', JSON.stringify(state.allFiles))
		},
		deleteFile(state, payload) {
			state.allFiles[payload.fileType] = state.allFiles[payload.fileType].filter((file) => file.ID != payload.fileID)
			localStorage.setItem('All Files', JSON.stringify(state.allFiles))
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
			localStorage.setItem('All Files', JSON.stringify(state.allFiles))
		},
		setVacationRequests(state, payload) {
			state.vacationRequests = payload
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
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
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
		},
		cancelVacationRequest(state, payload) {
			state.vacationRequests = state.vacationRequests.filter((request) => request.ID != payload)
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
		},
		setActiveUser(state, payload) {
			state.activeUser = payload
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
		},
		setMonthlyHours(state, payload) {
			state.monthlyHours = payload
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
		},
		setAllHours(state, payload) {
			state.allHours = payload
			localStorage.setItem('All Hours', JSON.stringify(state.allHours))
		},
		replaceUser(state, payload) {
			state.allEmployees = state.allEmployees.map((user) => (user.ID === payload.userID ? payload.updatedUser : user))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
		},*/
	},
})
export default store
