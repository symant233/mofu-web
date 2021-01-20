<template>
  <span id="loader"></span>
</template>

<script>
// deprecated component

export default {
  name: 'scroll-loader',
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
    return {
      loading: false,
      size: 70,
    };
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
        threshold: 0.1,
      };
    },
    observer() {
      return new IntersectionObserver(this.load, this.options);
    },
  },
  watch: {
    loaderEnabled(newV, oldV) {
      if (newV === false) {
        console.log('[-] unobserve loader...');
        this.observer.unobserve(this.$el);
      } else if (newV === true) {
        console.log('[+] observing loader...');
        this.observer.observe(this.$el);
      }
    },
  },
};
</script>

<style lang="scss">
.loader {
  margin: auto;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 30px;
  height: 30px;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
