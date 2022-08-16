import store from "@/store/index";
var UsersManager = {
  getAllUsers() {
    return store.getters.getAllEmployees();
  },
  getActiveUser() {
    return store.getters.getActiveUser();
  },
  getUser(userUsername) {
    return this.getAllUsers().find((user) => user.username === userUsername);
  },
  logout() {
    store.commit("setActiveUser", null);
  },
  login(currentUser) {
    store.commit("setActiveUser", currentUser);
  },
};
export default UsersManager;
