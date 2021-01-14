<template>
  <div id="context">
    <group-title :group="group"></group-title>
    <wumpus :wumpus="wumpus"></wumpus>

    <message-box :msgs="msgs[channel]" :end="end">
      <button-loader
        :loader-method="loadMoreMessages"
        v-if="!noMoreMsg[channel] && showLoader && showInput"
      ></button-loader>
    </message-box>

    <chat-input :showInput="showInput"></chat-input>

    <typing></typing>
  </div>
</template>

<script>
import api from '../core/api';
import socket from '../core/socket';
import GroupTitle from '../components/Context/GroupTitle';
import MessageBox from '../components/Context/MessageBox';
import ButtonLoader from './Common/ButtonLoader';
import Wumpus from './Context/Wumpus';
import ChatInput from './Context/ChatInput';
import Typing from './Context/Typing';

export default {
  name: 'context',
  components: {
    GroupTitle,
    MessageBox,
    Wumpus,
    ButtonLoader,
    ChatInput,
    Typing,
  },
  props: {
    group: Object,
  },
  data() {
    return {
      showInput: true, // props
      msgs: {}, // props
      wumpus: false,
      noMoreMsg: {}, // props
      end: '', // props 用来滚动的id
      showLoader: false, // props
    };
  },
  computed: {
    channel() {
      return this.$route.params.channel;
    },
    messages() {
      return this.msgs[this.channel];
    },
  },

  methods: {
    async loadMoreMessages() {
      console.log('loading more');
      const before = this.messages ? this.messages[0].id : '';
      await this.listGroupMessages(before);
    },
    routerToMe() {
      this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
    },
    async listGroupMessages(beforeMsgId = '') {
      let rs;
      try {
        rs = await api.listGroupMessages(this.channel, beforeMsgId);
        this.end = rs[rs.length - 1].id;
        if (this.messages) {
          this.msgs[this.channel] = [...rs, ...this.messages];
        } else {
          this.$set(this.msgs, this.channel, rs);
        }
      } catch (err) {
        if (err.response.status === 404) this.routerToMe();
        // 没有更多消息, 关闭加载按钮
        if (err.response.status === 400) {
          this.$set(this.noMoreMsg, this.channel, true);
        }
        api.warn(err);
      }
    },
    listenMessages() {
      socket.on('new msg', (data) => {
        // socket 收到新消息 推入组件消息存储中
        this.msgs[data.channel].push(data);
      });
    },
    routerGroupChange() {
      if (this.messages !== undefined) {
        console.info('channel msgs not empty, skip api request.');
        return;
      } else if (this.channel === '@me') return;
      this.listGroupMessages();
    },
  },
  watch: {
    async $route(to, from) {
      if (to.params.channel === '@me') {
        this.showInput = false;
        this.wumpus = true;
      } else {
        this.showInput = true;
        this.wumpus = false;
      }
      await this.routerGroupChange();
    },

    messages() {
      if (this.messages && this.messages.length === 0) {
        this.showLoader = false;
      } else {
        this.showLoader = true;
      }
    },
  },
  mounted() {
    if (this.channel === '@me') {
      this.showInput = false;
      this.wumpus = true;
      return;
    }
    this.listGroupMessages();
    this.listenMessages(); // socket 监听
  },
};
</script>

<style lang="scss">
#context {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
article img {
  -webkit-user-drag: none;
}
</style>
