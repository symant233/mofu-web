<template>
  <div></div>
</template>

<script>
import Modal from '../Common/Modal';

export default {
  name: 'profile',
  components: { Modal },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {},
};
</script>

<style lang="scss"></style>
