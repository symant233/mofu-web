<template>
  <div id="context" class="fullheight">
    <group-title :group="group"></group-title>
    <wumpus :wumpus="wumpus"></wumpus>

    <message-box :msgs="msgs[current]"></message-box>

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
import Wumpus from './Context/Wumpus';

export default {
  name: 'context',
  components: { GroupTitle, MessageBox, Wumpus },
  data() {
    return {
      showInput: true,
      current: this.$route.params.channel,
      msgs: {},
      newMessage: '',
      inputDisabled: false,
      wumpus: false,
      typingList: [],
      timeout: 0,
      stopTyping: true,
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
  },
  props: {
    group: Object,
  },
  methods: {
    async listGroupMessages(groupId = '') {
      // 获取群组最近消息 (默认的最多50条)
      if (this.msgs[this.current] !== undefined) {
        console.info('current msgs not empty, skip api request.');
        return;
      } else if (this.current === '@me') return;
      let rs;
      try {
        if (groupId) rs = await api.listGroupMessages(this.current);
        else rs = await api.listGroupMessages(this.current);
        this.$set(this.msgs, this.current, rs);
      } catch (err) {
        api.warn(err);
      }
    },
    async createMessage() {
      // 用户发送消息
      if (!this.newMessage) return; // 禁止发送空内容
      this.inputDisabled = true;
      try {
        const rs = await api.createGroupMessage(this.current, this.newMessage);
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
      this.current = to.params.channel;
      await this.listGroupMessages(to.params.channel);
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
  },
  mounted() {
    console.info('channel->', this.current);
    if (this.current === '@me') {
      this.showInput = false;
      this.wumpus = true;
      return;
    }
    this.listGroupMessages();
    this.listenMessages(); // socket 监听
    socket.on('typing', (data) => {
      if (data.channel !== this.current) return;
      this.typingList.push(data.nick);
    });
    socket.on('stop typing', (data) => {
      if (data.channel !== this.current) return;
      const index = this.typingList.indexOf(data.nick);
      this.typingList.splice(index, 1);
    });
  },
};
</script>

<style>
#context {
  /* min-width: 600px; */
  display: flex;
  flex-direction: column;
  height: 100%;
}

#input {
  padding-top: 0px;
  padding-bottom: 11px;
  padding-left: 13px;
  padding-right: 13px;
}

#input.field:not(:last-child) {
  margin-bottom: 0;
}

.input:focus {
  background-color: #fff;
  border-color: #dbdbdb;
  color: #363636;
  box-shadow: none;
}
#typing {
  position: relative;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
