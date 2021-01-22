<template>
  <div id="navbar">
    <div class="navbar-item">
      <font-awesome-icon icon="comment" />
    </div>
    <div class="navbar-item">
      <font-awesome-icon icon="address-book" />
    </div>
    <join-group></join-group>
  </div>
</template>

<script>
import JoinGroup from './JoinGroup';

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
  display: flex;
  flex-direction: column;
  background-color: #e3e5e8;
}
.navbar-item {
  margin: 0px auto;
  font-size: 1.5em;
  height: 52px;
}
.navbar-active {
  color: #4db6ac;
}
</style>
