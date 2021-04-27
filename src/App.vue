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
  overflow: overlay;
}
body {
  min-height: 100%;
}
#app {
  height: 100vh;
}
::selection {
  background-color: #32d0b0;
  color: #ffffff;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c1c1c1;
  border-color: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background: #777;
}
*.unselectable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
