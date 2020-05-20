<template>
  <div id="side-bar">
    <side-search :user="user"></side-search>
    <div id="side-groups" class="scrollbar">
      <div v-for="g in groups" :key="g.id" class="group">
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
  </div>
</template>

<script>
import SideSearch from './SideBar/SideSearch';
import api from '../core/api';

export default {
  name: 'side-bar',
  components: { SideSearch },
  data() {
    return {
      user: {},
    };
  },
  props: {
    groups: Array,
  },
  methods: {
    async myDetail() {
      this.user = await api.myDetail();
    },
    routing(groupId) {
      this.$router.push({ name: 'mofu-chat', params: { channel: groupId } });
    },
  },
  mounted() {
    if (!this.user.id) this.myDetail();
  },
};
</script>

<style>
#side-bar {
  height: 100%;
  float: left;
  background-color: #f2f3f5;
  width: 25%;
}
#side-groups {
  width: 100%;
  margin-left: 0;
  height: calc(100% - 55px);
}
.group {
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
}
.group:hover {
  background-color: #d4d7dc;
}
</style>
