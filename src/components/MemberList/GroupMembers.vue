<template>
  <div>
    <p class="mofu-title unselectable">群组成员</p>
    <div id="member-detail" v-for="member in members" :key="member.user.id">
      <article class="media unselectable">
        <figure class="member-avatar">
          <p class="image">
            <img :src="member.user.avatar" />
          </p>
        </figure>
        <div class="media-content">
          <p class="member-nick">
            <strong>{{ member.user.nick }}</strong>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import api from '../../core/api';

export default {
  name: 'group-memebrs',
  data() {
    return {
      members: [],
    };
  },
  methods: {
    async listMembers() {
      const members = await api.listGroupMembers(this.channel);
      this.members = members;
    },
  },
  mounted() {
    this.listMembers();
  },
  watch: {
    channel(oldV, newV) {
      this.listMembers();
    },
  },
};
</script>

<style lang="scss">
.mofu-title {
  font-size: 18px;
  padding: 12px 12px 0px 12px;
  margin-bottom: 10px;
}
#member-detail {
  float: left;
  background: white;
  border-radius: 8px;
  margin: 0 10px 10px 10px;
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
