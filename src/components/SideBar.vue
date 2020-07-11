<template>
  <div id="side-bar">
    <side-search :user="user"></side-search>
    <!-- side groups list -->
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
    <!-- join group modal -->
    <join-group></join-group>
  </div>
</template>

<script>
import SideSearch from './SideBar/SideSearch';
import JoinGroup from './SideBar/JoinGroup';
import api from '../core/api';

export default {
  name: 'side-bar',
  components: { SideSearch, JoinGroup },
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
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f2f3f5;
}
#side-groups {
  flex: auto;
  width: 100%;
  margin-left: 0;
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
