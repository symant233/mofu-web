<template>
  <div id="button-loader" v-if="loaderEnabled" @click="loaderMethod">
    加载更多
  </div>
</template>

<script>
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
}
</style>
