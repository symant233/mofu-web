<template>
  <section class="g-main">
    <navbar></navbar>
    <side-bar></side-bar>
    <context :group="groups[channel]"></context>
    <member-list :group="groups[channel]"></member-list>
    <warning></warning>
  </section>
</template>

<script>
import api from '../core/api';
import Context from '../components/Context';
import SideBar from '../components/SideBar';
import MemberList from '../components/MemberList';
import socket from '../core/socket';
import Warning from '../components/Common/Warning';
import Navbar from '../components/Navbar/NavBar';

export default {
  name: 'mofu-chat',
  components: { Context, SideBar, MemberList, Warning, Navbar },
  data() {
    return {};
  },
  methods: {
    async myGroups() {
      // 获取所有群组
      if (this.groups[this.channel]) return;
      try {
        const groups = {};
        const rs = await api.myGroups();
        rs.forEach((grp) => {
          // 设置 groups 的键值对 方便直接用 id 查找
          // this.$set(this.groups, grp.id, grp);
          groups[grp.id] = grp;
        });
        this.$store.commit('group/setGroups', groups);
      } catch (err) {
        if (err.response.status === 401) {
          // 身份验证失败 重定向到登陆页
          this.$router.push({ name: 'mofu-login' });
        }
        api.warn(err);
      }
    },
    async myDetail() {
      const data = await api.myDetail();
      this.$store.commit('user/setUser', data);
    },
    setWarn(message) {
      this.$store.dispatch('common/setWarn', String(message));
    },
  },
  beforeMount() {
    this.setApiToken(); // mixin
    if (Object.keys(this.groups).length === 0) this.myGroups();
    if (!this.user.id) this.myDetail();
  },
  mounted() {
    // 发送 token 进行 socket 验证
    const token = localStorage.getItem('token');
    if (!token) {
      this.setWarn('localStorage token not found!');
      this.$router.push({ name: 'mofu-login' });
    }
    socket.emit('auth', token);
    // socket.on('group join', (data) => {
    //   this.groupList.push(data);
    //   socket.emit('join a group', data.id);
    // });
  },
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style lang="scss">
.g-main {
  height: 100vh;
  display: grid;
  grid-template-columns: 3.6rem 16rem 1fr 15rem;
  grid-template-areas: 'nav-bar side-bar context member-list';
  background-color: #ffffff;
}
@media screen and (max-width: 925px) {
  .g-main {
    grid-template-columns: 3.6rem 15rem 1fr;
    grid-template-areas: 'nav-bar side-bar context';
  }
}
</style>
