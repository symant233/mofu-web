<template>
  <section class="g-main">
    <navbar></navbar>
    <side-bar></side-bar>
    <context></context>
    <member-list></member-list>
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
    async myChannels() {
      if (this.group) return;
      try {
        // 获取所有群组
        const groups = {};
        const rs = await api.listMyGroups();
        rs.forEach((grp) => {
          groups[grp.id] = { ...grp, dm: false }; // 类型1为群组
        });
        // 获取私聊
        const rl = await api.listMyRelations();
        rl.forEach((r) => {
          groups[r.id] = { ...r, dm: true }; // 类型2为私聊
        });
        this.$store.commit('group/setGroups', groups);
      } catch (err) {
        if (err.response.status === 401) {
          // 身份验证失败 重定向到登陆页
          this.$toast.error('身份验证失败,请重新登陆');
          this.$router.push({ name: 'mofu-login' });
        }
        api.warn(err);
      }
    },
    async myDetail() {
      const data = await api.myDetail();
      this.$store.commit('user/setUser', data);
    },
    socketListener() {
      socket.on('group join', (group) => {
        this.$store.commit('group/addGroup', { ...group, dm: false });
        socket.emit('join a group', group.id);
      });
      socket.on('relation created', (relation) => {
        this.$store.commit('group/addGroup', { ...relation, dm: true });
        socket.emit('join a relation', relation.id);
      });
      socket.on('news', (message) => {
        this.$toast(message);
      });
      socket.on('disconnect', () => {
        this.$toast.warning('Socket已断开');
      });
      socket.on('reconnect', () => {
        socket.emit('auth', localStorage.getItem('token'));
        this.$toast.success('Socket已重连');
      });
    },
  },
  beforeMount() {
    this.setApiToken(); // mixin
    if (Object.keys(this.groups).length === 0) this.myChannels();
    if (!this.user.id) this.myDetail();
  },
  mounted() {
    // 发送 token 进行 socket 验证
    const token = localStorage.getItem('token');
    if (!token) {
      // this.setWarn('localStorage token not found!');
      this.$toast.error('localStorage token not found!');
      this.$router.push({ name: 'mofu-login' });
    }
    socket.emit('auth', token);
    this.socketListener();
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
