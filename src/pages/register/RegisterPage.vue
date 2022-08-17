<template>
  <form @submit.prevent="submit" autocomplete="off">
    <div>
      <h1 class="text-2xl">Sign Up</h1>
      <div class="text-red-500 text-left mt-2 text-lg" v-if="error.show">
        <font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;{{
          error.message
        }}
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
    <div class="flex gap-8">
      <div class="inputGroup">
        <input
          v-model="form.firstName"
          id="firstName"
          placeholder=" "
          type="text"
          required="required"
        />
        <label for="firstName">First Name</label>
      </div>
      <div class="inputGroup">
        <input
          v-model="form.lastName"
          id="lastName"
          placeholder=" "
          type="text"
          required="required"
        />
        <label for="lastName">Last Name</label>
      </div>
    </div>
    <div class="flex gap-8">
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
      <div class="inputGroup">
        <input
          v-model="confirmPassword"
          id="confirmPassword"
          placeholder=" "
          type="password"
          required="required"
        />
        <label for="confirmPassword">Confirm Password</label>
      </div>
    </div>

    <v-button :type="'submit'" :text="'Sign Up'"></v-button>
    <v-button
      :type="'button'"
      :text="'Already have an account ?'"
      :method="
        () => {
          $router.push('/Login');
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
        firstName: "",
        lastName: "",
        role: "employee",
        hireDate: new Date().toLocaleDateString(),
        attendance: [],
      },
      confirmPassword: "",
    };
  },
  methods: {
    submit() {
      if (UsersManager.getUser(this.form.username)) {
        this.error.show = true;
        this.error.message = "Username is already in use.";
      } else if (this.form.password !== this.confirmPassword) {
        this.error.show = true;
        this.error.message = "Passwords do not match.";
      } else {
        var currentUser = this.form;
        currentUser = AttendanceManager.userCheckIn(currentUser);
        UsersManager.login(currentUser);
        UsersManager.addUser(currentUser);
        this.error.show = false;
        this.$router.push("/");
      }
    },
    resetForm() {
      this.form.username = "";
      this.form.password = "";
      this.error.show = false;
    },
  },
};
</script>

<style></style>
