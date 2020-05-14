<template>
  <div id="context" class="fullheight">
    <group-title :group="groups[current]"></group-title>
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
  </div>
</template>

<script>
import api from '../core/api';
import socket from '../core/socket';
import GroupTitle from '../components/Context/GroupTitle';
import MessageBox from '../components/Context/MessageBox';

export default {
  name: 'context',
  components: { GroupTitle, MessageBox },
  data() {
    return {
      current: this.$route.params.channel,
      msgs: {},
      groups: {},
      newMessage: '',
      inputDisabled: false,
    };
  },
  methods: {
    async listGroupMessages() {
      if (this.msgs[this.current] !== undefined) {
        console.log('msgs[current] !== undefined');
        return;
      }
      try {
        const rs = await api.listGroupMessages(this.current);
        this.$set(this.msgs, this.current, rs);
      } catch (err) {
        api.warn(err);
      }
    },
    async groupDetail() {
      if (this.groups[this.current] !== undefined) {
        console.log('groups[current] !== undefined');
        return;
      }
      try {
        const rs = await api.groupDetail(this.current);
        this.$set(this.groups, this.current, rs);
      } catch (err) {
        if (err.response.status === 401) {
          this.$router.push({ name: 'mofu-login' });
        }
        api.warn(err);
      }
    },
    async createMessage() {
      this.inputDisabled = true;
      try {
        const rs = await api.createGroupMessage(this.current, this.newMessage);
        // rs returns message object
        this.newMessage = '';
        this.inputDisabled = false;
      } catch (err) {
        api.warn(err);
        this.inputDisabled = false;
      }
    },
    listenMessages() {
      socket.on('new msg', (data) => {
        // socket 收到新消息 推入组件消息存储中
        this.msgs[this.current].push(data);
      });
    },
  },
  beforeMount() {
    console.info('channel->', this.current);
    if (this.current === '@me') return;
    this.groupDetail();
    this.listGroupMessages();
  },
  mounted() {
    const token = this.$cookie.get('token');
    if (!token) console.error('cookie: token empty');
    socket.emit('auth', token);
    this.socket = socket;
    this.listenMessages();
  },
};
</script>

<style>
#context {
  min-width: 600px;
  width: 55%;
}

#context #input {
  min-width: 600px;
  width: 55%;
}

#input {
  padding: 13px;
  position: fixed;
  bottom: 0px;
}
</style>
