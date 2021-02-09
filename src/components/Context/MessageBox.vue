<template>
  <div class="scrollbar m-messages" :key="channel">
    <slot></slot>
    <div
      v-for="(msg, index) in msgs"
      :key="msg.id"
      :id="msg.id"
      class="m-message"
    >
      <p v-if="omit(msg, index)" class="m-omit">
        {{ msg.content }}
      </p>
      <article class="media" v-else>
        <figure class="media-left">
          <p class="image is-48x48">
            <img :src="msg.author.avatar || '/static/images/akari.jpg'" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content m-message-content">
            <p>
              <strong>{{ msg.author.nick }}</strong>
              <small style="font-size: 0.775em;">{{
                new Date(msg.timestamp).toLocaleString('zh-CN', {
                  hour12: false,
                })
              }}</small>
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
  methods: {
    scrollRear() {
      const el = this.$el;
      el.scrollTo({ top: el.scrollHeight });
    },
    omit(msg, index) {
      // 是否省略消息多余的部分
      if (index > 0) {
        const last = this.msgs[index - 1];
        if (
          last.author.id === msg.author.id &&
          new Date(msg.timestamp).getTime() -
            new Date(last.timestamp).getTime() <
            60000
        ) {
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    msgs() {
      if (this.msgs && this.msgs.length === 0) return;
      if (this.msgs.length <= api.MSGLIMIT || this.end === '') {
        this.$nextTick(this.scrollRear);
      } else if (this.end) {
        this.$nextTick(() => {
          document.getElementById(this.end).scrollIntoView();
          this.$el.scrollBy(0, 24); // 高度补偿
          this.$emit('update:end', '');
        });
      }
    },
  },
  mounted() {
    // 因为使用该组件时绑定了:key, 所以每次切换$router会重新进行生命周期
    this.$nextTick(this.scrollRear);
  },
};
</script>

<style lang="scss">
.scrollbar {
  margin-top: 1.6px;
  float: left;
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
    .m-omit {
      word-wrap: break-word;
      word-break: break-all;
      padding-right: 33px;
      margin-left: 64px;
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
