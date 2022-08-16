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
import AttendanceManager from "@/util/AttendanceManager";
import UsersManager from "@/util/UsersManager";
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
    submit() {
      var currentUser = UsersManager.getUser(this.form.username);
      if (currentUser) {
        currentUser = AttendanceManager.userCheckIn(currentUser);
        this.$store.commit("setActiveUser", currentUser);
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
