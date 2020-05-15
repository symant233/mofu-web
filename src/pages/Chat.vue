<template>
  <section class="light-color" id="main-container">
    <side-bar></side-bar>
    <context></context>
    <member-list></member-list>
  </section>
</template>

<script>
import Context from '../components/Context';
import SideBar from '../components/SideBar';
import MemberList from '../components/MemberList';
import socket from '../core/socket';

export default {
  name: 'mofu-chat',
  components: { Context, SideBar, MemberList },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 发送 token 进行 socket 验证
    const token = this.$cookie.get('token');
    if (!token) console.error('cookie: token empty! => avoid localhost');
    socket.emit('auth', token);
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
