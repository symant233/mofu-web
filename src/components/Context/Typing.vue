<template>
  <transition name="fade">
    <span class="tag is-warning is-light" id="typing" v-if="typing">
      <template v-if="group.dm">对方正在输入...</template>
      <template v-else>输入中: {{ typing }}</template>
    </span>
  </transition>
</template>

<script>
import socket from '../../core/socket';

export default {
  name: 'typing',
  data() {
    return {
      typingList: [],
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
          if (l.length !== 2) str += ' 以及更多';
        }
      }
      return str;
    },
  },
  mounted() {
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
#typing {
  position: absolute;
  bottom: 3.3rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
