<template>
  <div id="mofu-join">
    <modal :show-modal.sync="showModal" :max-width="430">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            寻找伙伴!
          </p>
        </header>
        <div class="card-content">
          <form @submit.prevent="joinGroup">
            <label class="label">加入群组:</label>
            <div class="field has-addons">
              <div class="control" style="width: 100%;">
                <input
                  class="input"
                  type="text"
                  pattern="[0-9]+"
                  placeholder="Group ID"
                  title="请勿输入除数字外的字符."
                  v-model="groupId"
                />
              </div>
              <div class="control">
                <input type="submit" class="button is-info" value="->" />
              </div>
            </div>
            <p class="help is-danger" v-if="errGroupMsg">
              {{ errGroupMsg }}
            </p>
          </form>

          <form @submit.prevent="joinUser" id="join-user">
            <label class="label">添加好友:</label>
            <div class="field has-addons">
              <div class="control" style="width: 100%;">
                <input
                  class="input"
                  type="text"
                  pattern="[0-9]+"
                  placeholder="User ID"
                  title="请勿输入除数字外的字符."
                  v-model="userId"
                />
              </div>
              <div class="control">
                <input type="submit" class="button is-primary" value="->" />
              </div>
            </div>
            <p class="help is-danger" v-if="errUserMsg">
              {{ errUserMsg }}
            </p>
          </form>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item" @click="joinDevGroup">
            <a><span>加入开发者频道</span></a>
          </p>
          <p class="card-footer-item" @click="toggleModal">
            <a><span>取消</span></a>
          </p>
        </footer>
      </div>
    </modal>
    <div
      class="u-icon-add"
      id="mofu-join-button"
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
      groupId: null,
      userId: null,
      errGroupMsg: '',
      errUserMsg: '',
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async joinGroup() {
      try {
        await api.requestGroupMember(this.groupId);
        this.toggleModal();
        this.errGroupMsg = '';
      } catch (err) {
        this.errGroupMsg = err.response.data;
        this.handler(err);
      }
    },
    async joinDevGroup() {
      try {
        await api.joinDevGroup();
        this.toggleModal();
        this.errGroupMsg = '';
      } catch (err) {
        this.errGroupMsg = err.response.data;
        this.handler(err);
      }
    },
    async joinUser() {
      try {
        await api.requestFriend(this.userId);
        this.toggleModal();
        this.errUserMsg = '';
      } catch (err) {
        this.errUserMsg = err.response.data;
        this.handler(err);
      }
    },
    handler(err) {
      api.warn(err);
      this.$toast.warning(err.response.data.message);
    },
  },
};
</script>

<style lang="scss">
#mofu-join {
  margin-top: auto;
  #join-user {
    padding-top: 7px;
  }
}
#mofu-join-button {
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
