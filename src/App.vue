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
  overflow: hidden;
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
::selection {
  background-color: #32d0b0;
  color: #ffffff;
}
</style>
