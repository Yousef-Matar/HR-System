<template>
  <form @submit.prevent="submit" autocomplete="off">
    <div>
      <h1 class="text-2xl">Login</h1>
      <div class="text-red-500 text-left mt-2 text-lg" v-if="error.show">
        {{ error.message }}
      </div>
    </div>
    <div class="inputGroup">
      <input
        v-model="form.username"
        id="username"
        placeholder=" "
        type="text"
        required="required"
      />
      <label for="username">Username</label>
    </div>
    <div class="inputGroup">
      <input
        v-model="form.password"
        id="password"
        placeholder=" "
        type="password"
        required="required"
      />
      <label for="password">Password</label>
    </div>

    <v-button :type="'submit'" :text="'Log In'"></v-button>
    <v-button
      :type="'button'"
      :text="'Register'"
      :method="
        () => {
          $router.push('/Register');
        }
      "
    ></v-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      error: {
        show: false,
        message: "Invalid username or password.",
      },
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    findUser() {
      return this.$store.getters.findUser(
        this.form.username,
        this.form.password
      );
    },
    findCurrentDay() {
      return this.$store.getters.findTodayAttendance(this.form.username);
    },
    dayCheckin() {
      return this.$store.getters.findCurrentAttendanceCheckin(
        this.form.username
      );
    },
    checkIn() {
      if (!this.findCurrentDay()) {
        this.findUser().attendance.push({
          currentDay: new Date().toLocaleDateString(),
          checkInTime: new Date().toLocaleTimeString(),
          checkOutTime: new Date().toLocaleTimeString(),
        });
      } else if (this.dayCheckin()) {
        this.dayCheckin().checkInTime = new Date().toLocaleTimeString();
      }
    },
    submit() {
      if (this.findUser()) {
        this.checkIn();
        this.$store.commit("setActiveUser", this.findUser());
        this.$store.commit(
          "setAllEmployees",
          this.$store.getters.getAllEmployees
        );
        this.error.show = false;
        this.$router.push("/");
      } else {
        this.error.show = true;
      }
    },
  },
};
</script>

<style></style>
