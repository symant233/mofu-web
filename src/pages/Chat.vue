<template>
  <section class="g-main">
    <navbar></navbar>
    <side-bar :groups="groupList"></side-bar>
    <context :group="groups[current]"></context>
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
import Warning from '../components/Warning';
import Navbar from '../components/Navbar';

export default {
  name: 'mofu-chat',
  components: { Context, SideBar, MemberList, Warning, Navbar },
  data() {
    return {
      current: this.$route.params.channel,
      groups: {},
      groupList: [],
    };
  },
  methods: {
    async myGroups() {
      // 获取所有群组
      if (this.groups[this.current]) return;
      try {
        const rs = await api.myGroups();
        this.groupList = rs;
        rs.forEach((group) => {
          // 设置 groups 的键值对 方便直接用 id 查找
          this.$set(this.groups, group.id, group);
        });
      } catch (err) {
        if (err.response.status === 401) {
          // 身份验证失败 重定向到登陆页
          this.$router.push({ name: 'mofu-login' });
        }
        api.warn(err);
      }
    },
    setWarn(message) {
      this.$store.dispatch('common/setWarn', String(message));
    },
  },
  beforeMount() {
    this.myGroups();
  },
  mounted() {
    // 发送 token 进行 socket 验证
    const token = this.$cookie.get('token');
    if (!token) {
      const str =
        'cookie: token empty! => avoid localhost, use 127.0.0.1 instead.';
      this.setWarn(str);
      console.error(str);
    }
    socket.emit('auth', token);
    socket.on('group join', (data) => {
      this.groupList.push(data);
      socket.emit('join a group', data.id);
    });
  },
  watch: {
    $route(to, from) {
      this.current = to.params.channel;
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
