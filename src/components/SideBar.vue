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
    <div class="modal is-active" v-if="showModal">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-content" style="max-width: 430px;">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Join a group!
            </p>
          </header>
          <div class="card-content">
            <form @submit="join" onsubmit="return false">
              <div class="field has-addons">
                <div class="control" style="width: 100%;">
                  <input
                    class="input"
                    type="text"
                    pattern="[0-9]+"
                    placeholder="Group ID"
                    title="Only number accepted."
                    v-model="joinId"
                  />
                </div>
                <div class="control">
                  <input type="submit" class="button is-info" value="Join" />
                </div>
              </div>
              <p class="help is-danger" v-if="errorMessage">
                {{ errorMessage }}
              </p>
            </form>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <a><span>Join Dev Group</span></a>
            </p>
            <p class="card-footer-item">
              <a><span @click="toggleModal">Cancel</span></a>
            </p>
          </footer>
        </div>
      </div>
    </div>
    <button class="button" id="join" @click="toggleModal">+</button>
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
      showModal: false,
      joinId: null,
      errorMessage: '',
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
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async join() {
      const id = this.joinId;
      try {
        await api.requestGroupMember(id);
        this.toggleModal();
        this.errorMessage = '';
      } catch (err) {
        this.errorMessage = err.response.data;
        api.warn(err);
      }
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
#join {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
