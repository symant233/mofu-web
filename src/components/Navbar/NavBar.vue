<template>
  <div id="navbar">
    <!-- <circle-button></circle-button> -->
    <join-group></join-group>
  </div>
</template>

<script>
import JoinGroup from './JoinGroup';
import CircleButton from '../Plugins/CircleButton';

export default {
  name: 'navbar',
  components: { JoinGroup, CircleButton },
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
