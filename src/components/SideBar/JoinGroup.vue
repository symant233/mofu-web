<!-- fixed button modal -->
<template>
  <div>
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
            <p class="card-footer-item" @click="joinDevGroup">
              <a><span>Join Dev Group</span></a>
            </p>
            <p class="card-footer-item" @click="toggleModal">
              <a><span>Cancel</span></a>
            </p>
          </footer>
        </div>
      </div>
    </div>
    <button class="button" id="join" @click="toggleModal">+</button>
  </div>
</template>

<script>
import api from '../../core/api';

export default {
  name: 'join-group',
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

<style>
#join {
  position: absolute;
  bottom: 8px;
  left: 7px;
}
</style>
