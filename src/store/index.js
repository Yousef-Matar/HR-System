import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			allFiles:
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
					: JSON.parse(localStorage.getItem('All Hours')),
			allEmployees:
				localStorage.getItem('Employees') === null
					? [
							{
								ID: 1,
								username: 'SuperAdmin',
								password: 'SuperAdmin',
								firstName: 'SuperAdmin First Name',
								lastName: 'SuperAdmin Last Name',
								role: 'SuperAdmin',
								status: 'active',
								yearlyVacation: 21,
								hireDate: new Date().toLocaleDateString(),
								attendance: [],
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('Employees')),
		}
	},

	mutations: {
		init(state) {
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
			localStorage.setItem('All Files', JSON.stringify(state.allFiles))
			if (new Date().getDate() == 1 && new Date().getMonth() == 1 && new Date().getFullYear() >= new Date().getFullYear()) {
				state.allEmployees.forEach((employee) => {
					employee.yearlyVacation = 21
				})
			}
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			if (state.allHours.find((element) => element.month == new Date().getMonth() && element.year == new Date().getFullYear())) {
				localStorage.setItem('All Hours', JSON.stringify(state.allHours))
			} else {
				state.allHours.push({
					year: new Date().getFullYear(),
					month: new Date().getMonth(),
					hours: state.monthlyHours,
				})
				localStorage.setItem('All Hours', JSON.stringify(state.allHours))
			}
		},
		setAllEmployees(state, payload) {
			state.allEmployees = payload
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
		},
		setAllFiles(state, payload) {
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
							requestedFile: request.requestedFile,
							requestDate: request.requestDate,
							documentType: request.documentType,
							status: payload.status,
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: request
			)
			localStorage.setItem('All Files', JSON.stringify(state.vacationRequests))
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
		},
	},
})
export default store
