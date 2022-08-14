<template>
  <div
    class="w-full h-12 items-center bg-background flex justify-between text-sm"
  >
    <router-link class="p-2 rounded-3xl shadow-md" to="/">Home </router-link>
    <span v-if="!getActiveUser()">
      <router-link class="p-2 rounded-3xl shadow-md" to="/Login"
        >Login
      </router-link>
      <router-link class="p-2 rounded-3xl shadow-md" to="/Register"
        >Register
      </router-link>
    </span>
    <span v-else>
      <router-link class="p-2 rounded-3xl shadow-md" to="/" @click="logout"
        >Logout
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    getActiveUser() {
      return this.$store.getters.getActiveUser;
    },
    getAllEmployees() {
      return this.$store.getters.getAllEmployees;
    },
    logout() {
      if (
        this.getActiveUser().attendance.find(
          (day) =>
            day.currentDay === new Date().toLocaleDateString() &&
            day.checkOutTime !== new Date().toLocaleTimeString()
        )
      ) {
        this.getAllEmployees()
          .find((user) => user.username === this.getActiveUser().username)
          .attendance.find(
            (day) =>
              day.currentDay === new Date().toLocaleDateString() &&
              day.checkOutTime !== new Date().toLocaleTimeString()
          ).checkOutTime = new Date().toLocaleTimeString();
      }
      this.$store.commit("setActiveUser", null);
      this.$store.commit("setAllEmployees", this.getAllEmployees());
    },
  },
};
</script>

<style></style>
