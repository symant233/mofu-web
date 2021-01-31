<template>
  <div id="side-groups" class="scrollbar">
    <div
      v-for="g in groups"
      :key="g.id"
      :class="['group', channel === g.id ? 'active' : '']"
    >
      <article class="media" @click="routing(g.id)">
        <figure class="media-left">
          <p class="image is-48x48">
            <img :src="g.avatar || '/static/images/akari.jpg'" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content message-content">
            <p>
              <strong>{{ g.name }}</strong>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'group-list',
  computed: {
    groups() {
      return this.$store.state.group.groups;
    },
  },
  methods: {
    routing(groupId) {
      if (groupId !== this.channel) {
        this.$router.push({ name: 'mofu-chat', params: { channel: groupId } });
      }
    },
  },
};
</script>

<style lang="scss">
#side-groups {
  height: 0vh;
  flex: auto;
  width: 100%;
  margin-left: 0;
}
.group {
  padding: 0.5rem;
  &:hover {
    background-color: #e8eaed;
  }
  &.active {
    outline: 0px;
    background-color: #d4d7dc;
  }
}
</style>
