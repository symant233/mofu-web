<template>
  <div id="navbar"></div>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style lang="scss">
#navbar {
  background-color: #e3e5e8;
}
</style>
