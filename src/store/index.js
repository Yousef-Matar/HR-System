import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      monthlyHours:
        localStorage.getItem("Monthly Hours") === null
          ? 40
          : JSON.parse(localStorage.getItem("Monthly Hours")),
      activeUser:
        localStorage.getItem("Active User") === null
          ? null
          : JSON.parse(localStorage.getItem("Active User")),
      allEmployees:
        localStorage.getItem("Employees") === null
          ? [
              {
                username: "admin",
                password: "admin",
                role: "admin",
                hireDate: new Date().toLocaleDateString(),
                attendance: [],
              },
            ]
          : JSON.parse(localStorage.getItem("Employees")),
    };
  },

  mutations: {
    setAllEmployees(state, payload) {
      state.allEmployees = payload;
      localStorage.setItem("Employees", JSON.stringify(state.allEmployees));
      state.allEmployees = JSON.parse(localStorage.getItem("Employees"));
    },
    setActiveUser(state, payload) {
      state.activeUser = payload;
      localStorage.setItem("Active User", JSON.stringify(state.activeUser));
    },
    setMonthlyHours(state, payload) {
      state.monthlyHours = payload;
      localStorage.setItem("Monthly Hours", JSON.stringify(state.monthlyHours));
    },
  },
  getters: {
    getActiveUser(state) {
      return state.activeUser;
    },
    getAllEmployees(state) {
      return state.allEmployees;
    },
    findUser: (state) => (username, password) => {
      return state.allEmployees.find(
        (user) => user.username === username && user.password === password
      );
    },
    findTodayAttendance: (state) => (username) => {
      return state.allEmployees
        .find((user) => user.username === username)
        .attendance.find(
          (day) => day.currentDay === new Date().toLocaleDateString()
        );
    },
    findCurrentAttendanceCheckin: (state) => (username) => {
      return state.allEmployees
        .find((user) => user.username === username)
        .attendance.find(
          (day) =>
            day.currentDay === new Date().toLocaleDateString() &&
            day.checkInTime === null
        );
    },
  },
});
export default store;
