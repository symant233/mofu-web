<template>
  <div id="context" class="fullheight">
    <group-title :group="group"></group-title>
    <message-box :msgs="msgs[current]"></message-box>

    <div id="input" class="field has-addons">
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
    <wumpus :wumpus="wumpus"></wumpus>
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
      current: this.$route.params.channel,
      msgs: {},
      newMessage: '',
      inputDisabled: false,
      wumpus: false,
    };
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
      }
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
  beforeMount() {
    console.info('channel->', this.current);
    if (this.current === '@me') {
      this.wumpus = true;
      return;
    }
    this.listGroupMessages();
    this.listenMessages(); // socket 监听
  },
  watch: {
    async $route(to, from) {
      this.current = to.params.channel;
      await this.listGroupMessages(to.params.channel);
    },
  },
};
</script>

<style>
#context {
  /* min-width: 600px; */
  width: 55%;
  height: 100%;
  float: left;
}

#context #input {
  /* min-width: 600px; */
  width: 55%;
}

#input {
  padding: 13px;
  position: fixed;
  bottom: 0px;
}

#input.field:not(:last-child) {
  margin-bottom: 0;
}
</style>
