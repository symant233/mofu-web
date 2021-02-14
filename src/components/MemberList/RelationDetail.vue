<template>
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
</template>

<script>
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
  },
};
</script>

<style lang="scss">
.is-36x36 {
  width: 36px;
  height: 36px;
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
