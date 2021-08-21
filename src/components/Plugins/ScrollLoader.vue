<template>
  <div id="loader">
    <span id="loading"></span>
  </div>
</template>

<script>
export default {
  name: 'scroll-loader',
  props: {
    'loader-method': {
      type: Function,
      required: true,
    },
    'loader-enabled': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      size: 70,
    };
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  methods: {
    async load(entries, observer) {
      if (this.loading === true) return;
      if (entries[0].intersectionRatio <= 0) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      await this.loaderMethod(observer);
    },
  },
  computed: {
    options() {
      return {
        root: document.body,
        rootMargin: '0px',
        threshold: 0.7,
      };
    },
    observer() {
      return new IntersectionObserver(this.load, this.options);
    },
  },
  watch: {
    loaderEnabled(newV, oldV) {
      if (newV === false) {
        this.observer.unobserve(this.$el);
      } else if (newV === true) {
        this.observer.observe(this.$el);
      }
    },
  },
};
</script>

<style lang="scss">
#loader {
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  #loading {
    width: 28px;
    height: 28px;
    display: inline-block;
    border: 4px solid rgba(189, 189, 189, 0.25);
    border-left-color: rgba(3, 155, 229, 0.8);
    border-top-color: rgba(3, 155, 229, 0.9);
    border-radius: 50%;
    animation: loading-rotate 600ms infinite linear;
  }
}
@keyframes loading-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>
