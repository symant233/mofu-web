<template>
  <section class="hero is-light is-fullheight">
    <div class="container">
      <div id="loader">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '../core/api';

export default {
  name: 'mofu-auth',
  components: {},
  data() {
    return {};
  },
  methods: {
    async tryAuth() {
      try {
        const data = await api.myDetail();
        this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
      } catch (err) {
        api.warn(err);
        this.$router.push({ name: 'mofu-login' });
      }
    },
  },
  mounted() {
    this.tryAuth();
  },
};
</script>

<style scoped>
#loader {
  width: 500px;
  position: absolute;
  text-align: center;
  left: calc(50% - 250px);
  top: calc(50% - 10px);
}
#loader .square {
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 10px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  animation: bouncer cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.75s infinite
    alternate;
}
#loader .square:nth-child(5n + 1) {
  background: #0f9;
  animation-delay: 0;
}
#loader .square:nth-child(5n + 2) {
  background: #0cf;
  animation-delay: calc(0s + (0.1s * 1));
}
#loader .square:nth-child(5n + 3) {
  background: #93f;
  animation-delay: calc(0s + (0.1s * 2));
}
#loader .square:nth-child(5n + 4) {
  background: #f66;
  animation-delay: calc(0s + (0.1s * 3));
}
#loader .square:nth-child(5n + 5) {
  background: #fff35c;
  animation-delay: calc(0s + (0.1s * 4));
}
@keyframes bouncer {
  to {
    transform: scale(1.75) translateY(-20px);
  }
}
</style>
