<template>
  <div class="scrollbar m-messages" :key="current">
    <div v-for="msg in msgs" :key="msg.id" class="m-message">
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
  watch: {
    $route() {
      this.current = this.$route.params.channel;
    },
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
