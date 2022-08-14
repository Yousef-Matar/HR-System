<template>
  <div>
    <SideNavigation></SideNavigation>
  </div>
</template>

<script>
import SideNavigation from "@/components/navigation/SideNavigation";
export default {
  name: "App",
  components: { SideNavigation },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
