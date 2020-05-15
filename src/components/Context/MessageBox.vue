<template>
  <div id="messages" class="scrollbar">
    <div v-for="msg in msgs" :key="msg.id" id="message">
      <article class="media" v-if="msg.channel === current">
        <figure class="media-left">
          <p class="image is-48x48">
            <img :src="msg.author.avatar || '/static/images/akari.jpg'" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content message-content">
            <p>
              <strong>{{ msg.author.nick }}</strong>
              <small style="font-size: 0.775em;">{{ msg.timestamp }}</small>
              <br />
              {{ msg.content }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import api from '../../core/api';

export default {
  name: 'message-box',
  props: {
    msgs: Array,
  },
  data() {
    return {
      doScroll: false,
      current: this.$route.params.channel,
    };
  },
  methods: {},
  beforeUpdate() {
    const el = this.$el;
    const now = el.scrollTop + el.clientHeight;
    if (now >= el.scrollHeight) this.doScroll = true;
    else this.doScroll = false;
  },
  updated() {
    if (this.doScroll) {
      const el = this.$el;
      el.scrollTo({
        top: el.scrollHeight,
        left: 0,
        // 使滚动条动画形式滑动而不是瞬时
        behavior: 'smooth',
      });
    }
  },
};
</script>

<style>
#messages {
  width: 100%;
  height: calc(100% - 103px);
  min-height: 0;
  flex: 1 1 auto;
  margin-top: 1.5px;
  margin-left: 0;
}
.scrollbar {
  margin-left: 22px;
  float: left;
  height: 300px;
  width: 65px;
  /* background: #f5f5f5; */
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 25px;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.123);
  background-color: #f5f5f5;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c1c1c1;
  border-color: transparent;
}
::-webkit-scrollbar-thumb:hover {
  background: #777;
}

#message {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

#message:last-child {
  margin-bottom: 1rem;
}

.message-content {
  word-wrap: break-word;
  word-break: break-all;
}
#message.message-content {
  padding-right: 30px;
}
</style>
