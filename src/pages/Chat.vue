<template>
  <section class="light-color" id="main-container">
    <side-bar :groups="groupList"></side-bar>
    <context :group="groups[current]"></context>
    <member-list></member-list>
    <warning :show="showWarning" :warn="warnMessage"></warning>
  </section>
</template>

<script>
import api from '../core/api';
import Context from '../components/Context';
import SideBar from '../components/SideBar';
import MemberList from '../components/MemberList';
import socket from '../core/socket';
import Warning from '../components/Warning';

export default {
  name: 'mofu-chat',
  components: { Context, SideBar, MemberList, Warning },
  data() {
    return {
      current: this.$route.params.channel,
      groups: {},
      showWarning: false,
      warnMessage: '',
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
          this.$router.push({ name: 'mofu-login' });
        }
        api.warn(err);
      }
    },
  },
  beforeMount() {
    this.myGroups();
  },
  mounted() {
    // 发送 token 进行 socket 验证
    const token = this.$cookie.get('token');
    if (!token) {
      this.warnMessage =
        'cookie: token empty! => avoid localhost, use 127.0.0.1 instead.';
      console.error(this.warnMessage);
      this.showWarning = true;
    }
    socket.emit('auth', token);
  },
  watch: {
    showWarning() {
      setTimeout(() => {
        this.showWarning = false;
      }, 5600);
    },
  },
};
</script>

<style>
#main-container {
  margin: 0;
  height: 100%;
}

.light-color {
  background-color: #ffffff;
}
</style>
