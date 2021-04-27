<template>
  <div id="navbar">
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger" style="margin:auto;">
        <figure id="user-avatar" aria-haspopup="true" aria-controls="mofu-menu">
          <img :src="user.avatar" />
        </figure>
      </div>
      <div class="dropdown-menu" id="mofu-menu" role="menu">
        <div class="dropdown-content">
          <a class="dropdown-item" @click="toggleProfile">
            📑 账号资料
          </a>
          <a class="dropdown-item" @click="auditPage">
            🔒 审计日志
          </a>
          <hr class="dropdown-divider" />
          <a class="dropdown-item" @click="logIn">
            🔄 切换用户
          </a>
          <a class="dropdown-item" @click="logOut">
            ❎ 登出
          </a>
          <hr class="dropdown-divider" />
          <div class="dropdown-item">
            🌟 在<code>mofu</code>的第 <b>{{ days }}</b> 天
          </div>
        </div>
      </div>
    </div>

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
    days() {
      const ms = Date.now() - new Date(this.user.since).getTime();
      return Math.floor(ms / 1000 / 60 / 60 / 24);
    },
  },
  methods: {
    toggleProfile() {
      this.showProfile = !this.showProfile;
    },
    logIn() {
      window.location.href = '/login';
    },
    logOut() {
      localStorage.setItem('token', '');
      window.location.href = '/login';
    },
    auditPage() {
      this.$router.push({ name: 'mofu-audit' });
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
#mofu-menu {
  margin-left: 10px;
  padding-top: 0px;
}
</style>
