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
      localStorage.setItem("Employees", JSON.stringify(state.allEmployees));
      state.allEmployees = JSON.parse(localStorage.getItem("Employees"));
      state.activeUser = payload;
      localStorage.setItem("Active User", JSON.stringify(state.activeUser));
    },
    setMonthlyHours(state, payload) {
      state.monthlyHours = payload;
      localStorage.setItem("Monthly Hours", JSON.stringify(state.monthlyHours));
    },
    updateActiveUserCheckOut(state, payload) {
      var newUsers = state.allEmployees.filter(
        (user) => user === state.activeUser
      );
      state.activeUser = payload;
      newUsers.push(state.activeUser);
      localStorage.setItem("Employees", JSON.stringify(newUsers));
      localStorage.setItem("Active User", JSON.stringify(state.activeUser));
      state.allEmployees = JSON.parse(localStorage.getItem("Employees"));
    },
  },
  getters: {
    getMonthlyHours: (state) => () => state.monthlyHours,
    getAllEmployees: (state) => () => state.allEmployees,
    getActiveUser: (state) => () => state.activeUser,
  },
});
export default store;
