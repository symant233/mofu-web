<template>
  <div class="loader">
    <svg viewBox="25 25 50 50" class="loader_svg" :style="size">
      <circle cx="50" cy="50" r="20" class="loader_circle"></circle>
    </svg>
  </div>
</template>

<script>
// modified from: https://github.com/molvqingtai/vue-scroll-loader

export default {
  name: 'scroll-loader',
  props: {
    'loader-method': {
      type: Function,
      required: true,
    },
    'loader-distance': {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      size: 70,
    };
  },
  computed: {
    options() {
      return {
        root: document.body,
        rootMargin: `0px 0px ${this.loaderDistance}px 0px`,
        threshold: 1.0,
      };
    },
    observer() {
      return new IntersectionObserver(this.loaderMethod, this.options);
    },
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  activated() {
    this.observer.observe(this.$el);
  },
  deactivated() {
    this.observer.unobserve(this.$el);
  },
  beforeDestroy() {
    this.observer.unobserve(this.$el);
  },
};
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  &_svg {
    transform-origin: center;
    animation: rotate 2s linear infinite;
  }
  &_circle {
    color: #cccccc;
    fill: none;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
