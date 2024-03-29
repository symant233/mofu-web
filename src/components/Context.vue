<template>
  <div id="context">
    <group-title></group-title>
    <wumpus v-show="wumpus"></wumpus>

    <message-box :msgs="msgs[channel]" :end.sync="end" :key="channel">
      <scroll-loader
        :loader-method="loadMoreMessages"
        :loader-enabled="loaderEnabled"
        v-if="!noMoreMsg[channel] && showLoader && showInput"
      ></scroll-loader>
    </message-box>

    <chat-input :show-input="showInput"></chat-input>

    <typing></typing>
  </div>
</template>

<script>
import api from '../core/api';
import socket from '../core/socket';
import GroupTitle from './Context/GroupTitle';
import MessageBox from './Context/MessageBox';
import ScrollLoader from './Plugins/ScrollLoader';
import Wumpus from './Context/Wumpus';
import ChatInput from './Context/ChatInput';
import Typing from './Context/Typing';

export default {
  name: 'context',
  components: {
    GroupTitle,
    MessageBox,
    Wumpus,
    ScrollLoader,
    ChatInput,
    Typing,
  },
  data() {
    return {
      showInput: true, // props
      msgs: {}, // props
      wumpus: false,
      noMoreMsg: {}, // props
      end: '', // props 用来滚动的id
      showLoader: false, // props
      loaderEnabled: true,
    };
  },
  computed: {
    messages() {
      return this.msgs[this.channel];
    },
  },
  methods: {
    async loadMoreMessages() {
      this.loaderEnabled = false;
      const before = this.messages ? this.messages[0].id : '';
      await this.listMessages(before);
      this.$nextTick(() => {
        this.loaderEnabled = true;
      });
    },
    routerToMe() {
      this.$router.push({ name: 'mofu-chat', params: { channel: '@me' } });
    },
    async listMessages(beforeMsgId = '') {
      let rs;
      // 防止等待返回数据时切换频道
      const requestChannel = this.channel;
      const msgs = this.messages; // 当前频道的消息
      try {
        if (this.group.dm) {
          rs = await api.listDirectMessages(requestChannel, beforeMsgId);
        } else {
          rs = await api.listGroupMessages(requestChannel, beforeMsgId);
        }
        // 没有更多消息, 关闭加载按钮
        if (rs.length === 0) {
          // this.$toast.info('没有更多消息', { timeout: 1500 });
          this.$set(this.noMoreMsg, requestChannel, true);
          return;
        }
        this.end = rs[rs.length - 1].id;
        if (msgs) {
          this.msgs[requestChannel] = [...rs, ...msgs];
        } else {
          this.$set(this.msgs, requestChannel, rs);
        }
      } catch (err) {
        if (!err.response) return;
        if (err.response.status === 404) {
          this.$toast.warning('[404] 请求失败');
          this.routerToMe();
        }
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
        // messages 非空, 跳过 api 请求
        return;
      } else if (this.channel === '@me') return;
      this.listMessages();
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
    messages(newValue, oldValue) {
      if (newValue === undefined) {
        this.showLoader = false;
      } else if (newValue && newValue.length === 0) {
        this.showLoader = false;
      } else {
        this.showLoader = true;
      }
    },
    group(newV, oldV) {
      if (oldV === undefined) {
        // 本来放在 monted 只运行一次
        // 解决 this.group 是空无法访问 dm 属性
        this.listMessages();
      }
    },
  },
  mounted() {
    if (this.channel === '@me') {
      this.showInput = false;
      this.wumpus = true;
    }
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
