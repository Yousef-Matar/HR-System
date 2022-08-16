var TimeConverter = {
  format_12_to_24(varTime) {
    const [time, modifier] = varTime.split(" ");
    let [hours, minutes] = time.split(":");
    minutes = parseInt(minutes);
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    minutes += parseInt(hours) * 60;
    return minutes;
  },
  difference_24_hours(startTime, endTime) {
    let startMinutes = this.format_12_to_24(startTime);
    let endMinutes = this.format_12_to_24(endTime);
    let minutes = endMinutes - startMinutes;

    return minutes;
  },
};
export default TimeConverter;
