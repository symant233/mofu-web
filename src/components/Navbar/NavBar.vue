<template>
  <div id="navbar">
    <figure id="user-avatar" @click="toggleProfile">
      <img :src="user.avatar" />
    </figure>
    <modal :show-modal.sync="showProfile">
      <profile></profile>
    </modal>

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
import Modal from '../Common/Modal';
import JoinGroup from './JoinGroup';
import Profile from './Profile';

export default {
  name: 'navbar',
  components: { JoinGroup, Profile, Modal },
  data() {
    return {
      showProfile: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    toggleProfile() {
      this.showProfile = !this.showProfile;
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
#user-avatar {
  margin: 9px auto;
  width: 36px;
  height: 36px;
  & img {
    border-radius: 50%;
  }
}
</style>
