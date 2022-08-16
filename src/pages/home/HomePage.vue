<template>
  <div v-if="getActiveUser()">
    <UserSummary></UserSummary>
  </div>
  <div v-else class="center bg-background p-10 w-max rounded-3xl">
    <h1 class="text-6xl">Welcome to HR-System</h1>
  </div>
</template>

<script>
import UsersManager from "@/util/UsersManager";
import UserSummary from "@/components/dashboard/UserSummary";

export default {
  components: { UserSummary },
  methods: {
    getActiveUser() {
      return UsersManager.getActiveUser();
    },
  },
};
</script>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
