<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 控制台展示环境
    this.badge('Application', 'mofu-chat', '#1475b2');
    this.badge('Environment', process.env.NODE_ENV, '#42c02e');
  },
  methods: {
    badge(left, right, color) {
      const arg = [
        '%c '.concat(left, ' %c ').concat(right, ' '),
        'padding:1px;border-radius:3px 0 0 3px;color:#fff;background:'.concat(
          '#606060;',
        ),
        'padding:1px;border-radius:0 3px 3px 0;color:#fff;background:'.concat(
          color,
        ),
      ];
      console.log(...arg);
    },
  },
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
