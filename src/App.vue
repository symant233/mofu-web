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
        `%c ${left} %c ${right} `,
        'padding:1px;border-radius:3px 0 0 3px;color:#fff;background:#606060;',
        `padding:1px;border-radius:0 3px 3px 0;color:#fff;background:${color}`,
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
  background-color: rgb(79 79 79 / 30%);
  border-color: transparent;
  box-shadow: inset 1px 1px 0 rgb(0 0 0 / 10%), inset 0 -1px 0 rgb(0 0 0 / 7%);
  border-width: 1px 0px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgb(79 79 79 / 50%);
}
::-webkit-scrollbar-thumb:active {
  background-color: rgb(79 79 79 / 60%);
}
*.unselectable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
