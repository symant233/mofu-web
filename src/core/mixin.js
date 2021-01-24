import Vue from 'vue';
import api from '../core/api';

Vue.mixin({
  methods: {
    setApiToken() {
      // 设置 api 的 Bearer 请求头
      const token = localStorage.getItem('token');
      api.conf.headers.Authorization = `Bearer ${token}`;
    },
  },
  computed: {
    channel() {
      return this.$route.params.channel;
    },
  },
});
