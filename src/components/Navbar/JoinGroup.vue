<template>
  <div id="mofu-join">
    <modal :show-modal.sync="showModal" :max-width="430">
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
          <p class="card-footer-item" @click="joinDevGroup">
            <a><span>Join Dev Group</span></a>
          </p>
          <p class="card-footer-item" @click="toggleModal">
            <a><span>Cancel</span></a>
          </p>
        </footer>
      </div>
    </modal>
    <div
      class="u-icon-add"
      id="mofu-join-item"
      @click.prevent="toggleModal"
    ></div>
  </div>
</template>

<script>
import api from '../../core/api';
import Modal from '../Common/Modal';

export default {
  name: 'join-group',
  components: { Modal },
  data() {
    return {
      showModal: false,
      joinId: null,
      errorMessage: '',
    };
  },
  methods: {
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
    async joinDevGroup() {
      try {
        await api.joinDevGroup();
        this.toggleModal();
        this.errorMessage = '';
      } catch (err) {
        this.errorMessage = err.response.data;
        api.warn(err);
      }
    },
  },
};
</script>

<style lang="scss">
#mofu-join {
  margin-top: auto;
}
#mofu-join-item {
  display: block;
  position: relative;
  margin: 13px auto;
  height: 30px;
  width: 30px;
  &:focus {
    outline: 0px;
  }
}
.u-icon-add {
  background-image: url('/static/images/add-icon.svg');
}
</style>
