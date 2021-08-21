import Vue from 'vue';
import api from '../core/api';

Vue.mixin({
  methods: {
    setApiToken() {
      // 设置 api 的 Bearer 请求头
      const token = localStorage.getItem('token');
      api.conf.headers.Authorization = `Bearer ${token}`;
    },
    setWarn(message) {
      this.$store.dispatch('common/setWarn', String(message));
    },
    getTime(timestamp) {
      return new Date(timestamp).toLocaleString('zh-CN', {
        hour12: false,
      });
    },
    setTitle(string) {
      document.title = string || 'mofu-chat';
    },
  },
  computed: {
    channel() {
      return this.$route.params.channel;
    },
    group() {
      return this.$store.state.group.groups[this.channel];
    },
  },
});
