<template>
  <div id="side-bar">
    <side-search></side-search>
    <div id="side-groups">
      <div v-for="g in groups" :key="g.id" id="message">
        <article class="media" @click="routing(g.id)">
          <figure class="media-left">
            <p class="image is-48x48">
              <img :src="g.avatar || '/static/images/akari.jpg'" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content message-content">
              <p>
                <strong>{{ g.name }}</strong
                ><br />
                {{ g.since }}
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

export default {
  name: 'side-bar',
  components: { SideSearch },
  props: {
    groups: Array,
  },
  methods: {
    routing(groupId) {
      this.$router.push({ name: 'mofu-chat', params: { channel: groupId } });
    },
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
</style>
