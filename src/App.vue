<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
}
#app {
  height: 100vh;
}
.fullheight {
  min-height: 100vh;
}
</style>
