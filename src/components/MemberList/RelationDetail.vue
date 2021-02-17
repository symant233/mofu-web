<template>
  <div>
    <p class="mofu-title unselectable">用户详情</p>
    <div id="user-detail">
      <article class="media unselectable">
        <figure class="member-avatar">
          <p class="image">
            <img :src="user.avatar" />
          </p>
        </figure>
        <div class="media-content">
          <p class="member-nick">
            <strong>{{ user.nick }}</strong>
          </p>
        </div>
      </article>
    </div>
    <input :value="user.id" disabled />
    <button class="clipboard" :data-clipboard-text="user.id">
      <img src="/static/images/clippy.svg" alt="复制到剪切板" width="13" />
    </button>
    <p>成为好友已经 {{ days }} 天</p>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  name: 'relation-detail',
  data() {
    return {};
  },
  computed: {
    user() {
      return {
        ...this.group.users,
        since: this.group.since,
        type: this.group.type,
      };
    },
    days() {
      const ms = Date.now() - new Date(this.user.since).getTime();
      return Math.floor(ms / 1000 / 60 / 60 / 24);
    },
  },
  mounted() {
    const c = new Clipboard('.clipboard');
    c.on('success', (e) => {
      this.$toast.success('复制成功');
    });
  },
};
</script>

<style lang="scss">
.is-36x36 {
  width: 36px;
  height: 36px;
}
.mofu-title {
  font-size: 18px;
  padding: 12px 12px 0px 12px;
}
#user-detail {
  float: left;
  background: white;
  border-radius: 8px;
  margin: 10px;
  width: calc(100% - 20px);
}
.member-avatar {
  float: left;
  margin: 9px 9px;
  width: 36px;
  height: 36px;
  & img {
    border-radius: 50%;
  }
}
.member-nick {
  margin: 15px 0;
  word-break: keep-all;
  overflow: hidden;
  white-space: nowrap;
}
</style>
