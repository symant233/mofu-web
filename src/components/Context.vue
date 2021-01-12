<template>
  <div id="context">
    <group-title :group="group"></group-title>
    <wumpus :wumpus="wumpus"></wumpus>

    <message-box :msgs="msgs[channel]" :end="end">
      <button-loader
        :loader-method="loadMoreMessages"
        v-if="!noMoreMsg[channel] && showLoader"
      ></button-loader>
    </message-box>

    <div id="input" class="field has-addons" v-if="showInput">
      <div class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="Text..."
          v-model="newMessage"
          @keyup.enter="createMessage"
          :disabled="inputDisabled"
        />
      </div>
      <div class="control">
        <a
          class="button is-info"
          @click="createMessage"
          :disabled="inputDisabled"
        >
          Enter
        </a>
      </div>
    </div>

    <transition name="fade">
      <span class="tag is-warning is-light" id="typing" v-if="typing"
        >typing: {{ typing }}</span
      >
    </transition>
  </div>
</template>

<script>
import api from '../core/api';
import socket from '../core/socket';
import GroupTitle from '../components/Context/GroupTitle';
import MessageBox from '../components/Context/MessageBox';
import ButtonLoader from './Common/ButtonLoader';
import Wumpus from './Context/Wumpus';

export default {
  name: 'context',
  components: { GroupTitle, MessageBox, Wumpus, ButtonLoader },
  props: {
    group: Object,
  },
  data() {
    return {
      showInput: true,
      msgs: {},
      newMessage: '',
      inputDisabled: false,
      wumpus: false,
      typingList: [],
      timeout: 0,
      stopTyping: true,
      noMoreMsg: {},
      end: '', // 用来滚动的id
      showLoader: false,
    };
  },
  computed: {
    typing() {
      // 多人同时输入显示的提示框内容
      let str = '';
      const l = this.typingList;
      if (l.length !== 0) {
        if (l.length === 1) {
          str += l[0];
        } else if (l.length >= 2) {
          str += `${l[0]}, ${l[1]}`;
          if (l.length !== 2) str += ' and more';
        }
      }
      return str;
    },
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
    async createMessage() {
      // 用户发送消息
      if (!this.newMessage) return; // 禁止发送空内容
      this.inputDisabled = true;
      try {
        const rs = await api.createGroupMessage(this.channel, this.newMessage);
        // rs returns message object
        this.newMessage = ''; // 成功后清空输入框
        this.inputDisabled = false;
      } catch (err) {
        api.warn(err);
        this.inputDisabled = false;
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
    newMessage(newValue, oldValue) {
      clearTimeout(this.timeout);
      if (this.stopTyping) {
        this.stopTyping = false; // start typing
        socket.emit('typing', this.group.id);
      }
      this.timeout = setTimeout(() => {
        this.stopTyping = true;
        socket.emit('stop typing', this.group.id);
      }, 1000);
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
    socket.on('typing', (data) => {
      if (data.channel !== this.channel) return;
      this.typingList.push(data.nick);
    });
    socket.on('stop typing', (data) => {
      if (data.channel !== this.channel) return;
      const index = this.typingList.indexOf(data.nick);
      this.typingList.splice(index, 1);
    });
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

#input {
  padding-top: 0px;
  padding-bottom: 11px;
  padding-left: 13px;
  padding-right: 13px;
  input {
    &:focus {
      background-color: #fff;
      border-color: #dbdbdb;
      color: #363636;
      box-shadow: none;
    }
  }
  &.field:last-child {
    margin-bottom: 0;
  }
  &.field:not(:last-child) {
    margin-bottom: 0;
  }
}

#typing {
  position: absolute;
  bottom: 3.3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
