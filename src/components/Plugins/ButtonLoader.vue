<template>
  <div id="button-loader" @click="loaderMethod" class="unselectable">
    加载更多
  </div>
</template>

<script>
// deprecated component
export default {
  name: 'button-loader',
  props: {
    'loader-method': {
      type: Function,
      required: true,
    },
    'loader-enabled': {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#button-loader {
  color: darkturquoise;
  padding: 0.5rem 0;
  text-align-last: center;
  &:hover {
    background-color: #fffeee;
  }
}
</style>
