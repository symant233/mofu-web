<template>
  <section class="light-color" id="main-container">
    <context></context>
  </section>
</template>

<script>
import Context from '../components/Context';

export default {
  name: 'mofu-chat',
  components: { Context },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style>
#main-container {
  margin: 0;
  height: 100%;
}

.light-color {
  background-color: #ffffff;
}
</style>
