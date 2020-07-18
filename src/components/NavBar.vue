<template>
  <div id="navbar">
    <!-- join group modal -->
    <join-group></join-group>
  </div>
</template>

<script>
import JoinGroup from './Navbar/JoinGroup';

export default {
  name: 'navbar',
  components: { JoinGroup },
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
