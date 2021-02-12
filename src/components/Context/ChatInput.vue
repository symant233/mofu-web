<template>
  <div id="input" class="field has-addons" v-if="showInput">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Text..."
        v-model="newMessage"
        @keyup.enter="createMessage"
        :disabled="inputDisabled"
        ref="input"
        v-focus
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
</template>

<script>
import api from '../../core/api';
import socket from '../../core/socket';

export default {
  name: 'chat-input',
  props: {
    showInput: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      timeout: 0,
      inputDisabled: false,
      newMessage: '',
    };
  },
  computed: {},
  methods: {
    async createMessage() {
      // 用户发送消息
      if (!this.newMessage) return; // 禁止发送空内容
      this.inputDisabled = true;
      let rs;
      try {
        if (this.group.dm) {
          rs = await api.createDirectMessage(this.channel, this.newMessage);
        } else {
          rs = await api.createGroupMessage(this.channel, this.newMessage);
        }
        // rs returns message object
        this.newMessage = ''; // 成功后清空输入框
        this.inputDisabled = false;
        this.$nextTick(() => {
          this.$refs.input.focus(); // 输入后重新focus
        });
      } catch (err) {
        api.warn(err);
        this.inputDisabled = false;
      }
    },
  },
  watch: {
    newMessage(newValue, oldValue) {
      clearTimeout(this.timeout);
      if (this.stopTyping) {
        this.stopTyping = false; // start typing
        socket.emit('typing', this.channel);
      }
      this.timeout = setTimeout(() => {
        this.stopTyping = true;
        socket.emit('stop typing', this.channel);
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
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
</style>
