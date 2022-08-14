<template>
  <div>
    <TopNavigation></TopNavigation>
    <router-view class="mt-14"></router-view>
  </div>
</template>

<script>
import TopNavigation from "@/components/navigation/TopNavigation";
export default {
  name: "App",
  components: { TopNavigation },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #18ffff;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right,#38A2D7,#561139);
}
</style>
