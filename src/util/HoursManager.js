import store from "@/store/index";
var HoursManager = {
  getMonthlyHours() {
    return store.getters.getMonthlyHours();
  },
};
export default HoursManager;
