<template>
  <div
    class="w-full h-12 items-center bg-background flex justify-between text-sm"
  >
    <router-link class="p-2 rounded-3xl shadow-md" to="/">Home </router-link>
    <span v-if="getActiveUser()">
      <router-link class="p-2 rounded-3xl shadow-md" to="/" @click="logout"
        >Logout
      </router-link>
    </span>
    <span v-else>
      <router-link class="p-2 rounded-3xl shadow-md" to="/Login"
        >Login
      </router-link>
      <router-link class="p-2 rounded-3xl shadow-md" to="/Register"
        >Register
      </router-link>
    </span>
  </div>
</template>

<script>
import UsersManager from "@/util/UsersManager";
import AttendanceManager from "@/util/AttendanceManager";
export default {
  methods: {
    getActiveUser() {
      return UsersManager.getActiveUser();
    },
    logout() {
      AttendanceManager.userCheckOut(this.getActiveUser());
      UsersManager.logout();
    },
  },
};
</script>

<style></style>
