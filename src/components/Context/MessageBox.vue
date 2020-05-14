<template>
  <div id="messages" class="overflow-scroll">
    <div v-for="msg in msgs" :key="msg.id" id="message">
      <article class="media" v-if="msg.channel === current">
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
</template>

<script>
import api from '../../core/api';

export default {
  name: 'message-box',
  props: {
    msgs: Array,
  },
  data() {
    return {
      current: this.$route.params.channel,
    };
  },
  methods: {},
};
</script>

<style>
#messages {
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1 1 auto;
}

#message {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
