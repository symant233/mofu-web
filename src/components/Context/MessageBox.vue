<template>
  <div class="scrollbar m-messages" :key="channel">
    <slot></slot>
    <div v-for="msg in msgs" :key="msg.id" :id="msg.id" class="m-message">
      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img :src="msg.author.avatar || '/static/images/akari.jpg'" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content m-message-content">
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
  components: {},
  name: 'message-box',
  props: {
    msgs: Array,
    end: String, // 加载更多后, 最底下的消息ID
  },
  computed: {
    channel() {
      return this.$route.params.channel;
    },
  },
  methods: {
    scrollRear() {
      const el = this.$el;
      el.scrollTo({ top: el.scrollHeight });
    },
  },
  watch: {
    msgs() {
      if (this.msgs && this.msgs.length === 0) return;
      if (this.msgs.length <= api.MSGLIMIT) {
        console.log('[MessageBox] scrollRear...');
        this.$nextTick(this.scrollRear);
      } else {
        this.$nextTick(() => {
          console.log('[MessageBox] scroll end...');
          document.getElementById(this.end).scrollIntoView();
        });
      }
    },
  },
  mounted() {
    // 因为使用该组件时绑定了:key, 所以每次切换$router会重新进行生命周期
    console.log('[MessageBox] scrollRear...');
    this.$nextTick(this.scrollRear);
  },
};
</script>

<style lang="scss">
.scrollbar {
  margin-top: 1.6px;
  float: left;
  width: 65px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.m-messages {
  width: 100%;
  flex: auto;
  .m-message {
    padding: 0.5rem 1rem;
    .m-message-content {
      word-wrap: break-word;
      word-break: break-all;
      padding-right: 33px;
    }
  }
  .m-message:hover {
    background-color: #fffeee;
  }
  .m-message:last-child {
    margin-bottom: 1rem;
  }
}
figure > p > img {
  border-radius: 50%;
}
</style>
