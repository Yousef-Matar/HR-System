import store from "@/store/index";
import TimeConverter from "@/util/TimeConverter";
var HoursManager = {
  getMonthlyHours() {
    return store.getters.getMonthlyHours();
  },
  calculateRemaingHours(user) {
    var monthlyHours = this.getMonthlyHours();
    var currentMonthAttendance = user.attendance.filter(
      (attendance) =>
        attendance.currentDay.slice(
          attendance.currentDay.lastIndexOf("/") + 1
        ) == new Date().getFullYear() &&
        attendance.currentDay.slice(0, attendance.currentDay.indexOf("/")) ==
          new Date().getMonth() + 1
    );

    var totalMinutes = 0;
    currentMonthAttendance.forEach((day) => {
      day.time.forEach((check) => {
        if (check.checkInTime && check.checkOutTime) {
          totalMinutes += TimeConverter.difference_24_hours(
            check.checkInTime,
            check.checkOutTime
          );
        }
      });
    });

    return (monthlyHours - totalMinutes / 60).toFixed(2);
  },
};
export default HoursManager;
