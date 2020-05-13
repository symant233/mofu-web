<template>
  <div id="context" class="fullheight">
    <div id="group">
      <span>{{ groups[current].name }}</span>
    </div>
    <div id="messages">
      <div v-for="msg in msgs[current]" :key="msg.id" id="message">
        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48">
              <img :src="msg.author.avatar || '/static/images/akari.jpg'" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ msg.author.nick }}</strong>
                <small style="font-size: 0.775em;">{{ msg.timestamp }}</small>
                <br />
                {{ msg.content }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div id="input">aaa</div>
  </div>
</template>

<script>
import api from '../core/api';

export default {
  name: 'context',
  data() {
    return {
      current: this.$route.params.channel,
      msgs: {},
      groups: {},
    };
  },
  methods: {
    async listGroupMessages() {
      if (this.msgs[this.current] !== undefined) {
        console.log('msgs[current] !== undefined');
        return;
      }
      try {
        const rs = await api.listGroupMessages(this.current);
        this.$set(this.msgs, this.current, rs);
      } catch (err) {
        api.warn(err);
      }
    },
    async groupDetail() {
      if (this.groups[this.current] !== undefined) {
        console.log('groups[current] !== undefined');
        return;
      }
      try {
        const rs = await api.groupDetail(this.current);
        this.$set(this.groups, this.current, rs);
      } catch (err) {
        api.warn(err);
      }
    },
  },
  beforeMount() {
    console.info('channel->', this.current);
    if (this.current === '@me') return;
    this.groupDetail();
    this.listGroupMessages();
  },
};
</script>

<style>
#group {
  padding: 13px;
  font-weight: bold;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
}

#context {
  min-width: 678px;
  width: 55%;
}

#messages {
  width: 100%;
  height: 100%;
}

#message {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

#input {
  padding: 13px;
  position: fixed;
  bottom: 0px;
}
</style>
